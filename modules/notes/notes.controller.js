const { save, list } = require("./notes.service");
const Cryptr = require("cryptr");
const cryptr = new Cryptr(process.env.DATA_ENCRYPTION_KEY);

module.exports = {
  addNewNote: (req, res) => {
    const body = req.body;
    body.user_id = req.query.user;

    // If the user id from JWT and user param did not match, show error
    // This ensures no user can access or modify other user's data
    if (req.token_data.id != req.query.user) {
      return res.json({
        success: 0,
        status: "Unauthorised",
      });
    }

    //Encrypting notes
    body.title = cryptr.encrypt(body.title);
    body.data = cryptr.encrypt(body.data);
    save(body, (err, result) => {
      if (!!err) {
        return res.json({
          success: 0,
          status: "Can't fetch notes",
        });
      }
      return res.json({
        success: 1,
        status: "success",
      });
    });
  },
  getUserNotes: (req, res) => {
    const user_id = req.query.user;
    // If the user id from JWT and user param did not match, show error
    // This ensures no user can access or modify other user's data
    if (req.token_data.id != req.query.user) {
      return res.json({
        success: 0,
        status: "Unauthorised",
      });
    }
    list(user_id, async (err, result) => {
      if (!!err) {
        return res.json({
          success: 0,
          status: "Cannot fetch notes",
        });
      }

      //Decrypting all the notes
      const allNotes = await result.map((note) => {
        return {
          title: cryptr.decrypt(note.title),
          data: cryptr.decrypt(note.data),
        };
      });
      return res.json({
        success: 1,
        data: allNotes,
      });
    });
  },
};
