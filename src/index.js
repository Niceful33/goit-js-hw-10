import './css/styles.css';
import { fetchCountries } from './fetchCountries';

const debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;
export const DEFAULT_URL = 'https://restcountries.com/v3.1/name';
export const inputSearch = document.querySelector('#search-box');
export const countryList = document.querySelector('.country-list');
export const countryInfo = document.querySelector('.country-info');

inputSearch.addEventListener('input', debounce(fetchCountries, DEBOUNCE_DELAY));
export function createMarkupOneCountry(arr) {
  return arr
    .map(
      item =>
        `<div class='item-country'><img class='img' src="${
          item.flags.svg
        }" alt="flag" width=60 height=50>
        <h2 class='title'> ${item.name.official}</h2></div>
        
        <p><span>Capital:</span> ${item.capital}</p>
        <p><span>Population:</span> ${item.population}</p>
        <p><span>Languages:</span> ${Object.values(item.languages).join(
          ', '
        )}</p>
    <p><img src="https://www.svgrepo.com/show/306970/wikipedia.svg" alt="Wikipedia" width=30> <a href="https://uk.wikipedia.org/wiki/${
      item.name.official
    } " target="_blank">Link to Wikipedia</a></p>
       <p><img src="https://www.svgrepo.com/show/353819/google-maps.svg" alt="Google maps" width=30><a href="https://www.google.com.ua/maps/place/${
         item.name.official
       }"target="_blank">Link to Google maps</a></p>`
    )
    .join('');
}

export function createMarkupFewCountries(arr) {
  return arr
    .map(
      item =>
        `<li class='item'>
        <img class='img' src="${item.flags.svg}" alt="flag" width=40 height=30>
        <h2> ${item.name.official}</h2>
        </li>`
    )
    .join('');
}
