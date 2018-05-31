const jwt = require("jsonwebtoken");

// this is for export this function
module.exports = (req, res, next) => {
  console.log(new Date().toString() +"************************** auth user ************************");
 
  try {
    const token = req.headers.authorization.split(" ")[1];
    console.log(token);
    
    // const decode = jwt.verify(req.body.token, "secret", null);
    const decode = jwt.verify(token, "secret", null);
    console.log(decode);
    console.log("success auth")
    next();
  } catch (err) {
    console.log("wrong auth")
    console.log(err)
  }
};

/**
 * next(), run the middleware from left to right
 *
 * jwt.verify(token: get from req body, secretPublicKey, callBack)
 * this can check the token locally and then send the to server for auth
 */
