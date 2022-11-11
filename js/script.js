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
      showModal(pokemon);
    });
  }

  function showModal (pokemon) {
    let modalContainer = document.querySelector('.modal-container');
     modalContainer.innerText ='';
    
    let modal = document.createElement('div');
     modal.classList.add('modal');
    
    let title = document.createElement('h1');
     title.innerText = pokemon.name;
    
     let pokemonImage = document.createElement('img');
     pokemonImage.src = pokemon.imageUrl;
    
     let pokemonHeight = document.createElement('p');
     pokemonHeight.innerText = "Height: " + pokemon.height;
    
     let pokemonType = document.createElement('p');
     pokemonType.innerText = "Type: " + pokemon.type;
    
    
     modal.appendChild(title);
     modal.appendChild(pokemonImage);
     modal.appendChild(pokemonHeight);
     modal.appendChild(pokemonType);
     modalContainer.appendChild(modal);
    
     modalContainer.addEventListener('click', (e) => {
     let target = e.target;
     if (target === modalContainer) {
     hideModal();
     }
     });
    
      modalContainer.classList.add('is-visible');
     };
    
  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
    showModal: showModal
  };

})();

//Looping 
pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});

/*(function() {

  let modalContainer = document.querySelector('#modal-container');

  function showModal(title, text) {

    modalContainer.innerHTML = '';

    let modal = document.createElement('div');
    modal.classList.add('modal');

    let closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerText = 'Close';
    closeButtonElement.addEventListener('click', hideModal);

    let titleElement = document.createElement('h1');
    titleElement.innerText = title;

    let contentElement = document.createElement('p');
    contentElement.innerText = text;

    modal.appendChild(closeButtonElement);
    modal.appendChild(titleElement);
    modal.appendChild(contentElement);
    modalContainer.appendChild(modal);

    modalContainer.classList.add('is-visible');
  };

  function hideModal() {
    modalContainer.classList.remove('is-visible');
  };
  
  window.addEventListener('keydown', (e) => {
    let modalContainer = document.querySelector('#modal-container');
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
      hideModal();
    };
  });
  
  modalContainer.addEventListener('click', (e) => {
    // Since this is also triggered when clicking INSIDE the modal
    // We only want to close if the user clicks directly on the overlay
    let target = e.target;
    if (target === modalContainer) {
      hideModal();
    }
  });
  document.querySelector('#show-modal').addEventListener('click', () => {
    showModal('Modal title', 'This is the modal content!');
  });
  
})();*/