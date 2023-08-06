// npx http-server
// https://devdocs.io/dom/fetch
console.log('Gotta catch \'em all!');

const fetchPromise = fetch("https://pokeapi.co/api/v2/pokemon");

const jsonParsingPromise = fetchPromise
    .then(function(response) {
        return response.json();
    })
    .catch(function() {
        console.error('Deu ruim na chamada...');
    });

jsonParsingPromise
    .then(function(pokemonListJSON) {
        renderPokemionList(pokemonListJSON.results)
    })
    .catch(function() {
        console.error('deu ruim, nao era json...');
    });

function renderPokemionList(list) {
    const template =
    `<ul>
        <li>
            <h2>${x.name}</h2>
            <span>${x.url}</snap>
        </li>
    </ul>`;

    // loop na lista
    // for ou foreach

}