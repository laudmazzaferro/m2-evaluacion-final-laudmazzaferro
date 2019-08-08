'use strict';
const seriesList = document.querySelector('.series-list');
const searchBtn = document.querySelector('.search-btn');
const inputText = document.querySelector('.field__fill-series');
const api = 'http://api.tvmaze.com/search/shows?q=';


function seriesSearch(){
  const inputSerie =inputText.value;

  fetch(api + inputSerie)
    .then(response => response.json())
    .then(data => {
      //let itemlist='';
      for (const item of data){
        console.log(item.show.name);
        console.log(item.show.url);
        seriesList.innerHTML += `
        <li>
        <img src="${item.show.image.medium}">
        <h3>${item.show.name}</h3>
        </li>`;
      }
      //seriesList.innerHTML=itemList;
    });

}


searchBtn.addEventListener('click',seriesSearch);
