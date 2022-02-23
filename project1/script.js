const app = {
  initialize: () => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
      .then((response) => response.json())
      .then((data) => {
        console.log("yo", data);
        const pokemonBlock = document.querySelector(".pokeBox_pokemon_block");
        allPokemon = data.results;
        console.log(allPokemon);
        for (let i = 0; i < allPokemon.length; i++) {
          fetch(allPokemon[i].url)
            .then((response) => response.json())
            .then((data) => {
              console.log(data);
              newImg = document.createElement("img");
              newImg.src =
                data.sprites.versions["generation-vii"].icons["front_default"];
              newImg.classList.add("pokeBox_pokemon_block_img");
              newImg.dataset.apiQuery =
                "https://pokeapi.co/api/v2/pokemon/" + data.id;
              newImg.addEventListener("click", app.pokemonPage);
              pokemonBlock.appendChild(newImg);
            });
        }
      });
  },
  pokemonPage: (e) => {
    const battleBlock = document.querySelector(".battle_block");
    console.log(e.currentTarget);
    fetch(e.currentTarget.dataset.apiQuery)
      .then((response) => response.json())
      .then((data) => {
        battleBlock.removeChild(battleBlock.lastChild);
        console.log(data);
        pokemonImg = document.createElement("img");
        pokemonName = document.createElement("h3");
        pokemonName.innerText = data.name;
        pokemonImg.src = data.sprites.front_default;
        pokemonImg.classList.add("battle_block_img");
        console.log(newImg.src);
        battleBlock.appendChild(pokemonImg);
      });
  },
};
