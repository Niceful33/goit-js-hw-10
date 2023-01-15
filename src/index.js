import './css/styles.css';
import debounce from 'lodash.debounce';
import { callFetch } from './fetchCountries';
const DEBOUNCE_DELAY = 300;

const inputData = document.querySelector('#search-box');
console.log(inputData);
let inputName = '';

inputData.addEventListener('input', debounce(countriesName, DEBOUNCE_DELAY));

function countriesName(evt) {
  // console.log(evt.currentTarget.value);
  inputName = evt.target.value.trim();
  callFetch();
}

export { inputName };
// let countriesOut = {};
