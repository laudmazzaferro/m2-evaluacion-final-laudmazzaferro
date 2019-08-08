'use strict';
const seriesList = document.querySelector('.series-list');
const searchBtn = document.querySelector('.search-btn');
const inputText = document.querySelector('.field__fill-series');
const api = 'http://api.tvmaze.com/search/shows?q=';

function favSeries(event){
console.log(event.currentTarget);
}
function seriesSearch(){
  const inputSerie =inputText.value;

  fetch(api + inputSerie)
    .then(response => response.json())
    .then(data => {
      seriesList.innerHTML='';
      for (const item of data){
        if (item.show.image === null){
          seriesList.innerHTML += `
        <li class="list-item">
        <img class="img-list" src="https://via.placeholder.com/210x295/ffffff/666666/?text=TV">
        <h3 class="name-serie">${item.show.name}</h3>
        </li>`;

        }else {
          seriesList.innerHTML += `
        <li class="list-item">
        <img class="img-list" src="${item.show.image.medium}">
        <h3 class="name-serie">${item.show.name}</h3>
        </li>`;
        }
      }
      const itemList =document.querySelectorAll('.list-item');

      for (let i=0;i<itemList.length;i++) {
        const nameList = document.querySelector('.name-serie');
        const imgList = document.querySelector('.img-list');
        itemList.addEventListener('click', favSeries);
      }
    });

}


searchBtn.addEventListener('click',seriesSearch);
