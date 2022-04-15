console.log("client says hello");

let socket = io("/input");
socket.on("connect", () => {
  console.log("i have connted");
});
