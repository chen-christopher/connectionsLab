const app = {
  initialize: () => {
    fetch("/message")
      .then((response) => response.json())
      .then((data) => app.loadPosts(data));
    const newPost = document.querySelector(".new_button");
    newPost.addEventListener("click", app.showCreate);
    const refreshButton = document.querySelector(".refresh_button");
    refreshButton.addEventListener("click", () =>
      fetch("/message")
        .then((response) => response.json())
        .then((data) => app.loadPosts(data))
    );
    const createPostButton = document.getElementById("create_button");
    createPostButton.addEventListener("click", () => {
      let cName = document.getElementById("name").value;
      let cPost = document.getElementById("post").value;

      let data = {
        name: cName,
        post: cPost,
      };
      document.getElementById("name").value = "";
      document.getElementById("post").value = "";
      let msgObjectJSON = JSON.stringify(data);
      fetch("/message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: msgObjectJSON,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
        });
    });

    console.log("connected");
  },
  shown: false,
  showCreate: () => {
    console.log("clicked create");
    let createDiv = document.querySelector(".create");
    console.log(app.shown);
    if (app.shown == false) {
      createDiv.classList.remove("none");
      app.shown = true;
    } else {
      createDiv.classList.add("none");
      app.shown = false;
    }
    fetch("/message")
      .then((response) => response.json())
      .then((data) => app.loadPosts(data));
  },
  loadPosts: (data) => {
    console.log(data);
    const postsDiv = document.querySelector(".posts");
    while (postsDiv.firstChild) {
      postsDiv.removeChild(postsDiv.lastChild);
    }
    for (let i = 0; i < data.data.length; i++) {
      console.log(data.data[i].name);
      let newPost = document.createElement("li");
      let newName = document.createElement("h3");
      let newContent = document.createElement("h4");

      newPost.classList.add("post");
      newName.classList.add("post_name");
      newContent.classList.add("post_content");

      newName.innerHTML = data.data[i].name;
      newContent.innerHTML = data.data[i].post;
      newPost.appendChild(newName);
      newPost.appendChild(newContent);
      postsDiv.appendChild(newPost);
    }
  },
};
