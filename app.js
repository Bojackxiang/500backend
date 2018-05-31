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
app.use("/uploads", express.static("uploads"));
var crypto = require("crypto"); // this is for encode the password
var multer = require("multer");
var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function(req, file, cb) {
    cb(null, req.body.name + file.originalname);
  }
});
const uploader = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 }
});
const jwt = require("jsonwebtoken");
const checkAuth = require("./middleware/check-auth");
// const checkAuth = require('./middleware/check-auth');
/**************************************************
 *
 *                 database setting
 *
 *************************************************/
var Users = require("./database");

const controller = require('./controllers/orders')
/**************************************************
 *
 *                 Routing set up
 *
 *************************************************/

// POST as check auth
app.post('/secret', checkAuth, (req, res)=>{
  res.json({
    message: "you entered the secret page"
  });
})

// POST as check auth
app.get('/secret', checkAuth, (req, res)=>{
  res.json({
    message: "you entered the secret page"
  });
})


// *GET* list all users
app.get("/allusers", controller.list_all_users);


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
    userImage: req.file.path
  });
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
      if (result) {
        res.json({
          message: "store the user successfully"
        });
      }
    })
    .catch(e => {
      res.json({
        message: e
      });
    });

  console.log(req.body);
  console.log("NAME: " + name);
  console.log("PASSWORD: " + password);
});

// *GET* this allows all users to get into this part
app.get("/all", (req, res) => {
  res.send("all people can see this");
});

// *POST* this is for login
app.post("/login", (req, res, next) => {
  console.log(date.toString() + "***************** log in *****************");
  const username = req.body.name;
  const password = req.body.password;
  console.log(req.body);
  console.log("= = = = = = = = = = = = = = = =");
  // Users.findOne({}, (res, err)=>{console.log(err)});s
  Users.findOne({ name: username })
    .exec()
    .then(result => {
      if (result.password == password) {
        const token = jwt.sign(
          {
            name: username,
            userId: result._id
          },
          "secret",
          { expiresIn: "1h" }
        );
        return res.json({ message: "auth approved", token: token });
      } else {
        return res.json({ message: "auth failed" });
      }
    })
    .catch(err => {
      console.log(err);
    });
});

/**************************************************
 *
 *                 router setting
 *
 *************************************************/
app.listen("3000", () => {
  console.log("the app starts");
});
