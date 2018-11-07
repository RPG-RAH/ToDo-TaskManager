const express = require('express');
const mysql = require('mysql');
const passwordHash = require('password-hash');
//const popups = require('popups');
var app = express();
app.set('view engine','ejs');
var con = mysql.createConnection({
  host: "localhost",
  user: "pawan",
  password: "Tictactoe@123",
  database: "Task_Manager"
});
con.connect(function(err){
  if(err) throw err;
});
app.get('/profile',function(req,res){
  var user_name = req.query.user_name;
  var password = req.query.password;
  console.log("Password is "+password);
  console.log('connected');
  con.query("SELECT * FROM users where user_name = ?",[user_name],function(err,result,fields){
    if(err) throw err;
    console.log("________"+result[0].password);
    if(passwordHash.verify(password,result[0].password))
      res.send("Welcome "+result[0].user_name);
    else {
      res.sendFile(__dirname+'/index.html');
    }
  });
});
app.listen(3000,function(){
  console.log("listening ....");
});
