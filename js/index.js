// npx http-server
// https://devdocs.io/dom/fetch
console.log('Gotta catch \'em all!');
const url = "https://pokeapi.co/api/v2/pokemon"

// Fetch data from API
const fetchPromise = fetch(url);

// Handle promisse from API fetch
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
const jsonParsing = fetchPromise
    // If the API response  is good, handle it as JSON
    .then(function(response) {
        return response.json();
    })
    // If something goes wrong, show console error message
    .catch(function(err) {
        console.error('Something went wrong when reaching the API: \n' + err);
    });

jsonParsing
    // Since .json() (Line 12) returns a promisse, we need to handle with it again
    .then(function(pokemonListJSON) {
        renderPokemonList(pokemonListJSON.results);
    })
    // In case data was not JSON, show console error message
    .catch(function(err) {
        console.error('Data from API is not JSON: \n' + err);
    });

// Template to render data from API
function pokemonItemTemplate(pokemon) {
    const artwork = getPokemonArtwork(pokemon);
    const template =
    `<li>
        <h2><a href="${pokemon.url}">${pokemon.name}</a></h2>
        <img src="${ artwork }" alt="${pokemon.name}" width="256"/>
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