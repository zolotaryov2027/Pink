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