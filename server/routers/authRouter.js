const router = require("express").Router();
const authController = require("../controllers/authController");

router.post("/register", authController.registerUser);
router.post("/login", authController.loginUser);
router.post("/verify", authController.verifyUser);
router.get("/users", authController.getUsers);

module.exports = router;