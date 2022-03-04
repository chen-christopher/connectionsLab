const app = {
  initialize: () => {
    //seems a bit inefficient to do it like this where i add event listener for each button
    //but wasn't sure how else to do it
    //brand buttons
    document.getElementById("adp").addEventListener("click", () => {
      fetch("/fragrance?brand=acquadiparma")
        .then((response) => response.json())
        .then((data) => {
          app.showData(data);
        });
    });
    document.getElementById("br").addEventListener("click", () => {
      fetch("/fragrance?brand=bananarepublic")
        .then((response) => response.json())
        .then((data) => {
          app.showData(data);
        });
    });
    document.getElementById("ch").addEventListener("click", () => {
      fetch("/fragrance?brand=chanel")
        .then((response) => response.json())
        .then((data) => {
          app.showData(data);
        });
    });
    document.getElementById("dp").addEventListener("click", () => {
      fetch("/fragrance?brand=diptyque")
        .then((response) => response.json())
        .then((data) => {
          app.showData(data);
        });
    });
    document.getElementById("gc").addEventListener("click", () => {
      fetch("/fragrance?brand=givenchy")
        .then((response) => response.json())
        .then((data) => {
          app.showData(data);
        });
    });
    document.getElementById("he").addEventListener("click", () => {
      fetch("/fragrance?brand=hermes")
        .then((response) => response.json())
        .then((data) => {
          app.showData(data);
        });
    });
    document.getElementById("jv").addEventListener("click", () => {
      fetch("/fragrance?brand=johnvarvatos")
        .then((response) => response.json())
        .then((data) => {
          app.showData(data);
        });
    });
    document.getElementById("nyc").addEventListener("click", () => {
      fetch("/fragrance?brand=kierinnyc")
        .then((response) => response.json())
        .then((data) => {
          app.showData(data);
        });
    });
    //top button
    document.getElementById("top").addEventListener("click", () => {
      fetch("/fragrance/top")
        .then((response) => response.json())
        .then((data) => {
          app.showData(data);
        });
    });
    //gender buttons
    document.getElementById("men").addEventListener("click", () => {
      fetch("/fragrance?gender=men")
        .then((response) => response.json())
        .then((data) => {
          app.showData(data);
        });
    });
    document.getElementById("women").addEventListener("click", () => {
      fetch("/fragrance?gender=women")
        .then((response) => response.json())
        .then((data) => {
          app.showData(data);
        });
    });
    document.getElementById("unisex").addEventListener("click", () => {
      fetch("/fragrance?gender=unisex")
        .then((response) => response.json())
        .then((data) => {
          app.showData(data);
        });
    });
  },
  //after get json, create new elements to hold the data
  showData: (fragrances) => {
    const fragranceBlock = document.querySelector(".fragrance_block");
    //empty the block so no elements from prev queries are shown
    while (fragranceBlock.firstChild) {
      fragranceBlock.removeChild(fragranceBlock.firstChild);
    }
    for (fragrance in fragrances) {
      console.log(fragrances[fragrance].image, fragrance);
      let newFragrance = document.createElement("div");
      newFragrance.classList.add("fragrance_block");
      newFragrance.classList.add("pushDown");
      let newImg = document.createElement("img");
      newImg.src = fragrances[fragrance].image;
      newImg.classList.add("fragrance_block_img");
      let newName = document.createElement("h3");
      newName.innerText = fragrance;
      newName.classList.add("fragrance_block_h3");
      let newHouse = document.createElement("h4");
      newHouse.innerText = `House: ${fragrances[fragrance].brand}`;
      newHouse.classList.add("fragrance_block_h4");
      let newType = document.createElement("h4");
      newType.innerText = `Classification: ${fragrances[fragrance].classification}`;
      newType.classList.add("fragrance_block_h4");
      let newNotes = document.createElement("h4");
      newNotes.classList.add("fragrance_block_h4");
      newNotes.innerText = `Notes: ${fragrances[fragrance].notes}`;
      newFragrance.appendChild(newImg);
      newFragrance.appendChild(newName);
      newFragrance.appendChild(newHouse);
      newFragrance.appendChild(newType);
      newFragrance.appendChild(newNotes);
      fragranceBlock.appendChild(newFragrance);
    }
    //a simple scroll into view
    fragranceBlock.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  },
};
