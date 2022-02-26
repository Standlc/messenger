const router = require("express").Router();
const Message = require("../models/Message");
const User = require("../models/User");

//SEND
router.post("/:chatId", async (req, res) => {
  try {
    const newMessage = new Message({
      content: req.body.content,
      userId: req.body.userId,
      chatId: req.params.chatId,
    });
    const savedMessage = await newMessage.save();

    res.status(200).json(savedMessage);
  } catch (error) {
    res.status(500).json(error);
  }
});

//GET Chat MESSAGES
router.get("/:chatId", async (req, res) => {
  try {
    const messages = await Message.find({
      chatId: req.params.chatId,
    });
    const messagesCopy = [];
    await Promise.all(
      messages.map(async (message) => {
        const { userID, ...others } = message._doc;
        const messageCopy = { ...others, userInfos: {} };
        const user = await User.findById(message.userId);
        const { password, ...userOthers } = user._doc;
        messageCopy.userInfos = userOthers;
        messagesCopy.push(messageCopy);
      })
    );

    res.status(200).json(messagesCopy);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
