let pokemonList = [
    {name: 'Bulbasaur', height: '70'},
    {name: 'Charmander', height: '60'},
    {name: 'Hitmonlee', height: '150'}
];

// Writes the list of pokemons to the DOM and singles out the large pokemon with a comment next to their height.
for (let i = 0; i < pokemonList.length; i++) {
  if(pokemonList[i].height > 100) {
    document.write('<p class="jscript">' + pokemonList[i].name + '\'s  ' + 'height: ' + pokemonList[i].height + ' cm. ' + 'Wow, this one is huge!' + '</p>' + '<br>');
  } else {
    document.write('<p class="jscript">' + pokemonList[i].name + '\'s  ' + 'height: ' + pokemonList[i].height + ' cm.' + '</p>' + '<br>');
    }
  }
