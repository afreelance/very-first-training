const API_KEY = '706d33f9481040322c9a2633342f6583';
const IMAGE_searchUrl = 'https://image.tmdb.org/t/p/w500/';
const MOVIE_searchUrl = "movies/movie.html?id=";
const homeURL = "index.html";
const URLparams = new URL(window.location.href).searchParams;
const searchUrl = 'https://api.themoviedb.org/3/search/movie?api_key=706d33f9481040322c9a2633342f6583&language=fr-FR'

const searchButton = document.querySelector('#search');
const inputFilm = document.querySelector('#input_film');
const moviesSearchable = document.querySelector('#movies_searchable');

function movieSection(movies)
{
    return movies.map(movie => {
        if (movie.poster_path)
        {
            return `
            <a href="${MOVIE_searchUrl + movie.id}"><img src=${IMAGE_searchUrl + movie.poster_path + "?language=fr-FR"} data-movie-id=${movie.id} title="${movie.title}"/></a>
            `;
        }
    }).join('');
}

function createMovieContainer(movies)
{
    const movieElement = document.createElement("div");
    movieElement.setAttribute("class", "movie");

    const movieTemplate = `
        <section class="section">
            ${movieSection(movies)}
        </section>
    `;

    movieElement.innerHTML = movieTemplate; //essayer de mettre directement movie.innerHTML
    //a la place de movieTemplate au dessus
    return movieElement;
}

function renderSearchMovies(data)
{
    const movies = data.results;
    moviesSearchable.innerHTML = '';
    const movieBlock = createMovieContainer(movies);
    moviesSearchable.append(movieBlock);
    console.log("Data :", data)
}

searchButton.onclick = function(event)
{
    event.preventDefault();

    const value = inputFilm.value;
    const newsearchUrl = searchUrl + '&query=' + value;

    fetch(newsearchUrl)
        .then(res => res.json())
        .then(data => renderSearchMovies(data))
        .catch(err => {
            console.log("Error :", err);
        })
    inputFilm.value = '';
    console.log('value =', value);
}

document.onclick = function(event)
{
    const target = event.target;
    
    if (target.tagName.toLowerCase() === 'img') //ou target.tagName === 'IMG'
    {
        const section = target.parentElement;
        const content = section.nextElementSibling;
        content.classList.add("content_display");
    }
}