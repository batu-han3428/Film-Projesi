// import {sum,mult} from './lib';
// import * as lib from './lib';
// import myLib from './lib';
// const lib = new myLib();

// console.log(lib.sum(1,2,3));
// console.log(lib.mult(1,2,3,4));

//webpack babel es6 module dersinden kalan yerler
//npm run start ile projeyi webpack aracılığı ile çalıştırıyoruz.

//d8d2b643ae9a4b57c9d1634e2e9e760a api key
//https://api.themoviedb.org/3  url
//https://api.themoviedb.org/3/search/movie?api_key=d8d2b643ae9a4b57c9d1634e2e9e760a&language=en-US&query=abc&page=1&include_adult=false


//model view controller çerçevesinde projemizi yapacağımız için projeyi modüllere bölüyoruz

import Search from "./models/search";//Search classını yani modülünü(model) indexe dahil ettik
import { elements,renderLoader, clearLoader, paginationElements } from "./base";//seçicileri tuttuğumuz base.js de ki elements değişkenini dahil ettik
import * as searchView from "./views/searchView";//search.js dosyasında ne varsa hepsini searchView adı altında dahil ettik
import * as movieView from "./views/movieView";
import { Movie } from "./models/Movie";

const state = {};

//Search Controller
const searchController = async (pagination=1,name,active=false) => {
    const keyword = elements.searchInput.value;

    if(keyword){
        searchView.clearInput();
        movieView.closeDetailst();
        renderLoader(elements.movieListContainer);
        state.search = new Search(keyword,pagination);
        await state.search.getResults();
 
        setTimeout(() => { 
            searchView.clearResults();          
            searchView.displayResults(keyword, state.search.veriler);
            clearLoader();
        }, 1000);
    }else if(name == 'UL'){
        
        state.search = new Search(state.search.keyword,pagination);
        let durum = await state.search.getResults();
        if(durum && !active){
            renderLoader(elements.movieListContainer);
            setTimeout(() => { 
                searchView.clearResults();
                searchView.displayResults(state.search.keyword, state.search.veriler);
                clearLoader();
            }, 1000);
        } 
                  
    }else{
        alert("anahtar kelime girmelisiniz");
    }
}


//Movie Controller
const movieController = async () => {
    const id = window.location.hash.replace("#",'');

    if(id){
        renderLoader(elements.movieDetailsContainer);
        state.movie = new Movie(id);
        await state.movie.getMovie();
        setTimeout(() => { 
            movieView.backToTop();
            movieView.displayMovie(state.movie);     
            clearLoader();
        }, 1000);
           
    }
}

window.addEventListener('hashchange',movieController);

elements.movieDetailsClose.addEventListener('click',movieView.closeDetailst);

elements.pagination.addEventListener('click',function(e){
    if(e.target.classList.contains('sayfalar') || e.target.classList.contains('raquo')){   
        searchController(e.target.textContent.trim(), e.currentTarget.nodeName, e.target.parentElement.classList.contains('active'));
    }
});

elements.searchForm.addEventListener('submit',function(e){
    searchView.clearPaginationElements();
    searchController();
    e.preventDefault();
});

const searchReset = () => {
    if (performance.navigation.type == performance.navigation.TYPE_RELOAD) {
        history.pushState("", document.title, window.location.pathname + window.location.search);
    }
}

document.addEventListener('DOMContentLoaded',searchReset());