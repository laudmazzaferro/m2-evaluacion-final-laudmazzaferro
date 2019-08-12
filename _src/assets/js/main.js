'use strict';
const seriesList = document.querySelector('.series-list');
const searchBtn = document.querySelector('.search-btn');
let inputText = document.querySelector('.field__fill-series');
const api = 'http://api.tvmaze.com/search/shows?q=';
let favItem = document.querySelector('.fav-list-container');
let favs=[];
const btnReset = document.querySelector('.reset-btn');
const arrLang=['English', 'Spanish', 'Portuguese'];
const log = document.querySelector('.log');

function reloadfav(){
  if (JSON.parse(localStorage.getItem('favorits'))){
    const favoritesP =JSON.parse(localStorage.getItem('favorits'));
    for (const item of favoritesP){
      favItem.innerHTML +=`<li class="fav-list">
      <img class="img-fav" alt="Serie ${item.name}" src="${item.img}">
      <h3>⭐️ ${item.name} ⭐️</h3>
      <p class="id-list" >${item.id}</p>
      </li>`;
    }
  }
}
reloadfav();
if (JSON.parse(localStorage.getItem('favorits'))){
  favs=JSON.parse(localStorage.getItem('favorits'));
}

function favSeries(event){

  const item = event.currentTarget;
  const idList =event.currentTarget.querySelector('.id-list').innerHTML;
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
      if (favs[i].id === idList) {
        index = i;
        break;
      }
    }
    if (index > -1) {
      favs.splice(index, 1);
    }
  }
  localStorage.setItem('favorits', JSON.stringify(favs));

  favItem.innerHTML='';
  for (const item of favs){
    favItem.innerHTML +=`<li class="fav-list">
    <img class="img-fav" alt="Serie ${item.name}" src="${item.img}">
    <h3>⭐️ ${item.name} ⭐️</h3>
    <p class="id-list" >${item.id}</p>
    </li>`;
  }

  if (favs.length === 0){
    localStorage.removeItem('favorits');
  }

}

function seriesSearch(){
  const inputSerie =inputText.value;

  fetch(api + inputSerie)
    .then(response => response.json())
    .then(data => {
      seriesList.innerHTML='';
      const arrbasic =[];
      if (data.length === 0){
        seriesList.innerHTML ='No se ha podido conseguir resultado de tu busqueda';
      }
      for (const item of data){
        let rec ='';
        arrbasic.push(`${parseInt(item.show.id)}`);
        for (const lang of arrLang){
          if (lang === item.show.language){
            rec ='recomendada' ;
          }
        }

        if (item.show.image === null){
          seriesList.innerHTML += `
          <li class="list-item" id:"${parseInt(item.show.id)}">
          <img class="img-list" alt="Serie ${item.show.name}" src="https://via.placeholder.com/210x295/ffffff/666666/?text=TV">
          <h3 class="name-serie">${item.show.name}</h3>
          <p class="id-list">${item.show.id}</p>
          <p class="lang">${item.show.language}</p>
          <p class="lang-rec">${rec}</p>
          </li>`;
        }else {
          seriesList.innerHTML += `
          <li class="list-item" id:"${parseInt(item.show.id)}">
          <img class="img-list" alt="Serie ${item.show.name}" src="${item.show.image.medium}">
          <h3 class="name-serie">${item.show.name}</h3>
          <p class="id-list">${item.show.id}</p>
          <p class="lang">${item.show.language}</p>
          <p class="lang-rec">${rec}</p>
          </li>`;
        }
      }

      const itemList =document.querySelectorAll('.list-item');

      if (JSON.parse(localStorage.getItem('favorits'))){
        const favsUnos=JSON.parse(localStorage.getItem('favorits'));
        for (let i=0; i<arrbasic.length ;i++){
          for (const iten of favsUnos){
            if(arrbasic[i]=== iten.id){
              itemList[i].classList.add('serie-fav');
            }
          }
        }

      }


      for (let i=0;i<itemList.length;i++) {
        itemList[i].addEventListener('click', favSeries);
      }

    });
}



function enterYes(event){
  if (event.keyCode === 13){
    seriesSearch();
  }
}

function reset(){
  inputText.value='';
  seriesList.innerHTML='';
  localStorage.removeItem('favorits');
  favs=[];
  favItem.innerHTML='';
}

btnReset.addEventListener('click',reset);
searchBtn.addEventListener('click',seriesSearch);
inputText.addEventListener('keyup',enterYes);

function favConsole(){
  console.log(`tiene ${favs.length} favoritos`);
}

log.addEventListener('click',favConsole);

