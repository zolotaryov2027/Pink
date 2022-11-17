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
const priceTableHeader = document.querySelectorAll('.price-table__header');

function checkPaginationActive(paginationItem){
  for(let i = 0; i < paginationItem.length; i++){
    if(paginationItem[0].classList.contains('price-paginations__radio--active')){
      priceTabel.style.left = 0 + 'px';
    }else if(paginationItem[1].classList.contains('price-paginations__radio--active')){
      priceTabel.style.left = -priceTableHeader[1].offsetWidth + 'px';
    }else if(paginationItem[2].classList.contains('price-paginations__radio--active')){
      priceTabel.style.left = -(priceTableHeader[1].offsetWidth * 2) + 'px';
    }
  }
}

for(let elem of paginationPriceItems){
  elem.addEventListener('click', function(){
    for(let elem of paginationPriceItems){
      elem.classList.remove('price-paginations__radio--active');
      this.classList.add('price-paginations__radio--active');
    }
    checkPaginationActive(paginationPriceItems);
  })
}


const checkPaginationActiveNext = (paginationItems) => {
  for(let i = 0; i < paginationItems.length; i++){
    if(paginationItems[0].classList.contains('price-paginations__radio--active')){
      paginationItems[i].classList.remove('price-paginations__radio--active');
      paginationItems[i].nextElementSibling.classList.add('price-paginations__radio--active');
      checkPaginationActive(paginationPriceItems);
      return;
    }else if (paginationItems[1].classList.contains('price-paginations__radio--active')){
      paginationItems[i].classList.remove('price-paginations__radio--active');
      paginationItems[i].nextElementSibling.classList.add('price-paginations__radio--active');
      checkPaginationActive(paginationPriceItems);
    }
  }
}

const checkPaginationActivePrev = (paginationItems) => {
  for(let i = 0; i < paginationItems.length; i++){
   if(paginationItems[paginationItems.length - 1].classList.contains('price-paginations__radio--active')){
    paginationItems[paginationItems.length - 1].classList.remove('price-paginations__radio--active');
    paginationItems[paginationItems.length - 1].previousElementSibling.classList.add('price-paginations__radio--active');
    checkPaginationActive(paginationPriceItems);
    return;
   }else if (paginationItems[1].classList.contains('price-paginations__radio--active')){
    paginationItems[1].classList.remove('price-paginations__radio--active');
    paginationItems[1].previousElementSibling.classList.add('price-paginations__radio--active');
    checkPaginationActive(paginationPriceItems);
  }
  }
}




let x1 = null;
let y1 = null;


const handleTouchStart = (event) => {
  const firstTouch = event.touches[0];

  x1 = firstTouch.clientX;
  y1 = firstTouch.clientY;
}


const handleTouchMove = (event) => {
  if(!x1 || !y1){
    return false;
  }
  let x2 = event.touches[0].clientX;
  let y2 = event.touches[0].clientY;
  let xDiff = x2 - x1;
  let yDiff = y2 - y1;

  if(Math.abs(xDiff) > Math.abs(yDiff)) {
    if(xDiff > 0) {
      checkPaginationActivePrev(paginationPriceItems)
    }
    else{
      checkPaginationActiveNext(paginationPriceItems);
    };
  }
  else {
    if(yDiff > 0) console.log('down');
    else console.log('top');
  }
  x1 = null;
  y1 = null;
}

priceTabel.addEventListener('touchstart', handleTouchStart, false);
priceTabel.addEventListener('touchmove', handleTouchMove, false);


