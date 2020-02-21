import Config from '../appconfig';

export function getCharacters(page) {
  return fetch(`${Config.API_ENDPOINT_CHARACTERS}?_page=${page}`);
}

export function getCharactersSearch(query) {
  return fetch(`${Config.API_ENDPOINT_CHARACTERS}?q=${query}`);
}

export function getCharacterById(id) {
  return fetch(`${Config.API_ENDPOINT_CHARACTERS}/${id}`).then(response => {
    if (response.ok) {
      return response.json();
    }
    return response.status;
  });
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

export function patchCharacter(id, data) {
  return fetch(`${Config.API_ENDPOINT_CHARACTERS}/${id}`, {
    method: 'PATCH',
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

export function getSpeices() {
  return fetch(`${Config.API_ENDPOINT_GET_SPECIES}`).then(response =>
    response.json()
  );
}
