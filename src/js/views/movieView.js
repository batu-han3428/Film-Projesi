import { elements } from "../base";//seçicileri tuttuğumuz base.js de ki elements değişkenini dahil ettik

export const backToTop = () => {
    window.scrollTo({top:0, behavior:'smooth'});
}

export const closeDetailst = () => {
    history.pushState("", document.title, window.location.pathname + window.location.search);
    elements.movieDetailsContainer.classList.add('d-none');
}

export const displayMovie = movie => {
    var html = `<div class="row">`;
    var genres = "";
    movie.veriler.genres.forEach(genre => {
        genres+= `<span class="badge bg-primary ms-1">${genre.name}</span>`;
    });
    html+= `
        <div class="col-md-4">
        <img src="https://image.tmdb.org/t/p/w500/${movie.veriler.poster_path}" onerror="this.src='https://via.placeholder.com/92x138';" class="img-fluid" alt="${movie.veriler.title}">
        </div>
        <div class="col-md-8">
            <div>
                <h5>
                    ${movie.veriler.original_title}
                </h5>
                <p>${movie.veriler.overview}</p>
                <p><small class="badge bg-primary">${movie.veriler.vote_average}</small></p>
                <hr>
                ${genres}
            </div>
        </div>
    `;
    html+=`</div>`;

    elements.movieDetailsContainer.classList.remove('d-none');
    elements.movieDetails.innerHTML=html;
};