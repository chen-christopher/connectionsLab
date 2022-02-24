const app = {
  initialize: async () => {
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
  battleText: document.querySelector(".battle_block_text_layer"),
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

        setTimeout(() => {
          // pokemonImg.classList.add("slideLR");
          // rightBG.classList.remove("slideLRBackground");
          // charImg.classList.remove("slideRL");
          // leftBG.classList.remove("slideRL");
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
  showDescription: async (pokeDescription, height, weight, name, id) => {
    app.battleText.innerHTML = "You used the Pokedex.";
    newID = String(id).padStart(3, "0");
    name = app.capitalize(name);
    console.log(name);
    console.log("new", newID);
    const pokedexDiv = document.querySelector(".pokedex_block");
    while (pokedexDiv.firstChild) {
      pokedexDiv.removeChild(pokedexDiv.lastChild);
      console.log("removing!@#!@#@!#");
    }

    await fetch(pokeDescription)
      .then((response) => response.json())
      .then(async (data) => {
        console.log(data.flavor_text_entries);
        description = data.flavor_text_entries[1].flavor_text.replace(
          /\s/g,
          " "
        );
        genera = data.genera[7].genus;
        dataName = document.createElement("h3");
        dataHeight = document.createElement("h3");
        dataWeight = document.createElement("h3");
        dataGenus = document.createElement("h3");
        dataDescription = document.createElement("h3");
        dataName.innerText = `No ${newID}: ${name}`;
        dataGenus.innerText = genera;
        dataHeight.innerText = `Height:\t\t${height}m`;
        dataWeight.innerText = `Weight:\t\t${weight}kg`;
        dataDescription.innerText = `-----------------------------------\n${description}`;
        pokedexDiv.appendChild(dataName);
        pokedexDiv.appendChild(dataGenus);
        pokedexDiv.appendChild(dataHeight);
        pokedexDiv.appendChild(dataWeight);
        pokedexDiv.appendChild(dataDescription);
        pokedexDiv.classList.remove("none");
      });
  },
  runAway: () => {
    console.log("I RAN AWAY");
    app.battleText.innerHTML = "You ran away...";
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
