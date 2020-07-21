const db = require("../../config/database");

module.exports = {
  register: (data, callback) => {
    db.query(
      "INSERT INTO users(username, password) VALUES (?,?)",
      [data.username, data.password],
      (err, result, fields) => {
        if (err) return callback(err);
        return callback(null, result);
      }
    );
  },
  checkUserExists: (data, callback) => {
    db.query(
      "SELECT * FROM users WHERE username=?",
      [data.username],
      (err, result, fields) => {
        if (err) return callback(err);
        if (result == null || result.length == 0) {
          return callback(null, false);
        } else {
          return callback(null, true);
        }
      }
    );
  },
  login: (data, callback) => {
    db.query(
      "SELECT * FROM users WHERE username = ?",
      [data.username],
      (err, result, fields) => {
        if (err) {
          return callback(err);
        } else {
          return callback(null, result[0]);
        }
      }
    );
  },
};
