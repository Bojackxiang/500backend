/**************************************************
 *
 *                 Basic setting
 *
 *************************************************/
var express = require("express");
var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
var app = express();
var date = new Date();
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))

/**************************************************
 *
 *                 database setting
 *
 *************************************************/
var Users = require('./database');


/**************************************************
 *
 *                 Routing set up
 *
 *************************************************/
app.get('/allusers', (req, res)=>{
    Users.find({})
        .then((users)=>{
            console.log(date.toString()+"***************** enter the allusers *****************");
            res.json(users);
        })
});

app.post('/adduser', (req, res)=>{
    console.log(date.toString()+"***************** add all users *****************");
    let name = req.body.name;
    let password = req.body.password;
    console.log(req.body)
    console.log(name, password);
});


/**************************************************
 *
 *                 router setting
 *
 *************************************************/
app.listen("3000", () => {
  console.log("the app starts");
});
