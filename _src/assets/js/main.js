'use strict';
const seriesList = document.querySelector('.series-list');
const searchBtn = document.querySelector('.search-btn');
const inputText = document.querySelector('.field__fill-series');
const api = 'http://api.tvmaze.com/search/shows?q=';
let favItem = document.querySelector('.fav-list');
let favs=[];

function favSeries(event){

  const item = event.currentTarget;
  const idList =event.currentTarget.id;
  const nameList = event.currentTarget.querySelector('.name-serie').innerHTML;
  const imgList = event.currentTarget.querySelector('.img-list').src;
  item.classList.toggle('serie-fav');
  const object ={id:idList,name:nameList,img:imgList};

  if (item.classList.contains('serie-fav')) {
    if (favs.includes(object) === false) {
      favs.push(object);
    }
  } else {
    let index = -1;
    for(let i = 0; i < favs.length; i++) {
      if (favs[i].name === nameList) {
        index = i;
        break;
      }
    }
    if (index > -1) {
      favs.splice(index, 1);
    }
  }
  favItem.innerHTML='';
  for (const item of favs){
    favItem.innerHTML +=`<li>
    <img class="img-fav" src="${item.img}">
    <h3>${item.name}</h3>
    </li>`;
  }
  console.log(favs);
}

function seriesSearch(){
  const inputSerie =inputText.value;

  fetch(api + inputSerie)
    .then(response => response.json())
    .then(data => {
      seriesList.innerHTML='';
      for (const item of data){
        if (item.show.image === null){
          console.log(item.show.id);
          seriesList.innerHTML += `
        <li class="list-item" id:"${item.show.id}">
        <img class="img-list" src="https://via.placeholder.com/210x295/ffffff/666666/?text=TV">
        <h3 class="name-serie">${item.show.name}</h3>
        </li>`;

        }else {
          seriesList.innerHTML += `
        <li class="list-item" id:"${item.show.id}">
        <img class="img-list" src="${item.show.image.medium}">
        <h3 class="name-serie">${item.show.name}</h3>
        </li>`;
        }
      }
      const itemList =document.querySelectorAll('.list-item');

      for (let i=0;i<itemList.length;i++) {
        itemList[i].addEventListener('click', favSeries);
      }
    });

}


searchBtn.addEventListener('click',seriesSearch);
