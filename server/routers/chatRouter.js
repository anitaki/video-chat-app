const router = require("express").Router();
const chatController = require("../controllers/chatController");

router.get("/", chatController.getMessages);
router.post("/post", chatController.postMessage);
router.delete("/:id", chatController.deleteMessage);




module.exports = router;