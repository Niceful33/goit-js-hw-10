import './css/styles.css';
import debounce from 'lodash.debounce';
import FetchApiService from './fetchCountries';
import Notiflix from 'notiflix';

const fetchApiService = new FetchApiService();

const DEBOUNCE_DELAY = 300;

const searchCountry = document.querySelector('#search-box');
const allCountries = document.querySelector('.country-list');
const infoCountry = document.querySelector('.country-info');

searchCountry.addEventListener(
  'input',
  debounce(onInputSearch, DEBOUNCE_DELAY)
);

function markupAllCountries(data) {
  return data
    .map(country => {
      return `<li class="country-items">
  <img class="country-img" src="${country.flags.svg}" alt="Flag" width = 20, height = 15></img>
  ${country.name.official}</li>`;
    })
    .join('');
}

function markupOneCountry(data) {
  return data
    .map(country => {
      return `<img src="${
        country.flags.svg
      }" alt="Flag" width="70" height="65"></img>
                <h2 class="country-info-title">${country.name.official}</h2>
            <p>Capital: <span>${country.capital}</span></p>
            <p>Population: <span>${country.population}</span></p>
            <p>Languages: <span>${Object.values(country.languages)}</span></p>`;
    })
    .join('');
}

function renderMarkup(data) {
  clearPage();
  if (data.length === 1) {
    allCountries.insertAdjacentHTML('beforeend', markupOneCountry(data));
  } else if (data.length > 1 && data.length <= 10) {
    infoCountry.insertAdjacentHTML('beforeend', markupAllCountries(data));
  } else if (data.length > 10) {
    Notiflix.Notify.failure(
      'Too many matches found. Please enter a more specific name.'
    );
  }
}

function onInputSearch(e) {
  e.preventDefault();
  if (e.target.value.trim() === '') {
    clearPage();
    return;
  }
  fetchApiService.searchCountry = e.target.value.trim();
  fetchApiService
    .fetchCountries()
    .then(data => renderMarkup(data))
    .catch(onError);
}

const onError = () => {
  Notiflix.Notify.failure('Oops, there is no country with that name');
};

function clearPage() {
  allCountries.innerHTML = '';
  infoCountry.innerHTML = '';
}
