import { allworld, filter } from './api.js'

export function app() {
    console.log('Cargada app')
    let allCountries = []
    let thecountry = {}

    // Nodos del DOM
    let continent = document.querySelector('#continent')
    let country = document.querySelector('#country')
    let showData = document.querySelector('#showData')

    // Asociación de manejadores de eventos
    continent.addEventListener('change', showContinent)
    country.addEventListener('change', showCountry)

    // Funciones manejadoras de eventos
    //Según continente seleccionado guardar la lista de países en allCountries
    function showContinent(ev) {
        if (ev.target.value) {
            let url = allworld + ev.target.value + filter
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    allCountries = data
                    console.log(allCountries)
                })
            showCountry()
        }

        //De la lista de países (allCountries) guardar el país seleccionado)
        function showCountry(ev) {
            thecountry = allCountries.find(item => item.name == ev.target.value)
            console.log(thecountry)
            allCountries.forEach(country => { 
                console.log(country.innerHTML += `${thecountry.name}`)
            });
            /* country.innerHTML += `${thecountry.name}` */
            renderData()
        }

        //Mostrar el país seleccionado y la información correspondiente
        function renderData() {
            showData.innerHTML =
                ` 
                <p>${thecountry.name}</p>
                <img src="${thecountry.flag}" alt="${thecountry.name}">      
                <ul>
                    <li><span>Capital: </span> ${thecountry.capital}</li>
                    <li><span>Población: </span> ${thecountry.population}</li>
                </ul>
                `
        }
    }
