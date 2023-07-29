// npx http-server
// https://devdocs.io/dom/fetch
console.log('Get to catch them all!');

const fetchPromise = fetch("https://pokeapi.co/api/v2/pokemon/ditto");

const jsonParsingPromise = fetchPromise
    .catch(function() {
        console.error('deu ruim na chamada...');
    })
    .then(function(response) {
        return response.json();
    });

    jsonParsingPromise
    .catch(function() {
        console.error('deu ruim, nao era json...');
    })
    .then(function(pokemon) {
        console.log(pokemon);
    });