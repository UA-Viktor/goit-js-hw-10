import './css/styles.css';
import debounce from 'lodash.debounce';
import { fetchCountries } from './js/fetchCountries';
import Notiflix from 'notiflix';

Notiflix.Notify.init({ width: '500px' });

const DEBOUNCE_DELAY = 300;

const refs = {
    searchBox: document.querySelector('input#search-box'),
    countryList: document.querySelector('.country-list'),
    countryInfo: document.querySelector('.country-info'),
};

refs.searchBox.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(e) {
    e.preventDefault();
    
    const country = e.target.value.trim();

    if (!country) {
        markupClear(refs.countryList);
        markupClear(refs.countryInfo);
        return;
    }

    fetchCountries(country)
        .then(country => { 
        if (country.length > 10) {
            Notiflix.Notify.info('Too many matches found. Please enter a more specific name');
            return;
        }
        markupData(country);
        })
        .catch(err => {
            markupClear(refs.countryList);
            markupClear(refs.countryInfo);
            Notiflix.Notify.failure('Oops, there is no country with that name');
        });
};


function markupClear(body) {
    body.innerHTML = '';
};

function markupData(countries) {
    if (countries.length === 1) {
        markupClear(refs.countryList);
        refs.countryInfo.innerHTML = markupInfo(countries);
    } else {
        markupClear(refs.countryInfo);
        refs.countryList.innerHTML = markupList(countries);
    }
};

function markupList(countries) {
    return countries.map(({ name, flags }) =>
        `<li><img src="${flags.png}" alt="${name.official}" width="30" height="20">${name.official}</li>`
    ).join('');
};

function markupInfo(country) {
    return country.map(({ name, capital, population, flags, languages }) => 
        `<h1><img src="${flags.png}" alt="${name.official}" width="30" height="20">${name.official}</h1>
         <p><b>Capital:</b> ${capital}</p>
         <p><b>Population:</b> ${population}</p>
         <p><b>Languages:</b> ${Object.values(languages)}</p>`
    ).join('');
};
