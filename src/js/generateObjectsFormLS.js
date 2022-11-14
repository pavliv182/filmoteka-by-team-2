 function checkLSWached() {
  const wached = JSON.parse(localStorage.getItem('wachedFilms'));
  const obj = {}
  if (wached) {
    obj.totalItems = wached.length;
    obj.totalPagesForDesctop = Math.ceil(wached.length / 9);
    obj.totalPagesForTablet = Math.ceil(wached.length / 8);
    obj.totalPagesForMobile = Math.ceil(wached.length / 4);
    obj.data = wached;
  }
  return obj;
}

 function checkLSQueue() {
  const wached = JSON.parse(localStorage.getItem('queueFilms'));
  const obj = {}
  if (wached) {
    obj.totalItems = wached.length;
    obj.totalPagesForDesctop = Math.ceil(wached.length / 9);
    obj.totalPagesForTablet = Math.ceil(wached.length / 8);
    obj.totalPagesForMobile = Math.ceil(wached.length / 4);
    obj.data = wached;
  }
  return obj;
}

function getPageItems(page, perPage, arr = []){
  const from = (page - 1) * perPage;
  const to = from + perPage - 1;
  const result = arr.filter((item, index) => index >= from && index <= to);
  return result;
}

export {checkLSQueue, checkLSWached, getPageItems}


