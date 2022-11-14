export default function meaningForm (){
    const refs = {
        searchForm :document.querySelector('.search-form')
    }
    return refs.searchForm.querySelector('.input').value;
}
