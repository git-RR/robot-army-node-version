const express = require('express');
const { MongoClient } = require("mongodb");

const app = express();

const port = process.env.PORT || 5000;
app.listen(port, ()=>{console.log('server running @ '+port)})
app.use(express.static("public/"));
app.use(express.json());

const api_key = process.env.API_KEY || "";
app.get("/api_key", (req, res)=>{
   res.send(api_key); 
});

app.post("/api/help", async (req, res)=>{
   const data = req.body.data;
   const html = await main(data);
   res.json({data:html});
});

async function main(page){
   const password = process.env.DB_ACCESS_KEY || "";
   const uri = `mongodb+srv://robot-army:${password}@cluster0.cxoh44a.mongodb.net/?retryWrites=true&w=majority`;
   const client = new MongoClient(uri);
   try {
       await client.connect();
       const html = await getPage(client, page);
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