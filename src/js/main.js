// import Swiper, { Navigation, Pagination } from 'swiper';


// // init Swiper:
// const swiper = new Swiper('.swiper', {
//   // configure Swiper to use modules
//   modules: [Navigation, Pagination],
  
// });

import Swiper, { Navigation, Pagination } from 'swiper';

const swiper1 = new Swiper('.swiper', {
  modules: [Navigation, Pagination],
  loop: true,

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
})


const swiper2 = new Swiper('.price__slider', {
  modules: [Navigation, Pagination],
  loop: true,
  slidesPerView: "auto",
  grid: {
    rows: 2,
  },
  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
})



const burger = document.querySelector('.burger');
const navigation = document.querySelector('.navigation__list');





burger.addEventListener('click', function(){
  this.classList.toggle('burger--active');
  navigation.classList.toggle('navigation__list--active');
})


const paginationPriceItems = document.querySelectorAll('.price-paginations__radio');
const priceTabel = document.querySelector('.price-tabel');


for(let elem of paginationPriceItems){
  elem.addEventListener('click', function(){
    for(let elem of paginationPriceItems){
      elem.classList.remove('price-paginations__radio--active');
      this.classList.add('price-paginations__radio--active');
    }
    if(this === paginationPriceItems[0]){
      priceTabel.style.left = 0 + 'px';
    }
    else if(this === paginationPriceItems[1]){
      priceTabel.style.left = -276 + 'px';
    }
    else if(this === paginationPriceItems[2]){
      priceTabel.style.left = -550 + 'px';
    }
  })
}



if(paginationPriceItems[0].classList.contains('price-paginations__radio--active')){
  priceTabel.style.left = 0 + 'px';
}


// if(paginationPriceItems[1].classList.contains('price-paginations__radio--active')){
//   priceTabel.style.left = -276 + 'px';
// }


// if(paginationPriceItems[2].classList.contains('price-paginations__radio--active')){
//   priceTabel.style.right = 0 + 'px';
// }