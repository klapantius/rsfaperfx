const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = "mongodb://helloworld-juba1-cosmo-account:kVF9e7JevI9Iv4zVYvy0zRpSlba43e1gwnvlskJAuLHI9iheooMl4veRaEF1nDvjXi6bXmoscAvapoxtXO6PFQ%3D%3D@helloworld-juba1-cosmo-account.documents.azure.com:10255/?ssl=true";
//const url = "mongodb://@localhost:27017"

// Database Name
const dbName = 'helloworld-database';

async function Test() {
    client = await MongoClient.connect(url, { useNewUrlParser: true });
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