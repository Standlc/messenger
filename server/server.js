import { Server } from "socket.io";

const io = new Server({
  cors: {
    origin: "http://localhost:3000",
  },
});

let users = [];

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
  console.log("A user has connected");

  socket.on("newUser", (userId) => {
    addUser(userId, socket.id);
    console.log(users);
  });

  socket.on("newMessage", ({ message, receiversIds }) => {
    receiversIds.map((receiverId) => {
      const receiver = getUser(receiverId);
      io.to(receiver?.socketId).emit("newMessage", message);
    });
  });

  socket.on("disconnect", () => {
    console.log("A user has disconnected");
    removeUser(socket.id);
  });
});

io.listen(8080);
