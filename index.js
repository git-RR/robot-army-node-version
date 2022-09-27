const express = require('express');
const app = express();

const port = process.env.PORT || 5000;
app.listen(port, ()=>{console.log('server running @ '+port)})
app.use(express.static("public/"));

const api_key = process.env.API_KEY;
app.get("/api_key", (req, res)=>{
   console.log("REQUEST: "+req);
   res.send(api_key); 
});