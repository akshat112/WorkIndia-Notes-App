const router = require("express").Router();
const { verifyToken } = require("../utils/verify_token");
const { addNewNote, getUserNotes } = require("./notes.controller");

router.post("/", verifyToken, addNewNote);
router.get("/list", verifyToken, getUserNotes);
router.get("/", (req, res) => {
  res.json({
    success: 1,
    status: "Welcome!",
  });
});

module.exports = router;
