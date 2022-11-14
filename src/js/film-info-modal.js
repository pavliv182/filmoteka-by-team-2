import {
  setFilmToWeched,
  setFilmToQueue,
  removeFilmToWeched,
  removeFilmToQueue,
} from './filmssetToLS';
import findJanres from './findJanreWithId';
import { CaptchaPosterPath } from './createMarcupGallery';

const modalButtonClick = new Event('modalButtonClick');

export default function infoFilm() {
  const refs = {
    galleryEl: document.querySelector('[data-gallery]'),
    openModal: document.querySelector('.gallery-button'),
    closeModal: document.querySelector('[data-modal-close]'),
    modal: document.querySelector('[data-modal]'),
  };
  refs.galleryEl.addEventListener('click', onOpenModalBtnClick);
  refs.closeModal.addEventListener('click', oncloseModalBtnClick);
  window.addEventListener('click', onWindowClick);
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
      refs.modal.style.display = 'none';
    }
  });

  function onOpenModalBtnClick(e) {
    const target = e.target.closest('[data-click]');
    if (!target) {
      return;
    }
    refs.modal.style.display = 'block';
    const film = findFilmById(Number.parseInt(target.dataset.id));
    createModalMucrup(film);
  }
  function oncloseModalBtnClick() {
    refs.modal.style.display = 'none';
  }
  function onWindowClick(event) {
    if (event.target === refs.modal) {
      refs.modal.style.display = 'none';
    }
  }

  function createMarkupFilmCard(id) {
    let localStorageData = [
      ...JSON.parse(localStorage.getItem('reneredCards')),
    ];
    localStorageData.find(element => element.id === id);

    console.log(localStorageData);
  }
}

function createModalMucrup({
  base_url_post = 'https://image.tmdb.org/t/p/w500/',
  genre_ids = [],
  poster_path,
  vote_count = 80,
  vote_average = 1.5,
  original_title,
  name,
  overview,
  random_text = 'lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus rem repudiandae quasi fugit ipsam tenetur enim, beatae, sequi distinctio cupiditate rerum. Tempora error accusamus eligendi assumenda nostrum asperiores ullam accusantium.',
  popularity,
  id,
}) {
  const filmContainer = document.querySelector('.film-container');
  const b1 = document.querySelector('#addWatchedButton');
  const b2 = document.querySelector('#addWatchedButton');
  const b3 = document.querySelector('#removeWatchedButton');
  const b4 = document.querySelector('#removeQueueedButton');

  if (b1) {
    b1.remove('click', onAddWatchedButton);
  }
  if (b2) {
    b2.remove('click', onAddQueueButton);
  }
  if (b3) {
    b1.remove('click', onDeleteWatchedButton);
  }
  if (b4) {
    b2.remove('click', onDeleteQueuedButton);
  }

  const referense = `
  <div class="image-film-container">
      <img class = "film-image" src=${CaptchaPosterPath(
        base_url_post,
        poster_path
      )} alt="POSTER">
  </div>
  <div class="film-about-container">
      <h2 class="film-title">${original_title || name}</h2>

      <table class="film-about-table">
        <tr class="film-about-textrow">
          <td>vote / votes</td>

          <td class="textrow-id"><span class="inbox-id">${vote_average.toFixed(
            1
          )}</span><span class= "inbox-slash"> /</span><span class = "inbox-span">${vote_count}</span></td>

        </tr>
        <tr class="film-about-textrow">
          <td>popularity</td>
          <td class="textrow-id">${popularity.toFixed(1)}</td>
        </tr>
        <tr class="film-about-textrow">
          <td>original title</td>
          <td class="textrow-id" id="">${original_title || name}</td></span>
        </tr>
        <tr class="film-about-textrow">
          <td>genre</td>
          <td class="textrow-genres">${genre_ids
            .map(item => findJanres(item))
            .join(' ')}</td>
        </tr>
      </table>
      <h3 class="title-about">About</h3>
      <div class="film-about-text-container"><p id="" class="film-about-text">${
        overview || random_text
      }</p> </div>
      <ul class="film-btn-list">

          <li class="film-btn-item addWatchedButton">
              <button id="addWatchedButton" data-id = ${id} class="film-add-button">Add to
              watched</button>
          </li>
          <li class="film-btn-item removeWatchedButton">
          <button id="removeWatchedButton" data-id = ${id} class="film-add-button">Remove from
          watched</button>
          </li>
          <li class="film-btn-item addQueueButton">
              <button id="addQueueButton" data-id = ${id} class="film-add-button">Add to

              queue</button>
          </li>
          <li class="film-btn-item removeQueueButton">
          <button id="removeQueueButton" data-id = ${id} class="film-add-button">Remove from

          queue</button>
      </li>
      </ul>`;

  filmContainer.innerHTML = referense;
  document
    .querySelector('#addWatchedButton')
    .addEventListener('click', onAddWatchedButton);
  document
    .querySelector('#addQueueButton')
    .addEventListener('click', onAddQueueButton);
  document
    .querySelector('#removeWatchedButton')
    .addEventListener('click', onDeleteWatchedButton);
  document
    .querySelector('#removeQueueButton')
    .addEventListener('click', onDeleteQueuedButton);

  updateButtons(id);
}

function findFilmById(id) {
  const reneredCards = JSON.parse(localStorage.getItem('reneredCards'));
  return reneredCards.find(item => item.id === id);
}

function onAddQueueButton(event) {
  const id = Number.parseInt(event.target.dataset.id);
  setFilmToQueue(id);
  updateButtons(id);
  window.dispatchEvent(modalButtonClick);
}

function onAddWatchedButton(event) {
  const id = Number.parseInt(event.target.dataset.id);
  setFilmToWeched(id);
  updateButtons(id);
  window.dispatchEvent(modalButtonClick);
}

function onDeleteWatchedButton(event) {
  const id = Number.parseInt(event.target.dataset.id);
  removeFilmToWeched(id);
  updateButtons(id);
  window.dispatchEvent(modalButtonClick);
}

function onDeleteQueuedButton(event) {
  const id = Number.parseInt(event.target.dataset.id);
  removeFilmToQueue(id);
  updateButtons(id);
  window.dispatchEvent(modalButtonClick);
}

function updateButtons(id) {
  console.log(id);
  const b1 = document.querySelector('.addWatchedButton');
  const b2 = document.querySelector('.removeWatchedButton');
  const b3 = document.querySelector('.addQueueButton');
  const b4 = document.querySelector('.removeQueueButton');

  const wached = JSON.parse(localStorage.getItem('wachedFilms'));
  const queue = JSON.parse(localStorage.getItem('queueFilms'));

  if (wached && wached.length !== 0 && wached.some(item => item.id === id)) {
    b1.style.display = 'none';
    b2.style.display = 'block';
  } else {
    b2.style.display = 'none';
    b1.style.display = 'block';
  }

  if (queue && queue.length !== 0 && queue.some(item => item.id === id)) {
    b3.style.display = 'none';
    b4.style.display = 'block';
  } else {
    b4.style.display = 'none';
    b3.style.display = 'block';
  }
}
