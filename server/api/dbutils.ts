import { Collection, AccessParams } from "./collection";

export async function Test() {
    let data;
    try {
        data = await Collection();
        const rsfaCount = await data.find().count();
        console.log(`rsfaCount: ${rsfaCount}`);
        return {
            query_time: `Query time: ${new Date().toString()}`,
            size_of_rsfa: rsfaCount,
            first10: await data
                .find()
                .limit(10)
                .toArray()
        };
    } finally {
        if (data) data.close();
    }
}

export async function Upload() {
    if (!(process.env.LOCAL_DB && process.env.CLOUD_DB)) {
        return {
            error:
                "Upload is not possible due to the current environment. Please specify both LOCAL_DB and CLOUD_DB"
        };
    }

    let [local, cloud] = [null, null];
    try {
        [local, cloud] = await Promise.all([
            Collection(
                new AccessParams(
                    process.env.LOCAL_DB,
                    undefined,
                    undefined,
                    "local"
                )
            ),
            Collection(
                new AccessParams(
                    process.env.CLOUD_DB,
                    undefined,
                    undefined,
                    "cloud"
                )
            )
        ]);
        if (!local || !cloud)
            throw "Upload aborted due to database connection error";

        var bulk = cloud.initializeUnorderedBulkOp();
        const localItems = await local.find().toArray();
        for (let i = 0; i < localItems.length; i++) {
            bulk.insert(localItems[i]);
        }
        bulk.execute();

        return { success: "Upload finished successfully" };
    } catch (err) {
        console.log(err);
        return { error: err };
    } finally {
        if (local) local.close();
        if (cloud) cloud.close();
    }
}
