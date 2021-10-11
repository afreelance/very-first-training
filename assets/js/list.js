const listUrl = "https://api.themoviedb.org/3/discover/movie?api_key=706d33f9481040322c9a2633342f6583&language=fr-FR&include_adult=false&include_video=false&page=";

const listElement = document.querySelector('#movie_list');
const nextPage = document.querySelector('.next');
const previousPage = document.querySelector('.previous');

let nbpage;
nbpage = "1";
let limit;
limit = nbpage;
let letter;
letter = '';
let total_pages;
total_pages = Math.floor(500 / 2);
let block;
block = "";
let pageNumber;
pageNumber = 1;

/*
function setTitle(title, block)
{
    if (letter != title.charAt(0))
    {
        letter = title.charAt(0);
        block = block.concat("<h3>", letter, "</h3>");
    }
    return block
}
*/

function getMovies(movies)
{
    movies.forEach(movie => {
        //block = setTitle(movie.original_title, block);
        block = block.concat("<p><a class='film_name' href=", MOVIE_searchUrl + movie.id,">", movie.title, "</a></p>");
    });
    return block;
}

function renderMovieList(data)
{
    const movies = data.results;
    
    block = "";
    const allMovies = `
        ${getMovies(movies)}
    `
    listElement.innerHTML = allMovies;
    total_pages = data.total_pages;
}

function print_movie()
{
    //console.log("nbpage = ", nbpage);
    print_paging();
    nbpage = Math.floor(pageNumber * 2 - 1);
    console.log("nbpage (avant) = ", nbpage);
    console.log("pageNumber = ", pageNumber);
    while (nbpage <= pageNumber * 2)
    {
        fetch(listUrl + nbpage)
        .then(res => res.json())
        .then(data => renderMovieList(data))
        .catch(err => {
            console.log("Error : ", err);
        })
        nbpage++;
    }// QUESTION : plutot preferer mettre valeur en variable (ce que j'arrive pas a faire) ou valeur en dure et on s'en blk
    console.log("nbpage (apres) = ", nbpage);
}

print_movie();

function print_paging()
{
    if (!(pageNumber = Number(URLparams.get("page"))))
        pageNumber = 1;
    setAttr();
}

function setAttr()
{
    //const newUrl = homeURL + "?page=";

    if (pageNumber < total_pages)
    {
        //newUrl = newUrl + pageNumber + 1;
        nextPage.setAttribute("href", homeURL + "?page=" + Number(pageNumber + 1));
        if (nextPage.classList.contains("next_"))
            nextPage.classList.remove("next_");
    }
    else
        nextPage.classList.add("next_");
    if (pageNumber > 1)
    {
        //newUrl += pageNumber - 1;
        previousPage.setAttribute("href", homeURL + "?page=" + Number(pageNumber - 1));
        if (previousPage.classList.contains("previous_"))
            previousPage.classList.remove("previous_");
    }
    else
        previousPage.classList.add("previous_");
}