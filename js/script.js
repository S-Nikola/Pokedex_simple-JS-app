//IIFE
let pokemonRepository = (function () {

  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  //Required information for a pokemon entry
  function add(pokemon){
    if( 
        typeof pokemon === "object" &&
        "name" in pokemon &&
        "detailsUrl" in pokemon
        ){
        pokemonList.push(pokemon);
    } else {
        console.log("is not a pokemon");
    }
}

  function getAll() {
    return pokemonList
  }

  //Creating a pokemon list
  function addListItem(pokemon) {
    pokemonRepository.loadDetails(pokemon).then(function () {
    let list = $(".list");
    let card = $('<div class="card" style="width:300px"></div>');
    let cardImage = $('<img class="card-img-top" alt="Card image" style="width:50%"/>');
    cardImage.attr("src", pokemon.imageUrl);
    // let cardTitle = $('<h5 id="card-title" class="card-title" >Pokemon</h5>');
    let cardTitle = pokemon.name;
    let cardBody = $('<div class="card-body"></div>');
  
    let detailsButton = $('<button type="button" id="pokemon-button" class="btn btn-dark" data-toggle="modal" data-target="#pokemonModal">See details</button>');
    

    list.append(card);
    card.append(cardImage);
    card.append(cardTitle);
    card.append(cardBody);
    cardBody.append(detailsButton);
    

    detailsButton.on("click", () => {
            showDetails(pokemon);
        });
        card.on("click", () => {
            showDetails(pokemon);
        })
      })
  }


// Fetching and loading the data
  function loadList() {
    return fetch(apiUrl).then(function (response) {
      return response.json ();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
        console.log(pokemon);
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
      item.imageUrlFront = details.sprites.front_default;
      item.imageUrlBack = details.sprites.back_default;
      item.height = details.height;
      item.types = details.types.map(function (item) {
          return item.type.name;
        });
        item.abilities = [];
        for (var i = 0; i < details.abilities.length; i++) {
          item.abilities.push(details.abilities[i].ability.name);
        }
        item.weight = details.weight;
      })
    .catch(function (e) {
      console.error(e);
    });
  }

// Function that enables the showing of details on click
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      showModal(pokemon);
    });
  }

  function showModal(item) {
    let modalBody = $(".modal-body");
    let modalTitle = $(".modal-title");
    modalTitle.empty();
    modalBody.empty();

    //creating element for name in modal content
    let nameElement = $("<h1>" + item.name + "</h1>");
    // // creating img in modal content
    let imageElementFront = $('<img class="modal-img" style="width:50%">');
    imageElementFront.attr("src", item.imageUrlFront);
    let imageElementBack = $('<img class="modal-img" style="width:50%">');
    imageElementBack.attr("src", item.imageUrlBack);
    // //creating element for height in modal content
    let heightElement = $("<p>" + "height : " + item.height + "</p>");
    // //creating element for weight in modal content
    let weightElement = $("<p>" + "weight : " + item.weight + "</p>");
    // //creating element for type in modal content
    let typesElement = $("<p>" + "types : " + item.types + "</p>");
    // //creating element for abilities in modal content
    let abilitiesElement = $("<p>" + "abilities : " + item.abilities + "</p>");

    modalTitle.append(nameElement);
    modalBody.append(imageElementFront);
    modalBody.append(imageElementBack);
    modalBody.append(heightElement);
    modalBody.append(weightElement);
    modalBody.append(typesElement);
    modalBody.append(abilitiesElement);
  
  //    function hideModal() {
  //     modalContainer.classList.remove('is-visible');
  //   };
    
  //   window.addEventListener('keydown', (e) => {
  //     let modalContainer = document.querySelector('.modal-container');
  //     if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
  //       hideModal();
  //     };
  //   });
 };


  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
    showModal: showModal,
    // hideModal: hideModal
  };

})();

//Looping 
pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});