/**************************************************
 *
 *                 database setting
 *
 *************************************************/
var mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const mongoUrl = "mongodb://localhost:27017/Users";
const Schema = mongoose.Schema;
var userSchema = new Schema({
    name: String,
    password: String,
  });
mongoose.connect(mongoUrl, (err, db)=>{
    if(err){
        console.log('= = = = = = Data Base Schema = = = = = = = = =');
        console.log(err);
        console.log('= = = = = = = = = = = = = = = = = = = = = =');
    }else{
        console.log("******************** success dbs *******************")
    }
    
});
var User = mongoose.model('users', userSchema);

module.exports = User;