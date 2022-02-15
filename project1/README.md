# Project 1

### Project Description

For this project, I intend to use the Pokeapi as my dataset. As a child, I had a catalogue featuring various Pokemon. I plan to create a Pokedex like web page where users are able to select from the generation one pokemon (will potentially scale to more). In the main page, the pokemon are displayed in their icon mode. Upon clicking on them, you will be able to "meet" this pokemon. I'll experiment to see if I am able to replicate the encounter animation as you would see in the games.

In the Pokemon games, there is normally a safari zone where you are able to see various different Pokemon and capture them. This is different from regular gameplay as you are not allowed to battle them. I intend to replicate a similar type of interaction but instead of capturing them, you would be given the option to examine them with your Pokedex which shows information about the Pokemon that you're seeing.

The link to the web page is listed below:
https://chen-christopher.github.io/connectionsLab/project1/

### Process

As of now, I have the Pokemon icons displayed on the home page. This is done using fetch and limiting the pokemon to 151 with the query "https://pokeapi.co/api/v2/pokemon?limit=151". By doing so, I can get all of the generation one pokemon. I access the icon by going into data.sprites.versions["generation-vii"].icons["front_default"]. I realized that if I wanted to retain the previous information about the pokemon, I would have to save it somewhere. Thus I saved the query for the specific pokemon (for example bulbasaur would be https://pokeapi.co/api/v2/pokemon/1) in a dataset with the image. As a result, when I click on the Pokemon, I can directly use the dataset to send a request for the specific pokemon's information. To display the pokemon later on, I just use fetch again with that query and then access the wanted information.

### Reflection
