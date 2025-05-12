const API_KEY = 'c2d39ce4dd56b89e3b950e582df3901d';
const API_URL = 'https://api.themoviedb.org/3/search/movie?api_key=' + API_KEY + '&query=';
const IMG_PATH = 'https://image.tmdb.org/t/p/w500/';

const form = document.getElementById('form');
const search = document.getElementById('search');
const main = document.getElementById('main');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const query = search.value.trim();
    if (query) {
        fetchMovies(query);
    }
});

async function fetchMovies(query) {
    try {
        const res = await fetch(API_URL + query);
        const data = await res.json();
        displayMovies(data.results);
    } catch (error) {
        console.error('Erro ao buscar filmes:', error);
        main.innerHTML = '<p>Erro ao buscar filmes. Tente novamente mais tarde.</p>';
    }
}

function displayMovies(movies) {
    main.innerHTML = '';
    if (movies.length === 0) {
        main.innerHTML = '<p>Nenhum filme encontrado.</p>';
        return;
    }

    movies.forEach((movie) => {
        const { title, poster_path, vote_average, overview } = movie;
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.innerHTML = `
            <img src="${poster_path ? IMG_PATH + poster_path : 'https://via.placeholder.com/500x750?text=Sem+Imagem'}" alt="${title}">
            <div class="movie-info">
                <h3>${title}</h3>
                <span>${vote_average}</span>
            </div>
            <div class="overview">
                <h3>Sinopse</h3>
                <p>${overview}</p>
            </div>
        `;
        main.appendChild(movieEl);
    });
}

 
