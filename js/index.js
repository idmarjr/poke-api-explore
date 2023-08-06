// npx http-server
// https://devdocs.io/dom/fetch
console.log('Gotta catch \'em all!');

const fetchPromise = fetch("https://pokeapi.co/api/v2/pokemon");

// Handle promisse from API fetch
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
const jsonParsing = fetchPromise
    // If the API response  is good, handle it as JSON
    .then(function(response) {
        return response.json();
    })
    // If something goes wrong, show console error message
    .catch(function() {
        console.error('Something went wrong when reaching the API');
    });

jsonParsing
    // Since .json() (Line 12) returns a promisse, we need to handle with it again
    .then(function(pokemonListJSON) {
        //pokemonItemTemplate(pokemonListJSON.results)
        console.log(jsonParsing)
    })
    // In case data was not JSON, show console error message
    .catch(function() {
        console.error('Data from API is not JSON');
    });

// Template to render data from API
function pokemonItemTemplate(list) {
    const template =
    `<li>
        <h2><href="${pokemon.url}">${pokemon.name}</a></h2>
    </li>`;
}

// Create a loop to feed the template with data
// Use for or foreach

