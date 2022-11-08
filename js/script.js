//IIFE
let pokemonRepository = (function () {

  //An empty array, for pokemons to be included in.
  let pokemonList = [];
  
  //Required information for a pokemon entry
  function add(pokemon){
    if (typeof pokemon === 'object' 
    && pokemon.name 
    && pokemon.height 
    && pokemon.type 
    && Object.keys(pokemon).length === 3) {
      pokemonList.push(pokemon);
      } else {
      return `${pokemon} is not a Pokémon. Information missing`;
    }
  }
    
  function getAll () {
    return pokemonList
  }

  //Creating a pokemon list
  function addListItem(pokemon){
    let pokemonList = document.querySelector(".pokemon-list");
    let itemPokemonList = document.createElement("li");

    //Creating a button
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("pokemon-button");

    //Appending what is created
    itemPokemonList.appendChild(button);
    pokemonList.appendChild(itemPokemonList);

    //event listener
    button.addEventListener('click', function(event) {
      showDetails(pokemon)
    })

  }

  function showDetails(pokemon){
    console.log(pokemon)
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem
    };
  
}) ();
  
//Ading pokemons to the list
pokemonRepository.add({ name: 'Bulbasaur', height: 60, type:'Grass' });
pokemonRepository.add({ name: 'Charmander', height: 70, type:'Fire'});
pokemonRepository.add({ name: 'Hitmonlee', height: 120, type:'Fighting'});
pokemonRepository.add({ name: 'Pikachu', height: 30, type:'Electric'});
  
let pokemonList = pokemonRepository.getAll();

//Looping 
pokemonRepository.getAll().forEach(function (pokemon) {
  pokemonRepository.addListItem(pokemon);
});
  