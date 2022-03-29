//Initialize the express 'app' object
let express = require("express");
let app = express();
app.use("/", express.static("public"));

//Initialize the actual HTTP server
let http = require("http");
let server = http.createServer(app);

let messages = [];
//Initialize socket.io
//Initialize socket.io
let io = require("socket.io");
io = new io.Server(server);

io.sockets.on("connect", (socket) => {
  console.log("wheee", socket.id);
  let data = { oldMessages: messages };
  socket.emit("pastMessages", data);
  socket.on("disconnect", () => {
    console.log("connection ended", socket.id);
  });

  socket.on("chatMessage", (data) => {
    console.log(data);
    messages.push(data);
    console.log(messages);
    io.sockets.emit("chatMessage", data);
  });

  socket.on("userTyping", () => {
    io.sockets.emit("userTyping");
  });
});

//run the createServer
let port = process.env.PORT || 4000;
server.listen(port, () => {
  console.log("Server listening at port: " + port);
});
