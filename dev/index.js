const express = require("express");
const { MongoClient } = require("mongodb");

const app = express();

app.use(express.json());

app.listen(5001, ()=>{console.log(`running @ ${5001}`)});
app.use(express.static("./"));
app.post("/api/help", async (req, res)=>{
    const data = req.body.data;
    const html = await main(data);
    res.json({data:html});
});

async function main(page){
    const password = process.env.DB_ACCESS_KEY || '';
    const uri = `mongodb+srv://robot-army:${password}@cluster0.cxoh44a.mongodb.net/?retryWrites=true&w=majority`;
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const html = await getPage(client, page);
        //await listDatabases(client);
        //await createPages(client);
        return await html;
    } catch (error) {
        console.error(error);
    } finally{
        await client.close();
    }
}

async function getPage(client, pageName){
    const result = await client.db("help").collection("pages").findOne({name:pageName});
    if (result) {
        return result.page;
    } else {
        console.log(pageName + " Not Found!");
    }
}

async function listDatabases(client){
    const databasesList = await client.db().admin().listDatabases();
    console.log("Databases:");
    databasesList.databases.forEach(db => {
        console.log(`--${db.name}`)
    });
}

async function createPages(client){
    const newPages = [
        {'pageName1':'<h1>page1 HTML</h1>',},
        {'pageName2':'<h1>page2 HTML</h1>',},
        {'pageName3':'<h1>page3 HTML</h1>',},
    ];
    const result = await client.db("help").collection("pages").insertMany(newPages);
    console.log(`${result.insertedCount} new pages.\nID's: `);
    console.log(result.insertedIds);
}
