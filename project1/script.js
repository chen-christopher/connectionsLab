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
  pokemonPage: (e) => {
    const battleBlock = document.querySelector(".battle_block");
    console.log(e.currentTarget);
    pokeDescription = e.currentTarget.dataset.descriptionQuery;
    console.log(pokeDescription);

    fetch(e.currentTarget.dataset.apiQuery)
      .then((response) => response.json())
      .then((data) => {
        battleBlock.removeChild(battleBlock.lastChild);
        console.log(data);
        pokemonImg = document.createElement("img");
        pokemonName = document.createElement("h3");
        pokemonName.innerText = data.name;
        pokemonWeight = data.weight / 10;
        pokemonHeight = data.height / 10;

        pokemonImg.src = data.sprites.front_default;
        pokemonImg.classList.add("battle_block_img");
        battleBlock.appendChild(pokemonImg);
        document
          .getElementById("examine")
          .addEventListener("click", () =>
            app.showDescription(pokeDescription, pokemonHeight, pokemonWeight)
          );
      });
  },
  showDescription: async (pokeDescription, height, weight) => {
    console.log("hello");
    console.log(pokeDescription, height + "m", weight + "kg");
    await fetch(pokeDescription)
      .then((response) => response.json())
      .then(async (data) => {
        console.log(data.flavor_text_entries);
        description = data.flavor_text_entries[1].flavor_text.replace(
          "\n",
          " "
        );
        console.log(data.genera);
        genera = data.genera[7].genus;
        console.log(genera);
        console.log(description);
      });
  },
};
