const http = require('http');
const express = require('express');
const mysql = require('mysql');
const passwordHash = require('password-hash');
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
  else {
    console.log("Connected");
  }
});
app.get('/sign-up',function(req,res){
  var user_name = req.query.name;
  var email = req.query.email;
  var password = passwordHash.generate(req.query.password);
  console.log(user_name+email+password);
  console.log("Connected");
  var insert = "INSERT INTO users(user_name,email,password) VALUES('"+user_name+"','"+email+"','"+password+"')";
  con.query(insert,function(err,result){
    if(err){
      throw err;
      res.send("USER NAME ALREADY EXISTS");
    }
    else {
      console.log(result.affectedRows);
      res.sendFile(__dirname+'/index.html');
    }
  });
});


app.listen(3001,function(){
  console.log("listening ....");
});
