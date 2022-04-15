//Initialize the express 'app' object
let express = require("express");
let app = express();
app.use("/", express.static("public"));

//Initialize the actual HTTP server
let http = require("http");
let server = http.createServer(app);

//Initialize socket.io
//Initialize socket.io
let io = require("socket.io");
io = new io.Server(server);

let inputSockets = io.of("/input");
let outputSockets = io.of("/outpu");

let numVotesA = 0;
let numVotesB = 0;

inputSockets.on("connect", (socket) => {
  console.log("input socket connected ", socket.id);

  socket.on("votedA", () => {
    numVotesA++;
    console.log("a votes:", numVotesA);

    let data = {
      a: numVotesA,
      b: numVotesB,
    };
    outputSockets.emit("votes", data);
  });
  socket.on("votedB", () => {
    numVotesB++;
    console.log("b votes:", numVotesB);
    let data = {
      a: numVotesA,
      b: numVotesB,
    };
    outputSockets.emit("votes", data);
  });
  socket.on("disconnect", () => {
    console.log("socket disconnected input ", socket.id);
  });
});

outputSockets.on("connect", (socket) => {
  console.log("output socket connected ", socket.id);

  socket.on("disconnect", () => {
    console.log("output socket disconnected ", socket.id);
  });
});

//run the createServer
let port = process.env.PORT || 4000;
server.listen(port, () => {
  console.log("Server listening at port: " + port);
});
