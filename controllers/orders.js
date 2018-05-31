const Users = require("../database");
const date = new Date()



exports.list_all_users = (req, res) => {
  Users.find({}).then(users => {
    console.log(
      date.toString() + "***************** enter the allusers *****************"
    );
    res.json(users);
  });
};
