'use strict';

const btnCountry = document.querySelector('.search-bar__btn');
const country = document.querySelector('.search-bar__input');
const countriesContainer = document.querySelector('.countries');

const getCountry = function(country){
        const request = new XMLHttpRequest()
        request.open('GET',`https://countries-api.davegarvey.workers.dev/search?q=${country}`)
        request.send()
        request.addEventListener('load',function(){
        const [data] = JSON.parse(this.responseText).results
        if (!data || data.length === 0) {
        countriesContainer.insertAdjacentHTML('afterbegin', `
            <p class="error-msg">❌ Country not found. Please check the spelling and try again.</p>
        `)
        countriesContainer.style.opacity = 1
        const errorMsg = document.querySelector('.error-msg')
        setTimeout(() => errorMsg.remove(), 2000)
        return
    }
        const flag = data.code.toLowerCase()
        console.log(data.currency);
        const languages = data.languages.join(', ')
        console.log(data);
        const html = `
        <article class="country">
            <img class="country__img" src="https://flagcdn.com/w320/${flag}.png" />
            <div class="country__data">
                <h3 class="country__name">${data.name}</h3>
            <h4 class="country__region">${data.region}</h4>
             <p class="country__row"><span>🏠</span>${data.capital}</p>
            <p class="country__row"><span>👫</span>${data.population > 10**9 ? (data.population/1000000000).toFixed(2)+'B':(data.population/1000000).toFixed(2)+'M'
            } people</p>
            <p class="country__row"><span>🗣️</span>${languages}</p>
            <p class="country__row"><span>💰</span>${data.currency}</p>
          </div>
        </article>
    `
    countriesContainer.insertAdjacentHTML('afterbegin',html)
    countriesContainer.style.opacity = 1
})
}

btnCountry.addEventListener('click',function(e){
    e.preventDefault()
    getCountry(country.value)
})

country.addEventListener('keydown', function(e) {
  if (e.key === 'Enter') {
    getCountry(country.value)   
  }
})
 
