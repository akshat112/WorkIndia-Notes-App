const { register, checkUserExists, login } = require("./user.service");
const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");
module.exports = {
  addNewUser: (req, res) => {
    const body = req.body;
    checkUserExists(body, (err, result) => {
      if (!!err) {
        res.json({
          success: 0,
          status: "Cannot add user!",
        });
      }
      if (result) {
        res.json({
          success: 0,
          status: "Username already exists",
        });
      } else {
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        register(body, (err, result) => {
          if (!!err) {
            res.json({
              success: 0,
              status: "Can't add user",
            });
          } else {
            res.json({
              success: 1,
              status: "Account created",
            });
          }
        });
      }
    });
  },
  loginUser: (req, res) => {
    const body = req.body;
    login(body, (err, result) => {
      if (!!err) {
        res.json({
          success: 1,
          message: "Some error occured!",
        });
      }
      if (!result) {
        res.json({
          success: 0,
          message: "Invalid username or password",
        });
      }
      const passwordCheck = compareSync(body.password, result.password);
      if (passwordCheck) {
        body.password = undefined;
        body.id = result.id;
        const jsonToken = sign(body, process.env.JSON_TOKEN, {
          expiresIn: "1h",
        });
        res.json({
          success: 1,
          status: "success",
          token: jsonToken,
          userId: result.id,
        });
      } else {
        res.json({
          success: 0,
          message: "Invalid username or password",
        });
      }
    });
  },
};
