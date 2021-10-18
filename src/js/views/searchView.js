import { elements, paginationElements } from "../base";//seçicileri tuttuğumuz base.js de ki elements değişkenini dahil ettik



export const clearInput = () => {
    elements.searchInput.value = '';
}

export const clearResults = () => {
    elements.movieList.innerHTML = '';
}

export const clearPaginationElements = () => {
    paginationElements.totalSayfa = 0;
    paginationElements.oncekiSayfa = 1;
    paginationElements.searchOncekiSayfa = 1;
}

const pagingOperations = (veriler) => {
    var sayfa;
 
    if(veriler.page == 1){             
        elements.pagination.firstElementChild.firstElementChild.style.cursor='not-allowed';
    }else{
        elements.pagination.firstElementChild.firstElementChild.style.cursor='pointer';
    }
    
    if(veriler.total_pages == veriler.page){
        elements.pagination.lastElementChild.lastElementChild.style.cursor='not-allowed';
    }else{
        elements.pagination.lastElementChild.lastElementChild.style.cursor='pointer';
    }

    if(veriler.page <= 3){
        sayfa = 1;
    }else{
        if(2 >= (veriler.total_pages - veriler.page)){
            sayfa = paginationElements.oncekiSayfa;
        }else{
            paginationElements.oncekiSayfa = veriler.page;
            sayfa = veriler.page -2;
        }              
    }


    for (let index = 0; index < document.querySelectorAll('.sayfalar').length; index++) {
        if(!document.querySelectorAll('.sayfalar')[index].firstElementChild){  
            document.querySelectorAll('.sayfalar')[index].textContent=sayfa;
            sayfa++;
            if(document.querySelectorAll('.sayfalar')[index].textContent == veriler.page){
                document.querySelectorAll('.sayfalar')[index].parentElement.classList.add('active');
            }else{
                document.querySelectorAll('.sayfalar')[index].parentElement.classList.remove('active');
            }
        }
    }
}

export const displayResults = (keyword, veriler) => {
    let html = "";

    if(veriler.total_pages > 0){
        elements.movieListContainer.querySelector('.card-body').style.background='unset';
        veriler.results.forEach(movie => {
            html += `
                <div class="d-flex mb-3">
                    <div class="flex-shrink-0">
                        <img src="https://image.tmdb.org/t/p/w92/${movie.poster_path}" onerror="this.src='../img/fotografBulunamadi.jpg'; width='92'" alt="${movie.title}">
                    </div>
                    <div class="flex-grow-1 ms-3">
                        <h3>
                            <span class="badge bg-primary">${movie.vote_average}</span> 
                            <a href="#${movie.id}">${movie.title}</a>
                        </h3>
                        <p>${movie.overview}</p>
                    </div>
                </div>
        `;
        });

        elements.pagination.style.visibility='visible';
        pagingOperations(veriler);
    }else{
        elements.movieListContainer.querySelector('.card-body').style.background='rgb(214, 221, 229)';
        html = `
            <div style='width:50%; margin:0 auto;'>           
                <img src='../img/fotografBulunamadi.jpg'; class='w-100' alt="404">
            </div>
        `;
        elements.pagination.style.visibility='hidden';
    }
        
  
    

    elements.movieListHeader.innerHTML=`"${keyword}" ile ilgili ${veriler.total_results} sonuç bulundu.`;
    elements.movieListContainer.classList.remove('d-none');
    elements.movieList.insertAdjacentHTML('beforeend',html);//seçili tagın seçtiğimiz bölümüne göndereceğimiz veriyi ekler. 4 tane bölüm seçebiliriz. 
    /*
        1-) beforebegin
        <div>//seçili tag
            2-) afterbegin

            3-) beforeend
        </div>
        4-) afterend
    */
        
}