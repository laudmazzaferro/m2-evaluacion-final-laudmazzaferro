'use strict';
const seriesList = document.querySelector('.series-list');
const searchBtn = document.querySelector('.search-btn');
const inputText = document.querySelector('.field__fill-series');



function seriesSearch(){
  const inputSerie =inputText.value;
  console.log(inputSerie);
}


searchBtn.addEventListener('click',seriesSearch);
