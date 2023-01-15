import Notiflix from 'notiflix';
import { inputName } from './index';

const insertBox = document.querySelector('.country-list');
function callFetch() {
  if (inputName === '') {
    removeAllChildNodes(insertBox);
    return;
  }
  fetch(
    `https://restcountries.com/v2/name/${inputName}?fields=name,flag,capital,population,languages `
  )
    .then(responce => {
      console.log(responce);
      if (!responce.ok) {
        throw new Error();
      }
      return responce.json();
    })
    .then(countries => {
      console.log(countries);
      createCountries(countries);
    })
    .catch(onFetcherror);
}

function createCountries(countries) {
  let markUp = '';

  if (countries.length === undefined) {
    markUp = '';
  } else if (countries.length === 1) {
    markUp = countries
      .map(({ name, flag, capital, population, languages }) => {
        // console.log(languages);
        const languagesName = Object.values(languages);
        let lang = '';
        languagesName.forEach(language => {
          lang += language.name;
        });
        // console.log(languagesName);
        return `<li class='item'>
  <img class="gallery__image" src="${flag} " alt="${name}" width='300' hight='200'/>
  <p>Name: ${name} </p>
  <p>Capital: ${capital} </p>
  <p>Population: ${population} </p>
    <p>Langueges: ${lang} </p>
    </li>`;
      })
      .join('');
  } else if (countries.length > 10) {
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
  } else {
    markUp = countries
      .map(({ name, flag }) => {
        return `<li class='item'>
  <img class="gallery__image" src="${flag}" alt="${name}" width='60' hight='40'/>
  <p>${name} </p>
  </li>`;
      })
      .join('');
    //    console.log(inputName);
  }
  insertBox.innerHTML = markUp;
}

function onFetcherror(error) {
  Notiflix.Notify.failure('Oops, there is no country with that name');
}

function removeAllChildNodes(insertBox) {
  while (insertBox.firstChild) {
    insertBox.removeChild(insertBox.firstChild);
  }
}

export { callFetch };
