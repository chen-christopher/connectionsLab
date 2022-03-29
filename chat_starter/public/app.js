console.log("client says hello");

const app = {
  initialize: () => {
    let socket = io();
    socket.on("connect", () => {
      console.log("connected to server");
    });
    socket.on("userTyping", () => {
      console.log("user is typing");
    });
    socket.on("pastMessages", (data) => {
      console.log(data.oldMessages);
      if (data.oldMessages.length > 0) {
        let chatWindow = document.getElementById("chat-box-msgs");
        for (let i = 0; i < data.oldMessages.length; i++) {
          console.log(data.oldMessages[i].name, data.oldMessages[i].msg);
          let chatMessage = document.createElement("p");
          chatMessage.innerHTML =
            data.oldMessages[i].name + " : " + data.oldMessages[i].msg;
          chatWindow.appendChild(chatMessage);
        }
      }
    });
    socket.on("chatMessage", (data) => {
      let chatWindow = document.getElementById("chat-box-msgs");
      let chatMessage = document.createElement("p");
      chatMessage.innerHTML = data.name + " : " + data.msg;
      chatWindow.appendChild(chatMessage);
    });
    console.log("load");
    const submitButton = document.getElementById("send-button");

    submitButton.addEventListener("click", () => {
      let name = document.getElementById("name-input").value;
      let msg = document.getElementById("msg-input").value;
      console.log(name, msg);

      //emit info to server
      chatObject = {
        name: name,
        msg: msg,
      };

      socket.emit("chatMessage", chatObject);
    });

    let messageInput = document.getElementById("msg-input");
    messageInput.addEventListener("keypress", () => {
      socket.emit("userTyping");
    });
  },
};
