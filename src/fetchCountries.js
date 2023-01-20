export default class FetchApiService {
  constructor() {
    this.searchCountry = '';
  }

  fetchCountries() {
    const url = `https://restcountries.com/v3.1/name/${this.searchCountry}?fields=name,capital,languages,population,flags`;
    return fetch(url).then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    });
  }
}
