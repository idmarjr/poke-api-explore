"use strict";

// npx http-server
// https://devdocs.io/dom/fetch
console.log('Gotta catch \'em all!');
const apiUrl = "https://pokeapi.co/api/v2/pokemon";

const mainHeader = document.querySelector(".main-header");
const pokeList = document.querySelector(".poke-list");
const mainPagination = document.querySelector(".main-pagination");

// Pagination variables
let paginationNext;
let paginationPrevious;

// Handle promisse from API fetch
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
function fetchNextData (url){

    fetch(url) 
        // If the API response  is good, handle it as JSON
        .then(function(response) {
            return response.json();
        })
        // If something goes wrong, show console error message
        .catch(function(err) {
            console.error('Something went wrong when reaching the API: \n' + err);
        })
        // Since .json() returns a promisse, we need to handle with it again
        .then(function(pokemonListJSON) {
            renderPokemonList(pokemonListJSON.results);
            paginationNext = pokemonListJSON.next;
            paginationPrevious = pokemonListJSON.previous; 
        })
        // What to do if te data was not JSON: Show console error message
        .catch(function(err) {
            console.error('Data from API is not JSON: \n' + err);
        });
}

// Template to render data from API
function pokemonItemTemplate(pokemon) {
    const artwork = getPokemonArtwork(pokemon);
    const template =
    `<li class="poke-card">
        <a href="${pokemon.url}">
            <h2 class="poke-name">${pokemon.name}</h2>
            <picture class="poke-picture">
                <img src="${artwork}" alt="${pokemon.name}" width="256"/>
            <picture>
        </a>
    </li>`;
    return template;
};

// Get Pokemon image URL
function getPokemonArtwork(pokemon) {
    const id = pokemon.url.split('/').at(-2);
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${ id }.svg`;
    // Other image options
    //return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${ id }.png`;
    //return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
}

function renderPokemonList(pokemonArray) {
    //Create <ul> t ohold each <li> we will create on loop
    let allPokemonsList = '';
    
    // Loop the list of 20 pokemons (From API response) and apply the template to each one
    pokemonArray.forEach(function(pokemon) {
        const pokemonTemplate = pokemonItemTemplate(pokemon);
        //console.log( pokemonTemplate );
        allPokemonsList += pokemonTemplate;
    });

    // Append the created list to the Dom.
    pokeList.insertAdjacentHTML("beforeend", allPokemonsList);
};

// Load more
function renderLoadMore() {
    const template =`<button id="load-more">Load more</button>`
    mainPagination.insertAdjacentHTML("afterbegin", template);

    const loadMoreButton = document.getElementById("load-more");
    loadMoreButton.addEventListener("click", function(){
        fetchNextData(paginationNext);
    });
};

// Populate page on onload
fetchNextData(apiUrl);

// Render pagination content in the page
renderLoadMore();

/////////////////////////////////
//////////// DETAILS ////////////
/////////////////////////////////
pokeList.addEventListener("click", async function(event) {
    const element = event.target.closest(".poke-card"); //https://youmightnotneedjquery.com/#delegate

    if (element) {
        event.preventDefault();
        const hasInfo = element.dataset.hasInfo !== "true";

        if(hasInfo){
            const url = getPokeUrl(element);
            const data = await getPokemonData(url);
            renderPokeInfo(element, data)
            console.log(data)
        }
    }
});

function getPokeUrl(card) {
    const url = card.querySelector("a").getAttribute("href");
    return url;
};

async function getPokemonData (url) {
    try {
        const fetchPokeData = await fetch(url);
        const pokeData = await fetchPokeData.json();
        return pokeData;
    }
    catch(e){
        console.error("Deu ruim: ", e);
    }
}

function renderPokeInfo(card, pokeInfo){
    const template = `<p>Weight: ${pokeInfo.weight}<p>`
    card.insertAdjacentHTML("beforeend", template);
    card.dataset.hasInfo = true;
}

/*
try {
    const result = await fetch("https://api.fgoobarf");
    const data = await result.json();
    console.log(data);
    //doSoemthing(data);
} catch(e) {
    console.error(e);
}
*/

    // Next steps:
    // DONE 1. Fetch the URL we now have (Use async await)
    // DONE 1.1 Treat error scenario
    // DONE 2. Render it inside the correct card

    // 3. Render poke types
    // 4. Add pagination