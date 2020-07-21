const router = require("express").Router();
const { addNewUser, loginUser } = require("./user.controller");

router.get("/", (req, res) => {
  res.json({
    success: 1,
    message: "Welcome to user route!",
  });
});
router.post("/auth", loginUser);
router.post("/", addNewUser);
module.exports = router;
