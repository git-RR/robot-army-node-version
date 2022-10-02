const { MongoClient } = require("mongodb");

async function main(){
    const password = process.env.DB_ACCESS_KEY;
    const uri = `mongodb+srv://robot-army:${password}@cluster0.cxoh44a.mongodb.net/?retryWrites=true&w=majority`;
    const client = new MongoClient(uri);
    try {
        await client.connect();
        await listDatabases(client);
    } catch (error) {
        console.error(error);
    } finally{
        await client.close();
    }
}

main().catch(console.error);

async function listDatabases(client){
    const databasesList = await client.db().admin().listDatabases();
    console.log("Databases:");
    databasesList.databases.forEach(db => {
        console.log(`--${db.name}`)
    });
}