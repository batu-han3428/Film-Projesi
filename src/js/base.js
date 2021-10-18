//tüm sayfalarda kullanabileceğimiz elementleri base.js de tanımlıyoruz

export const elements = {//tüm seçicilerimizi base js altında topluyoruz ki hem düzenli kod yazımı olsun, hemde herhangi bir seçtiğimiz elementi birden fazla kez kullanacağımız da tekrar tekrar yazmaktan kurtulmuş oluyoruz
    searchForm:document.getElementById('form-search'),
    searchInput:document.getElementById('txt-keyword'),
    movieList:document.getElementById('movie-list'),
    movieListContainer:document.getElementById('movie-list-container'),
    movieDetails:document.getElementById('movie-details'),
    movieDetailsContainer:document.getElementById('movie-details-container'),
    movieDetailsClose:document.getElementById('movie-details-close'),
    movieListHeader:document.getElementById('movie-list-header'),
    loader:document.getElementById('loader'),
    pagination:document.getElementById('pagination')
}

export const paginationElements = {
  oncekiSayfa:1,
  totalSayfa:0,
  searchOncekiSayfa:1
}

export const renderLoader = parent => {
  const loader = `
    <div id="loader" class="logoBackground">
      <div>
        <div class="reverse-spinner"></div>
      </div>
      <div>
        <div class="hm-spinner"></div>
      </div>
    </div>
  `;
  parent.insertAdjacentHTML('beforebegin',loader);
}

export const clearLoader = () => {
  loader.remove();
}

export const image_sizes = {
    backdrop_sizes: [
        "w300",
        "w780",
        "w1280",
        "original"
      ],
      logo_sizes: [
        "w45",
        "w92",
        "w154",
        "w185",
        "w300",
        "w500",
        "original"
      ],
      poster_sizes: [
        "w92",
        "w154",
        "w185",
        "w342",
        "w500",
        "w780",
        "original"
      ],
      profile_sizes: [
        "w45",
        "w185",
        "h632",
        "original"
      ],
      still_sizes: [
        "w92",
        "w185",
        "w300",
        "original"
      ]
}