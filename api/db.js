const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const localDB = "@localhost:27017";
let database = process.env.DATABASE || localDB;

function URL(db) { return `mongodb://${db}`; }

// Database Name
const dbName = 'helloworld-database';
const RSFA_COLLECTION = "rsfa";

async function Test() {
    const url = URL(database);
    console.log(`connecting to ${url}`);
    client = await MongoClient.connect(url);
    console.log("Connected successfully to server");

    const db = client.db(dbName);
    const rsfa = db.collection(RSFA_COLLECTION);
    const rsfaCount = await (rsfa.find().count());
    console.log(`rsfaCount: ${rsfaCount}`);
    const result = {
        query_time: (new Date()).toString(),
        collections: (await db.listCollections().toArray()).map(x => x.name),
        size_of_rsfa: rsfaCount
    };

    client.close();

    console.log(JSON.stringify(result, null, "  "))
    return result;
}

async function Upload() {
    if (database !== localDB) {
        return { error: "Upload is not possible due to the current environment. (No connection specified to a cloud DB.)" };
    }
    let clients = [];
    const getCollection = async (dbPath, title) => {
        try {
            const url = URL(dbPath);
            console.log(`connecting to ${url}`);
            client = await MongoClient.connect(url);
            clients.push(client);
            console.log(`Connected successfully to ${title} server`);
            const db = client.db(dbName);
            return db.collection(RSFA_COLLECTION);
        }
        catch (err) {
            console.log(err);
            return null;
        }
    }

    let [local, cloud] = [null, null];
    try {
        [local, cloud] = await Promise.all([
            getCollection(localDB, 'local'),
            getCollection(process.env.CLOUD_DB, 'cloud')
        ]);
        if (!local || !cloud) throw "Upload aborted due to database connection error";

        var bulk = cloud.initializeUnorderedBulkOp();
        const localItems = await local.find().toArray();
        for (let i = 0; i < localItems.length; i++) {
            bulk.insert(localItems[i]);
        }
        bulk.execute();

        return { success: "Upload finished successfully" };
    }
    catch (err) {
        console.log(err);
        return { error: err };
    }
    finally {
        clients.forEach(c => c.close());
    }
}

module.exports = { Test, Upload };