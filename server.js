const express = require("express");
const mysql = require("mysql");
const path = require('path');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "currency"
});

const app = express();

app.use(express.static(path.join(__dirname, '/currency/build')));

app.get("/api/currencies",(req, res)=>{
  console.log("calling api");
  con.query("select * from currency", (err,data)=>{
    console.log(data);
    res.json(data);
  })
})

app.get("/", (req,res)=>{
  res.sendFile(path.join(__dirname, '/currency/build/index.html'));
})

app.listen(8080, ()=> console.log("Listening at port 8080"));

