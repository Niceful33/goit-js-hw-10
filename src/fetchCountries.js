import Notiflix from 'notiflix';
import {
  inputSearch,
  DEFAULT_URL,
  countryInfo,
  countryList,
  createMarkupOneCountry,
  createMarkupFewCountries,
} from './index';

export function fetchCountries(name) {
  if (
    inputSearch.value === ' ' ||
    inputSearch.value === '  ' ||
    inputSearch.value === '   '
  ) {
    inputSearch.value = '';
    return;
  }
  if (inputSearch.value !== '') {
    const input = inputSearch.value;
    const inputTrim = input.trim();
    const resp = fetch(
      `${DEFAULT_URL}/${inputTrim}?fields=name,capital,population,flags,languages`
    );

    resp
      .then(responce => {
        if (!responce.ok) {
          throw new Error();
        }
        return responce.json();
      })
      .then(data => {
        if (data.length > 10) {
          Notiflix.Notify.failure(
            `Too many matches found. Please enter a more specific name.`
          );
        }
        if (data.length >= 2 && data.length <= 10) {
          const markupCountries = createMarkupFewCountries(data);
          countryList.innerHTML = markupCountries;
        }
        if (data.length === 1) {
          const markupCountry = createMarkupOneCountry(data);
          countryInfo.innerHTML = markupCountry;
        }
      })
      .catch(err =>
        Notiflix.Notify.failure(`Oops, there is no country with that name.`)
      );
  }
  countryList.innerHTML = '';
  countryInfo.innerHTML = '';
  return;
}
