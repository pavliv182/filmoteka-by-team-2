import {
  checkLSQueue,
  checkLSWached,
  getPageItems,
} from './js/generateObjectsFormLS';
import PaginationSystem from './js/paginationSyste';
import { createMarcupGallery } from './js/createMarcupGallery';
import infoFilm from './js/film-info-modal';

infoFilm();

let pageStatus = 'wached';
const paginationSystem = new PaginationSystem();
const refs = {
  wachedBtn: document.querySelector('.btn-watched'),
  queueBtn: document.querySelector('.btn-queue'),
  cardList: document.querySelector('[data-gallery]'),
};

refs.wachedBtn.addEventListener('click', wachedOnClick);
refs.queueBtn.addEventListener('click', queueOnClick);

renderPage();

paginationSystem.mainList.addEventListener(
  'pagination-system-clicked',
  event => {
    renderPage(paginationSystem.page, false);
  }
);

function renderPage(page = 1, paginationRework = true) {
  let perPage;
  showHideNoItemDivs();
  if (window.innerWidth >= 1280) {
    perPage = 9;
  } else if (window.innerWidth >= 768) {
    perPage = 8;
  } else if (window.innerWidth >= 0) {
    perPage = 4;
  }
  let wochedObj;
  if (pageStatus === 'wached') {
    wochedObj = checkLSWached();
  } else if (pageStatus === 'queue') {
    wochedObj = checkLSQueue();
  }
  if (!wochedObj.data || wochedObj.data.length === 0) {
    refs.cardList.innerHTML = '';
    showHideNoItemDivs(pageStatus);
    return;
  }
  refs.cardList.innerHTML = '';
  refs.cardList.append(
    ...createMarcupGallery(
      getPageItems(paginationSystem.page, perPage, wochedObj.data),
      true
    )
  );
  if (paginationRework) {
    if (window.innerWidth >= 1280) {
      console.log(wochedObj.totalPagesForDesctop);
      paginationSystem.setTotalPages(wochedObj.totalPagesForDesctop);
    } else if (window.innerWidth >= 768) {
      paginationSystem.setTotalPages(wochedObj.totalPagesForTablet);
    } else if (window.innerWidth >= 0) {
      paginationSystem.setTotalPages(wochedObj.totalPagesForMobile);
    }
    paginationSystem.setPage(page);
  }
}

function wachedOnClick() {
  if (pageStatus === 'wached') {
    return;
  }
  pageStatus = 'wached';
  refs.wachedBtn.classList.toggle('button-checced');
  refs.queueBtn.classList.toggle('button-checced');
  renderPage();
}

function queueOnClick() {
  if (pageStatus === 'queue') {
    return;
  }
  pageStatus = 'queue';
  refs.wachedBtn.classList.toggle('button-checced');
  refs.queueBtn.classList.toggle('button-checced');
  renderPage();
}

window.addEventListener('modalButtonClick', event => {
  renderPage();
});

function showHideNoItemDivs(param) {
  if (param === 'wached') {
    document
      .querySelector('.no-item-in-wached')
      .classList.remove('visually-hidden');
  } else if (param === 'queue') {
    document
      .querySelector('.no-item-in-queue')
      .classList.remove('visually-hidden');
  } else {
    document
      .querySelector('.no-item-in-wached')
      .classList.add('visually-hidden');
    document
      .querySelector('.no-item-in-queue')
      .classList.add('visually-hidden');
  }
}
