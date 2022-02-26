const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    chatId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", MessageSchema);
