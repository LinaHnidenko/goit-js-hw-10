import { fetchBreeds, fetchCatByBreed } from './cat-api';
import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';

const BASE_URL = 'https://api.thecatapi.com/v1';
const END_POINT = '/breeds';

const API_KEY =
  'live_J6tX4pQ53pVA2LLKOlYMMluSMWexkyGGz7jGorivNqc9gJBUIQxBUJTLN7voFAFQ';

const selectBreed = document.querySelector('.breed-select');
const info = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');
const errorText = document.querySelector('.error');

selectBreed.addEventListener('change', onChange);

loader.classList.add('is-hidden');
errorText.classList.add('is-hidden');

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

fetchBreeds()
  .then(data => {
    selectBreed.insertAdjacentHTML('beforeend', createMarkup(data));
    new SlimSelect({
      select: selectBreed,
    });
  })

  .catch(err => {
    Notiflix.Notify.failure(
      'Oops! Something went wrong! Try reloading the page!'
    );
  });

function createMarkup(arr) {
  return arr
    .map(({ id, name }) => `<option value="${id}">${name}</option>`)
    .join('');
}

function onChange(evt) {
  loader.classList.remove('is-hidden');
  info.classList.add('is-hidden');
  const selectedBreedId = evt.target.value;
  fetchCatByBreed(selectedBreedId)
    .then(data => {
      markupCatInfo(data);
      loader.classList.add('is-hidden');
      info.classList.remove('is-hidden');
    })
    .catch(err => {
      loader.classList.add('is-hidden');
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!'
      );
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

function markupCatInfo(data) {
  loader.classList.add('is-hidden');
  const { breeds, url } = data[0];
  const { name, temperament, description } = breeds[0];
  const catInfo = `<img src="${url}" alt="${name}" width="400"/>
  <div class="cat-desc">
      <h1 class="cat-name">${name}</h1>
      <p>${description}</p>
       <h2>Temperament:</h2>
      <p>${temperament}</p>
      </div>`;

  info.innerHTML = catInfo;
}
export { fetchBreeds, createMarkup };
