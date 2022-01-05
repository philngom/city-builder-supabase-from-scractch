import {
    checkAuth,
    logout,
    updateWaterfront,
    createDefaultCity,
    fetchCity
} from '../fetch-utils.js';

const waterfrontEl = document.querySelector('.waterfront-img-container');
const skylineEl = document.querySelector('.skyline-img-container');
const castleEl = document.querySelector('.castle-img-container');
const slogansEl = document.querySelector('.slogans');
const waterfrontDropdownEl = document.querySelector('.waterline-dropdown');
const castleDropdownEl = document.querySelector('.castle-dropdown');
const skylineDropdownEl = document.querySelector('.skyline-dropdown');

checkAuth();

const logoutButton = document.getElementById('logout');
let cityID;

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
        displayCity(city);
    }

});

waterfrontDropdownEl.addEventListener('change', async(e) => {
    await updateWaterfront('waterfront', e.target.value);
});

function displayCity(city) {
    waterfrontEl.style.backgroundImage = `url('../assets/waterfront-${city.waterfront}.jpg')`;
    skylineEl.style.backgroundImage = `url('../assets/skyline-${city.castle}.jpg')`;
    castleEl.style.backgroundImage = `url('../assets/castle-${city.skyline}.jpg')`;

    for (let slogan of city.slogans) {
        const p = document.createElement('p');
        p.textContent = slogan;
        slogansEl.append(p);
    }
}
