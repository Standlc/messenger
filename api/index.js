const express = require("express");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const chatsRoute = require("./routes/chats");
const messagesRoute = require("./routes/messages");
const usersRoute = require("./routes/users");
const port = 5050;
const app = express();

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

//CORS FOR FETCHING DATA
const cors = require("cors");
app.use(cors());

mongoose
  .connect(
    "mongodb+srv://standlc:lreEgzOBSJDNseZi@cluster0.j4q1c.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
  )
  .then(() => console.log("DB connection successfull."))
  .catch((err) => console.log(err));

app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/chats", chatsRoute);
app.use("/api/messages", messagesRoute);
app.use("/api/users", usersRoute);

app.listen(port, () => {
  console.log("Backend is running.");
});

// "lreEgzOBSJDNseZi"
