//IIFE
let pokemonRepository = (function () {

  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  //Required information for a pokemon entry
  function add(pokemon) {
    if (typeof pokemon === 'object' &&
      "name" in pokemon
      // && "detailsUrl" in pokemon
      // && "height" in pokemon
      // && "type" in pokemon 
    ) {
      pokemonList.push(pokemon);
    } else {
      console.log(`${pokemon} is not a Pokémon. Information missing`);
    }
  }

  function getAll() {
    return pokemonList
  }

  //Creating a pokemon list
  function addListItem(pokemon) {
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
    button.addEventListener('click', function (event) {
      showDetails(pokemon)
    })

  }

  // function showDetails(pokemon) {
  //   console.log(pokemon)
  // }

  function loadList() {
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    })
  }

  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      // Now we add the details to the item
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
    }).catch(function (e) {
      console.error(e);
    });
  }

  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      console.log(pokemon);
    });
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails
  };

})();

//Looping 
pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});