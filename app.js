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
var bodyParser = require("body-parser");
app.use(bodyParser.json({ limit: "100mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "100mb",
    extended: true
  })
);
app.use('/uploads', express.static('uploads'));
var crypto = require("crypto"); // this is for encode the password
var multer = require("multer");
var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function(req, file, cb) {
    cb(null, req.body.name+file.originalname);
  }
});
const uploader = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 }
});
/**************************************************
 *
 *                 database setting
 *
 *************************************************/
var Users = require("./database");

/**************************************************
 *
 *                 Routing set up
 *
 *************************************************/

// *GET* list all users
app.get("/allusers", (req, res) => {
  Users.find({}).then(users => {
    console.log(
      date.toString() + "***************** enter the allusers *****************"
    );
    res.json(users);
  });
});

// *POST* add user into the database
app.post("/adduser", uploader.single("userImage"), (req, res) => {
  console.log(
    date.toString() + "***************** add new users *****************"
  );
  console.log(req.file);
  let name = req.body.name;
  let password = req.body.password;
  let email = req.body.email;
  let newUser = new Users({
      name: name,
      password: password,
      userImage: req.file.path,
  })
    /*   the multer file come back
    { 
        fieldname: 'userImage',
        originalname: '10.JPG',
        encoding: '7bit',
        mimetype: 'image/jpeg',
        destination: './uploads/',
        filename: 'alex - a10.JPG',
        path: 'uploads/alex - a10.JPG',
        size: 166632 
    }
    **/
  newUser
    .save()
    .then(result => {
        if(result){
            res.json(
                {
                    message: "store the user successfully",
                }
            )
        }
    })
    .catch(e=>{
        res.json({
            message: "try again"
        })
    })
    


  console.log(req.body);
  console.log("NAME: " + name);
  console.log("PASSWORD: " + password);
});



/**************************************************
 *
 *                 router setting
 *
 *************************************************/
app.listen("3000", () => {
  console.log("the app starts");
});
