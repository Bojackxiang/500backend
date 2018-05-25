const jwt = require("jsonwebtoken");

module.exports = (req, res, next)=>{
    console.log(new Date().toString()+"************************** auth user ************************");
    const decode = jwt.verify(req.body.token, process.env.JWT_KEY, null);
    console.log(decode);

    next();


}