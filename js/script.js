  let pokemonRepository = (function () {

    let pokemonList = [];
  
    function add (pokemon) {
      if (typeof pokemon === 'object' && pokemon.name && pokemon.height && pokemon.type && Object.keys(pokemon).length === 3) {
        pokemonList.push(pokemon);
      } else {
        return `${pokemon} is not a Pokémon. Information missing`;
      }
    }
  
    function getAll () {
      return pokemonList
    }
  
    return {
      add: add,
      getAll: getAll
  
    };
  
  }) ();
  
  pokemonRepository.add({ name: 'Bulbasaur', height: 60, type:'Grass' });
  pokemonRepository.add({ name: 'Charmander', height: 70, type:'Fire'});
  pokemonRepository.add({ name: 'Hitmonlee', height: 120, type:'Fighting'});
  pokemonRepository.add({ name: 'Pikachu', height: 30, type:'Electric'});
  
  let pokemonList = pokemonRepository.getAll();
  
  
  //forEach() function that prints the pokemons to the DOM and highlights the large pokemon with a comment next to their height.
  pokemonList.forEach(printInfo);
  function printInfo (pokemon) {
    let highlight = '';
    if (pokemon.height > 100) {
      highlight = " Wow, this one is big!";
    }
    document.write(`<p>${pokemon.name} (height: ${pokemon.height} cm.) ${highlight}</p> <br>`);
  }