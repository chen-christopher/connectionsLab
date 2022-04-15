console.log("client says hello");

let socket = io("/input");
socket.on("connect", () => {
  console.log("i have connted");
});

window.addEventListener("load", () => {
  let buttonA = document.getElementById("vote-a");
  let buttonB = document.getElementById("vote-b");

  buttonA.addEventListener("click", () => {
    console.log("clicked a");
    socket.emit("votedA");
  });

  buttonB.addEventListener("click", () => {
    socket.emit("votedB");
    console.log("clicked b");
  });
});
