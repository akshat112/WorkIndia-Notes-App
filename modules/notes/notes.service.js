const db = require("../../config/database");

module.exports = {
  save: (data, callback) => {
    db.query(
      "INSERT INTO notes(title, data, user_id) VALUES (?,?,?)",
      [data.title, data.data, data.user_id],
      (err, result, fields) => {
        if (err) return callback(err);
        return callback(null, result);
      }
    );
  },
  list: (user_id, callback) => {
    db.query(
      "SELECT * FROM notes WHERE user_id=?",
      [user_id],
      (err, result, fields) => {
        if (err) return callback(err);
        return callback(null, result);
      }
    );
  },
};
