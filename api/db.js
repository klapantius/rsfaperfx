const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
let database = process.env.DATABASE || "@localhost:27017";
const url = `mongodb://${database}`

// Database Name
const dbName = 'helloworld-database';

async function Test() {
    console.log(`connecting to ${url}`);
    client = await MongoClient.connect(url);
    console.log("Connected successfully to server");

    const db = client.db(dbName);
    const result = {
        query_time: (new Date()).toString(),
        collections: (await db.listCollections().toArray()).map(x => x.name)
    };

    client.close();

    console.log(JSON.stringify(result, null, "  "))
    return result;
}

module.exports = { Test };