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
    name: {type: String, unique: true},
    password: String,
    userImage: {type: String, required: true}
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
var User = mongoose.model('Users', userSchema);

module.exports = User;