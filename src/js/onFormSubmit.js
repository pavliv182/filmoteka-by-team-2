// Функция которая считывает инпут и возвращает название фильма;

export default function onFormSubmit() {
  const refs = {
    inputEl: document.querySelector('.input'),
    submitEl: document.querySelector('.input__btn'),
  };

  refs.submitEl.addEventListener('submit', createSearchName);
  let searchFilm = '';
  
  function createSearchName(eve) {
    e.preventDefault();
    searchFilm = e.currentTarget.elements.searchQuery.value.trim();
    if (searchFilm !== 0) {
      return searchFilm;
    
    }
  };
  function createSearchName(e) {
    searchFilm = e.currentTarget.elements.searchQuery.value.trim();
    if (searchFilm !== 0) {
      return searchFilm;
    }
  };
}
