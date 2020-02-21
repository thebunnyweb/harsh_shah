import Config from '../appconfig';

export function getCharacters(page) {
  return fetch(`${Config.API_ENDPOINT_CHARACTERS}?_page=${page}`);
}

export function getCharactersSearch(query) {
  return fetch(`${Config.API_ENDPOINT_CHARACTERS}?q=${query}`);
}

export function getSpeices() {
  return fetch(`${Config.API_ENDPOINT_GET_SPECIES}`).then(response =>
    response.json()
  );
}

export function addCharacter(data) {
  return fetch(`${Config.API_ENDPOINT_CHARACTERS}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
}

export function deleteCharacter(id) {
  return fetch(`${Config.API_ENDPOINT_CHARACTERS}/${id}`, {
    method: 'DELETE'
  });
}
