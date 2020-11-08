// https://restcountries.eu/rest/v2/name/belgie?fullText=true

// maak een button met een id die we kunnen gebruiken in javascript
// zet een event listener op de button of er een klik is, daarna moet die een functie aanroepen
// We hebben een ASYNC functie nodig die de data ophaalt over belgie met api url - axios async function

const buttonSearch = document.getElementById('search-country');
buttonSearch.addEventListener('click', fetchCountryData);

const searchBar = document.getElementById('input-country');
searchBar.addEventListener('keyup', setQuery);

searchBar.addEventListener('keyup',function (e) {
    if (e.key === "Enter") {
        e.preventDefault();
        document.getElementById("search-country").click();
    }
});

const countryContainer = document.getElementById('country-info-window');

let query = '';

function setQuery(e) {
    query = e.target.value;
    if (e.key === "Enter") {
    }
}



async function fetchCountryData() {

    // zorg ervoor dat als er een request gemaakt wordt, het zoekveldt leeggemaakt wordt
    searchBar.value = '';

    // sla de referentie naar onze error-message op en haal de tekst weg bij elke nieuwe zoekopdracht
    // (als er iets mis gaat, wordt 'ie in het catch blok opnieuw toegevoegd)
    // const errorMessage = document.getElementById('error-message');
    // errorMessage.textContent = '';

    // sla de referentie op naar de country-container waarin de informatie van een land staat
    const previousSearchResult = document.getElementById('country');
    // als deze referentie bestaat (en er dus al een land op de pagina wordt weergegeven) dan halen we deze eerst weg
    if (previousSearchResult) {
        countryContainer.removeChild(previousSearchResult);
    }

    const errorMessage = document.getElementById('error-message');
    errorMessage.textContent = '';


    try {
        const result = await axios.get (
            `https://restcountries.eu/rest/v2/name/${query}?fullText=true`
    );
        console.log(result.data[0]);
        console.log(result.data[0].name + ' is situated in ' + result.data[0].subregion + '. It has a population of ' + result.data[0].population + ' people.');
        // console.log(`The capital is ${result.data[0].capital}`);

        // Maak een functie die ongeacht het aantal currencies die in een land gebruikt worden, een string maakt:

        const currenciesString = result.data[0].currencies.reduce((acc, currentCurrency, index) => {
            // console.log(currentCurrency.name);
            if (result.data[0].currencies.length === 1 || index === 0) {
                return `${acc} ${currentCurrency.name}'s`
            }
            if (index !== result.data[0].currencies.length -1 && index !== 0) {
                return `${acc}, ${currentCurrency.name}.`
            }
            if (index === result.data[0].currencies.length -1) {
                return `${acc} and ${currentCurrency.name}.`
            }

        }, 'and you can pay with');

        console.log(`The capital is ${result.data[0].capital} ${currenciesString}`);

        // Maak een functie die ongeacht het aantal talen die in een land gesproken worden, een string maakt:

        const languageString = result.data[0].languages.reduce((acc, currentlanguage, index) => {
            // console.log(currentCurrency.name);
            if (result.data[0].languages.length === 1 || index === 0) {
                return `${acc} ${currentlanguage.name}`
            }
            if (index !== result.data[0].languages.length -1 && index !== 0) {
                return `${acc}, ${currentlanguage.name}`
            }
            if (index === result.data[0].languages.length -1) {
                return `${acc} and ${currentlanguage.name}.`
            }

        }, 'They speak');

        console.log(languageString);

        // maak een country-container en geef hem de id country
        // (zodat we 'm de volgende keer kunnen herkennen en kunnen checken of er al een land op de pagina staat)
        const country = document.createElement('div');
        country.setAttribute('id', 'country');

        const countryInfoField = document.getElementById("country-info-window");

        const countryFlag = document.createElement("img");
        countryFlag.setAttribute('class', 'flag-style')
        countryFlag.setAttribute('src', result.data[0].flag);
        country.appendChild(countryFlag);

        const countryName = document.createElement("h1");
        countryName.setAttribute('class', 'country-name-style')
        countryName.textContent = result.data[0].name;
        country.appendChild(countryName);

        const countryDataCapital = document.createElement("p");
        countryDataCapital.textContent = ` ${result.data[0].name} is situated in ${result.data[0].subregion}. It has a population of ${result.data[0].population} people.`;
        country.appendChild(countryDataCapital);

        const countryDataCurrency = document.createElement("p");
        countryDataCurrency.textContent = `The capital is ${result.data[0].capital} ${currenciesString}`;
        country.appendChild(countryDataCurrency);

        const countryDataLanguage = document.createElement("p");
        countryDataLanguage.textContent = languageString;
        country.appendChild(countryDataLanguage);

        countryContainer.appendChild(country);

    } catch(e) {
        console.error(e);
        errorMessage.textContent = `${query} bestaat niet. Probeer het opnieuw!`;
    }
}

// Get the modal
const modal = document.getElementById("country-popup");

// function openPopup(e) {
//     if (e.key === "Enter") {
//         modal.style.display = "none";
//     }
// }

// Get the button that opens the modal
// const btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
const span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
buttonSearch.onclick = function() {
    modal.style.display = "block";
}

searchBar.key === "Enter"

// searchBar.onclick = function() {
//     modal.style.display = "block";
// }

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }





}


