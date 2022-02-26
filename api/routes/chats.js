const router = require("express").Router();
const Chat = require("../models/Chat");
const Message = require("../models/Message");
const User = require("../models/User");

//START NEW CONVERSATION
router.post("/new", async (req, res) => {
  try {
    const newChat = new Chat({
      usersIds: req.body,
    });
    const savedChat = await newChat.save();

    res.status(200).json(savedChat);
  } catch (error) {
    res.status(500).json(error);
  }
});

//GET USER CHATS
router.get("/:userId", async (req, res) => {
  try {
    const userChats = await Chat.find({
      usersIds: { $in: [req.params.userId] },
    });

    const chatsInfos = [];

    await Promise.all(
      userChats.map(async (chat) => {
        const { usersIds, ...others } = chat._doc;
        const messages = await Message.find({
          chatId: chat._id,
        });
        const lastMessage = messages[messages.length - 1];
        const lastMessageUser = await User.findById(lastMessage.userId);
        const { password, ...othersLastMessageUser } = lastMessageUser._doc;
        const { userId, ...othersLastMessage } = lastMessage._doc;
        const lastMessageInfos = {
          ...othersLastMessage,
          userInfos: { ...othersLastMessageUser },
        };

        const chatCopy = {
          ...others,
          membersInfos: [],
          lastMessage: lastMessageInfos,
        };

        await Promise.all(
          chat.usersIds.map(async (userId) => {
            if (userId === req.params.userId) return;
            const memberInfos = await User.findById(userId);
            const { password, chatId, ...others } = memberInfos._doc;
            chatCopy.membersInfos.push({ ...others });
          })
        );
        chatsInfos.push(chatCopy);
      })
    );

    res.status(200).json(chatsInfos);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
