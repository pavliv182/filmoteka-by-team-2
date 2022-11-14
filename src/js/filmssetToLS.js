export {setFilmToWeched, setFilmToQueue, removeFilmToWeched, removeFilmToQueue};


let lastdeleted;
function setFilmToWeched(id){
    let data = localStorage.getItem('wachedFilms');
    if(data){
        data = JSON.parse(data);
    }
    else{
        data = [];
    }
    if(data.some(intem => intem.id === id)){
        return;
    }
    const result = findFilmById(id);
    data.push(result || lastdeleted);
    data = JSON.stringify(data);
    localStorage.setItem('wachedFilms', data);
}

function setFilmToQueue(id){
    let data = localStorage.getItem('queueFilms');
    if(data){
        data = JSON.parse(data);
    }
    else{
        data = [];
    }
    if(data.some(intem => intem.id === id)){
        return;
    }
    const result = findFilmById(id);
    data.push(result || lastdeleted);
    data = JSON.stringify(data);
    localStorage.setItem('queueFilms', data);
}

function removeFilmToWeched(id){
    let data = JSON.parse(localStorage.getItem('wachedFilms'));
    if(data.every(intem => intem.id !== id)){
        return;
    }
    lastdeleted = data.splice(data.findIndex(intem => intem.id === id), 1)[0];
    data = JSON.stringify(data);
    localStorage.setItem('wachedFilms', data);
}

function removeFilmToQueue(id){
    let data = JSON.parse(localStorage.getItem('queueFilms'));
    if(data.every(intem => intem.id !== id)){
        return;
    }
    lastdeleted = data.splice(data.findIndex(intem => intem.id === id), 1)[0];
    data = JSON.stringify(data);
    localStorage.setItem('queueFilms', data);
}


function findFilmById(id){
    const reneredCards = JSON.parse(localStorage.getItem('reneredCards'));
    return reneredCards.find(item => item.id === id);
}
