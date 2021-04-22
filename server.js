const express = require("express");
const path = require("path");
const app = express();

app.use(express.static('./dist/wheatherAppLayout'));

app.get('/',(req, res)=>{
    res.sendFile('index.html',{root:'./dist/wheatherAppLayout/'});
});

app.listen(process.env.PORT, 8080);