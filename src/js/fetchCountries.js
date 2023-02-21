const BASE_URL = 'https://restcountries.com/v3.1/name/';
const FILTER = '?fields=name,capital,population,flags,languages';

export function fetchCountries (country) {
    return fetch(`${BASE_URL}${country}${FILTER}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.status);
            }
            return response.json();
        });   
};