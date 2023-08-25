const BASE_URL = 'https://api.thecatapi.com/v1';
const END_POINT = '/breeds';

const API_KEY =
  'live_J6tX4pQ53pVA2LLKOlYMMluSMWexkyGGz7jGorivNqc9gJBUIQxBUJTLN7voFAFQ';

function fetchBreeds() {
  return fetch(`${BASE_URL}${END_POINT}?`, {
    headers: {
      'x-api-key': `${API_KEY}`,
    },
  }).then(response => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
    loader.classList.remove('is-hidden');
  });
}

function fetchCatByBreed(breedId) {
  return fetch(
    `${BASE_URL}/images/search?breed_ids=${breedId}&api_key=${API_KEY}`
  ).then(resp => {
    if (!resp.ok) {
      throw new Error(resp.statusText);
    }
    return resp.json();
  });
}

export { fetchBreeds, fetchCatByBreed };
