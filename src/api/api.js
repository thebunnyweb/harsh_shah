import Config from "../appconfig";

export function getCharacters(page) {
  return fetch(`${Config.API_ENDPOINT_GET_CHARACTERS}?_page=${page}`);
}

export function getCharactersSearch(query){
  return fetch(`${Config.API_ENDPOINT_GET_CHARACTERS}?q=${query}`);
}