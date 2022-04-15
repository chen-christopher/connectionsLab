console.log("client says hello");

let socket = io("/output");
socket.on("connect", () => {
  console.log("i have connted");
});

socket.on("votes", (data) => {
  console.log(data);
});
