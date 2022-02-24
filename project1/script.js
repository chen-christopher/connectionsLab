const app = {
  initialize: async () => {
    document
      .querySelector(".opening_text_block_layer")
      .addEventListener("click", app.showMessages);
    await fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
      .then((response) => response.json())
      .then(async (data) => {
        const pokemonBlock = document.querySelector(".pokeBox_pokemon_block");
        allPokemon = data.results;
        console.log(allPokemon);
        for (let i = 0; i < allPokemon.length; i++) {
          await fetch(allPokemon[i].url)
            .then((response) => response.json())
            .then((data) => {
              // console.log(data);
              newImg = document.createElement("img");
              newImg.src =
                data.sprites.versions["generation-vii"].icons["front_default"];
              newImg.classList.add("pokeBox_pokemon_block_img");
              newImg.dataset.apiQuery =
                "https://pokeapi.co/api/v2/pokemon/" + data.id;
              newImg.dataset.descriptionQuery =
                "https://pokeapi.co/api/v2/pokemon-species/" + data.id;
              newImg.addEventListener("click", app.pokemonPage);
              pokemonBlock.appendChild(newImg);
            });
        }
      });
  },
  counter: 0,
  messages: [
    "Welcome to the world of POKEMON!",
    "My name is OAK.",
    "People affectionately refer to me <br/> as the POKEMON professor.",
    "This world...",
    " ... is inhabitated by creatures far and wide <br/>called POKEMON",
    "For some people, POKEMON are pets.<br/>Others use them for battling.",
    "As for myself...",
    "I study POKEMON as a profession.",
    "We have recently invented a device that allows you <br /> to meet different kinds of POKEMON!",
    " To use it, simply click on a POKEMON <br/> you would like to meet.",
    "Let's get started!",
  ],
  showMessages: () => {
    app.clickSound.load();
    app.clickSound.play();
    if (app.counter < app.messages.length) {
      document.querySelector("#oakText").innerHTML = app.messages[app.counter];
      app.counter++;
    } else {
      document.querySelector("#opening_section").classList.add("none");
      document.querySelector(".pokeBox_block").classList.remove("none");
      app.switchScreen();
    }
  },
  battleText: document.querySelector(".battle_block_text_layer"),
  pokemonCries: document.getElementById("pokemonCries"),
  pokemonPage: (e) => {
    document.querySelector(".pokedex_block").classList.add("none");
    const battleBlock = document.querySelector(".battle_block");
    const pokeBoxBlock = document.querySelector(".pokeBox_block");
    const charImg = document.querySelector(".battle_block_content_charImg");
    const leftBG = document.getElementById("leftBG");
    const rightBG = document.getElementById("rightBG");
    const choice = document.querySelector(".battle_block_choice");

    battleBlock.classList.remove("none");
    pokeBoxBlock.classList.add("none");
    pokeDescription = e.currentTarget.dataset.descriptionQuery;

    fetch(e.currentTarget.dataset.apiQuery)
      .then((response) => response.json())
      .then((data) => {
        battleBlock.removeChild(battleBlock.lastChild);
        console.log(data);
        pokemonImg = document.createElement("img");
        pokemonWeight = data.weight / 10;
        pokemonHeight = data.height / 10;

        pokemonImg.src = data.sprites.front_default;
        pokemonImg.classList.add("battle_block_img");
        pokemonImg.classList.add("none");
        battleBlock.appendChild(pokemonImg);
        pokemonImg.classList.remove("none");
        rightBG.classList.remove("lowOpacity");
        charImg.classList.remove("lowOpacity");
        leftBG.classList.remove("lowOpacity");
        pokemonImg.classList.add("slideLR");
        rightBG.classList.add("slideLRBackground");
        charImg.classList.add("slideRL");
        leftBG.classList.add("slideRL");
        app.battleText.innerText = `A wild ${app.capitalize(
          data.name
        )} has appeared.`;
        app.pokemonCries.setAttribute("src", `./cries/${data.id}.ogg`);
        app.pokemonCries.load();
        setTimeout(() => {
          app.pokemonCries.play();
        }, 2500);

        setTimeout(() => {
          choice.classList.remove("lowOpacity");
          app.battleText.innerHTML = "What will<br/> YOU do?";
        }, 3000);
        document.getElementById("run").addEventListener("click", app.runAway);
        document
          .getElementById("examine")
          .addEventListener("click", () =>
            app.showDescription(
              pokeDescription,
              pokemonHeight,
              pokemonWeight,
              data.name,
              data.id
            )
          );
      });
  },
  dataName: document.createElement("h3"),
  dataHeight: document.createElement("h3"),
  dataWeight: document.createElement("h3"),
  dataGenus: document.createElement("h3"),
  dataDescription: document.createElement("h3"),
  showDescription: async (pokeDescription, height, weight, name, id) => {
    app.clickSound.load();
    app.clickSound.play();
    setTimeout(() => {
      app.pokedexSound.load();
      app.pokedexSound.play();
    }, 300);
    app.battleText.innerHTML = "You used the Pokedex.";
    newID = String(id).padStart(3, "0");
    name = app.capitalize(name);
    console.log(name);
    console.log("new", newID);
    const pokedexDiv = document.querySelector(".pokedex_block");
    // while (pokedexDiv.firstChild) {
    //   pokedexDiv.removeChild(pokedexDiv.lastChild);
    //   console.log("removing!@#!@#@!#");
    // }

    await fetch(pokeDescription)
      .then((response) => response.json())
      .then(async (data) => {
        console.log(data.flavor_text_entries);
        description = data.flavor_text_entries[1].flavor_text.replace(
          /\s/g,
          " "
        );
        genera = data.genera[7].genus;

        app.dataName.innerText = `No ${newID}: ${name}`;
        app.dataGenus.innerText = genera;
        app.dataHeight.innerText = `Height:\t\t${height}m`;
        app.dataWeight.innerText = `Weight:\t\t${weight}kg`;
        app.dataDescription.innerText = `-----------------------------------\n${description}`;
        pokedexDiv.appendChild(app.dataName);
        pokedexDiv.appendChild(app.dataGenus);
        pokedexDiv.appendChild(app.dataHeight);
        pokedexDiv.appendChild(app.dataWeight);
        pokedexDiv.appendChild(app.dataDescription);
        pokedexDiv.classList.remove("none");
      });
  },
  runAwaySound: new Audio("./cries/run.mp3"),
  clickSound: new Audio("./cries/click.wav"),
  pokedexSound: new Audio("./cries/pokedex.wav"),
  runAway: () => {
    app.clickSound.load();
    app.clickSound.play();
    console.log("I RAN AWAY");
    app.battleText.innerHTML = "You ran away...";
    setTimeout(() => {
      app.runAwaySound.load();
      app.runAwaySound.play();
    }, 300);

    setTimeout(() => {
      app.switchScreen();
      app.reset();
    }, 1500);
  },
  capitalize: (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  },
  switchScreen: () => {
    const blackScreen = document.querySelector(".black_screen");
    blackScreen.classList.remove("none");
    setTimeout(() => {
      blackScreen.classList.add("none");
    }, 1600);
  },
  reset: () => {
    const battleBlock = document.querySelector(".battle_block");
    const pokeBoxBlock = document.querySelector(".pokeBox_block");
    const pokedexDiv = document.querySelector(".pokedex_block");
    while (pokedexDiv.firstChild) {
      pokedexDiv.removeChild(pokedexDiv.lastChild);
      console.log("removing!@#!@#@!#");
    }
    battleBlock.classList.add("none");
    pokeBoxBlock.classList.remove("none");
  },
};
