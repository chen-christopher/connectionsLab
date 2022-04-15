//Initialize the express 'app' object
let express = require("express");
let app = express();
app.use("/", express.static("public"));

//Initialize the actual HTTP server
let http = require("http");
let server = http.createServer(app);

let messages = [];
let rooms = {};
let users = {};
//Initialize socket.io
//Initialize socket.io
let io = require("socket.io");
io = new io.Server(server);

io.sockets.on("connect", (socket) => {
  console.log("wheee", socket.id);

  socket.on("userData", (data) => {
    //save user name in array
    socket.name = data.name;
    socket.roomName = data.room;
    //let the socket join room of choice
    socket.join(socket.room);
    console.log("rooms beg", rooms[socket.roomName]);
    console.log("usersbeg", users[socket.roomName]);
    if (rooms[socket.roomName] < 4) {
      if (rooms[socket.roomName]) {
        rooms[socket.roomName]++;
      } else {
        rooms[socket.roomName] = 1;
      }
      if (users[socket.roomName]) {
        users[socket.roomName].push(socket.name);
      } else {
        users[socket.roomName] = [socket.name];
      }
      console.log("rooms: ", rooms);
      console.log("users: ", users);
    }
  });
  let data = { oldMessages: messages };
  socket.emit("pastMessages", data);
  socket.on("disconnect", () => {
    console.log("connection ended", socket.id);
    rooms[socket.roomName]--;
  });

  socket.on("chatMessage", (data) => {
    console.log(data);
    messages.push(data);
    console.log(messages);
    io.to(socket.room).emit("chatMessage", data);
  });

  socket.on("userTyping", () => {
    io.to(socket.room).emit("userTyping");
  });
});

//run the createServer
let port = process.env.PORT || 4000;
server.listen(port, () => {
  console.log("Server listening at port: " + port);
});
