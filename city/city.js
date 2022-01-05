import {
    checkAuth,
    logout,
    updateWaterfront,
    createDefaultCity,
    fetchCity,
    updateSlogans,
    updateName
} from '../fetch-utils.js';

const waterfrontEl = document.querySelector('.waterfront-img-container');
const skylineEl = document.querySelector('.skyline-img-container');
const castleEl = document.querySelector('.castle-img-container');
const waterfrontDropdownEl = document.querySelector('.waterfront-dropdown');
const castleDropdownEl = document.querySelector('.castle-dropdown');
const skylineDropdownEl = document.querySelector('.skyline-dropdown');
const sloganFormEl = document.querySelector('.slogan-form');
const cityNameEl = document.querySelector('.city-name');
const cityFormEl = document.querySelector('.city-name-form');
const sloganContainerEl = document.querySelector('.slogans-container');
const logoutButton = document.getElementById('logout');

let cityID;
let slogansArr = [];

checkAuth();


logoutButton.addEventListener('click', () => {
    logout();
});

window.addEventListener('load', async() => {

    let city = await fetchCity();

    if (!city) {
        const newCity = {
            waterfront: 1,
            castle: 1,
            skyline: 1,
            city: 'Florence',
            slogans: []
        };
        createDefaultCity(newCity);
        displayCity(newCity);
    } else {
        slogansArr = city.slogans;
        displayCity(city);
    }

});

cityFormEl.addEventListener('submit', async(e) => {
    e.preventDefault();

    const data = new FormData(cityFormEl);
    const newName = data.get('city-name');
    await updateName(newName);

    let updatedCity = await fetchCity();
    cityFormEl.reset();
    displayCity(updatedCity);

});

waterfrontDropdownEl.addEventListener('change', async(e) => {

    const updatedCity = await updateWaterfront('waterfront', e.target.value);

    displayCity(updatedCity);
});
skylineDropdownEl.addEventListener('change', async(e) => {

    const updatedCity = await updateWaterfront('skyline', e.target.value);

    displayCity(updatedCity);
});
castleDropdownEl.addEventListener('change', async(e) => {

    const updatedCity = await updateWaterfront('castle', e.target.value);

    displayCity(updatedCity);
});

sloganFormEl.addEventListener('submit', async(e) => {
    e.preventDefault();

    const data = new FormData(sloganFormEl);
    let slogan = data.get('slogan');
    slogansArr.push(slogan);
    sloganFormEl.reset();

    await updateSlogans(slogansArr);

    let updatedCity = await fetchCity();

    displayCity(updatedCity);
});

function displayCity(city) {
    waterfrontEl.style.backgroundImage = `url('../assets/waterfront-${city.waterfront}.jpg')`;
    skylineEl.style.backgroundImage = `url('../assets/skyline-${city.castle}.jpg')`;
    castleEl.style.backgroundImage = `url('../assets/castle-${city.skyline}.jpg')`;

    sloganContainerEl.textContent = '';

    cityNameEl.textContent = city.city;

    for (let slogan of city.slogans) {
        const p = document.createElement('p');
        p.textContent = slogan;
        sloganContainerEl.append(p);
    }
}
