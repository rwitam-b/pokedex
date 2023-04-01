let api_host = "https://pokeapi.co";

if (process.env.REACT_APP_API_URL) {
    api_host = process.env.REACT_APP_API_URL;
}

export let endpoints = {
    GET_POKEMONS: `${api_host}/api/v2/pokemon`,
    GET_SPECIES: `${api_host}/api/v2/pokemon-species`
};