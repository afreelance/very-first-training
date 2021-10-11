const movie_url = new URL(window.location.href);
const params = movie_url.searchParams;
const id = params.get('id');

const API_detailUrl = "https://api.themoviedb.org/3/movie/" + id + "?api_key=706d33f9481040322c9a2633342f6583&language=fr-FR";
const API_creditsUrl = "https://api.themoviedb.org/3/movie/" + id + "/credits?api_key=706d33f9481040322c9a2633342f6583";
const image_Url1 = "https://image.tmdb.org/t/p/w500";
const image_Url2 = "?language=fr-FR";

const title_infoElem = document.querySelector('.title_info'); //essayer de mettre background sur le plus grand div
const page_infoElem = document.querySelector('.page_info');
const backgndElem = document.querySelector("#backgnd");

function printTitle(title)
{
    return `
    <h1 class="title">${title}</h1>
    `;
}

function printPic(path)
{
    if (!path)
        return ;
    return `
    <a href="${image_Url1 + path + image_Url2}"><img class="main_img" src="${image_Url1 + path + image_Url2}"/></a>
    `
}

function printOverview(overview)
{
    return `
    <p class="overview">${overview}</p>
    `
}

function cast(data_credits)
{
    let string;
    let i;

    i = -1;
    string = "";
    console.log("data_credits = ", data_credits);
    while(++i < 8 && i < data_credits.cast.length)
    {
        string += data_credits.cast[i].name;
        string += ", ";
    }
    if (data_credits.cast.length > 7)
        string += "etc";
    else
        string = string.substring(0, string.length - 2);
    return string;
}

function printDetails(data, data_credits)
{
    return `
    <p class="average">Noté ${data.vote_average} / 10</p>
    <p class="credits"><em>Avec : </em>${cast(data_credits)}</p>
    `
}

function appendInfo(data)
{
    const title = data.title;
    const poster_path = data.poster_path;
    const backdrop_path = data.backdrop_path;
    const overview = data.overview;

    console.log("Data : ", data);
    title_infoElem.innerHTML = printOverview(overview);
    fetch(API_creditsUrl)
        .then(res => res.json())
        .then(data_credits => {
            title_infoElem.innerHTML += printDetails(data, data_credits);
            page_infoElem.innerHTML += printTitle(title);
            page_infoElem.innerHTML += printPic(poster_path);
        })
        .catch(err => {
            console.log("Error : ", err);
        })
    const backgnd_url = "https://image.tmdb.org/t/p/w1280" + backdrop_path + "?language=fr-FR";
    backgndElem.style.backgroundImage = 'url("' + backgnd_url + '")';
    console.log("img = ", backgndElem.style.backgroundImage);
}

function renderInfo()
{
    fetch(API_detailUrl)
    .then(res => res.json())
    .then(data => appendInfo(data))
    .catch(err => {
        console.log("Error : ", err);
    })
}

renderInfo();