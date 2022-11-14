import findJanres from './findJanreWithId';
const createMarcupGallery = (data, flag) => {
  // вносим объект как строку в LocalStorage
  localStorage.setItem('reneredCards', JSON.stringify(data));
  return data.map(
    ({
      base_url_post = 'https://image.tmdb.org/t/p/w500/',
      poster_path,
      title,
      genre_ids,
      id,
      name,
      release_date,
      first_air_date,
      vote_average,
    }) => {
      // ссылки на каждый элемент
      const liInGallaryEl = document.createElement('li');
      const buttonInGallaryEl = document.createElement('button');
      const imgInButtonEl = document.createElement('img');
      const h3InGallaryEl = document.createElement('h3');
      const pInGallaryEl = document.createElement('p');

      //наполнение контентом карточки
      imgInButtonEl.src = `${CaptchaPosterPath(base_url_post, poster_path)}`;
      imgInButtonEl.alt = `${title || name}`;
      pInGallaryEl.textContent = `${renderGenres(genre_ids)} | ${(
        release_date ||
        first_air_date ||
        '2010'
      ).slice(0, 4)}`;
      h3InGallaryEl.textContent = `${title || name}`;
      imgInButtonEl.setAttribute('loading', 'lazy');
      buttonInGallaryEl.dataset.id = `${id}`;
      buttonInGallaryEl.dataset.click = '';

      // добавляем классы
      liInGallaryEl.classList.add('gallery__item');
      buttonInGallaryEl.classList.add('gallery__button');
      imgInButtonEl.classList.add('gallery__img');
      h3InGallaryEl.classList.add('gallery__title');
      pInGallaryEl.classList.add('gallery__text');

      //вставка элеметов в DOM нужном порядке
      buttonInGallaryEl.append(imgInButtonEl);
      buttonInGallaryEl.append(h3InGallaryEl);
      buttonInGallaryEl.append(pInGallaryEl);

      if (flag) {
        //ранг добавляется,когда есть флаг
        const spanRangeInGallaryEl = document.createElement('span');
        spanRangeInGallaryEl.textContent = `${vote_average.toFixed(1)}`;
        spanRangeInGallaryEl.classList.add('gallery__text-range');
        pInGallaryEl.append(spanRangeInGallaryEl);
      }
      // сборка все в 'виноградную гроздь'
      liInGallaryEl.append(buttonInGallaryEl);

      return liInGallaryEl;
    }
  );
};

function renderGenres(array = []) {
  if (!array.length) {
    return 'Other';
  }
  const janresArr = [];
  // невероятный костыль
  array.forEach((elem, index) => {
    if (index <= 1) {
      janresArr.push(findJanres(elem));
    } else if (index === 2) {
      janresArr.push(findJanres('Other'));
    }
  });
  return janresArr;
}

function CaptchaPosterPath(base_url, url_patch) {
  if (!url_patch || url_patch === '/mNSqObjKszcxr55buQafQF9ARiC.jpg') {
    // болванка
    return 'https://www.themoviedb.org/assets/2/apple-touch-icon-cfba7699efe7a742de25c28e08c38525f19381d31087c69e89d6bcb8e3c0ddfa.png';
  }
  // Url картинки для карточки
  return base_url + url_patch;
}

export { createMarcupGallery, CaptchaPosterPath };
