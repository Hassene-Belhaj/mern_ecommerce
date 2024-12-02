const express = require("express");
const {
  register,
  login,
  logout,
  authMiddleware,
} = require("../controllers/auth_controller");
const router = express.Router();

router.post("/signup", register);
router.post("/signin", login);
router.post("/logout", logout);
router.get("/check-auth", authMiddleware, async (req, res) => {
  const user = req.user;
  return res.status(200).json({
    success: true,
    message: "you are authenticated",
    user,
  });
});

module.exports = router;
