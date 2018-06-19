const MongoClient = require("mongodb").MongoClient;

async function Collection(accessParams = {
    server: process.env.DATABASE || "@localhost:27017",
    database: "helloworld-database",
    collection: "rsfa",
    title: "server"
}) {
    let collection;
    try {
        const url = accessParams.server.startsWith("mongodb://")
            ? accessParams.server
            : `mongodb://${accessParams.server}`;
        const client = await MongoClient.connect(url);
        console.log(`Connected successfully to ${accessParams.title}`);
        const db = client.db(accessParams.database);
        collection = db.collection(accessParams.collection);
        collection.close = function () {
            if (client) {
                client.close();
                console.log(`Connection to ${accessParams.title} closed.`);
            }
        };
        collection.parentDB = function () {
            return db;
        };
    }
    catch (err) {
        log(`accessing of collection with parameters ${{server: accessParams.server.substring(0, 10), db: accessParams.database, collection: accessParams.collection}} failed: ${err}`);
        return null;
    }
    return collection;
}

exports.Collection = Collection;