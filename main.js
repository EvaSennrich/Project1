const pageSize = 10;
var currentPage = 1;
//API key which is the 3rd piece/part of the API url
const APIKey = "9f7ff340242713835a084c08084a9afa";

//API URL:This one contains the 3 pieces already: base URL+bestMoviesURL+APIkey

//POPULAR MOVIES API URL
const apiURL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=9f7ff340242713835a084c08084a9afa";

//NOW PLAYING API URL
// const apiURL = `https://api.themoviedb.org/3/search/movie/now_playing?api_key=${APIKey}`;

//Image URL to access the posters for each movie
const imageURL = "https://image.tmdb.org/t/p/w500";

//Search URL which allows us to search for movies after the event listener of 'Submit' it's triggered
const searchURL = `https://api.themoviedb.org/3/search/movie?api_key=${APIKey}&query=`;

//code for accessing the HTML
let form = document.querySelector("#form");
let searchInput = document.querySelector(".search-input");
let moviesgrid = document.querySelector("#movies-grid");
let moreContentDiv = document.querySelector(".moreContentDiv");
let loadMoreMoviesBtn = document.querySelector(".load-more-movies-btn");
let closeSearchBtn = document.querySelector("#close-search-btn");
let overviewBtn = document.querySelector(".overviewBtn");
let modalDiv = document.querySelector(".modal");
let overlayDiv = document.querySelector(".overlay");

//popular movies: "/discover/movie?sort_by=popularity.desc"

//poster_path: "/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg"

// Full URL
// https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=9f7ff340242713835a084c08084a9afa

//1st part:https://api.themoviedb.org/3
//2nd part of the url:/discover/movie?sort_by=popularity.desc&
//3rd part:api key

const getDataMovies = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
  displayMovies(data.results);
  // ratingColor(data.results.vote_average);
};
getDataMovies(apiURL);

//Function that display movies
const displayMovies = (movies) => {
  // code that iterates on each object movie and FOR EACH movie creates a div with its post, title and vote.
  movies.forEach((movie) => {
    moviesgrid.innerHTML +=
      //Double check if it's a good practice to create a div for pics only and another one for the info: title, vote
      `<div class="movie-card" id=${movie.id}>
        <div class="imageContainer">
          <img class="movie-poster" src="${imageURL}${movie.poster_path}" alt="${movie.title}"/>
        </div>
          <div id="movieInfoContainer">
            <h2 class="movie-title" >${movie.title}</h2>
            <h5 class= "movie-votes" >${movie.vote_average}</h5>
          </div> 
        </div>
        </div>`;
    movieCards = document.querySelectorAll(".movie-card");
  });

  addButton(movieCards);
};

const addButton = (poster) => {
  poster.forEach((item, index) => {
    item.addEventListener("click", () => {
      popUp(poster[index].id);
    });
  });
};

const showMoreMovies = () => {
  console.log("called");
  currentPage++;
  //this url goes inside the function since we're changing the currentPage when the button "show more" is clicked and you need the pageURL to be changed when currentPage is updated.
  let pageURL = `https://api.themoviedb.org/3/discover/movie?api_key=${APIKey}&sort_by=popularity.desc&page=${currentPage}`;
  getDataMovies(pageURL);
};
//  <div class="movieOverview">
//    <button onclick="${movie.overview}" type="button" class="overviewBtn">
//      Overview
//    </button>
//  </div>;

const voteColor = (vote) => {
  if (vote < 5) {
    return "red";
  } else {
    return "green";
  }
};

//code for Submit form, for user movie search
form.addEventListener("submit", (e) => {
  moviesgrid.innerHTML = "";
  //This code prevents the parameter ->e(event) to not be handled if the event "submit" isn't listened/handled!

  e.preventDefault();
  //this var/const stores the value that the user inputs or enter in the inpit field of the form
  const searchTerm = searchInput.value;

  //this code is a conditional that tells the computer if searchTerm = true or triggered --> do this  --> which is to run the getDataMovies func which fecths the movies data or objects but in this case would be the specific value that the users inputs, thus we pass the searchURL and concatenate it with the value entered by the user(searchTerm).
  if (searchTerm) {
    getDataMovies(searchURL + searchTerm);
    searchInput.value = "";
    //and this else says the computer if there's not input entered or the movie does not exist just fecth all movies
  } else {
    getDataMovies(apiURL);
  }
});

closeSearchBtn.addEventListener("click", () => {
  moviesgrid.innerHTML = "";
  console.log("back");
  getDataMovies(apiURL);
});

// overviewBtn.addEventListener("click", (e) => {
//   e.getDataMovies();
//   // const overview = data.results.overview;
//   // console.log(overview);
// });

//code that handles show more movies button
loadMoreMoviesBtn.addEventListener("click", showMoreMovies);

const popUp = async (id) => {
  let overviewUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=9f7ff340242713835a084c08084a9afa`;

  const res = await fetch(overviewUrl);
  const data = await res.json();
  modalDiv.classList.toggle("hidden");
  overlayDiv.classList.toggle("hidden");
  modalDiv.innerHTML = `
  <div class="modalHeader">
    <div class="modalTitle">${data.title}</div>
    <button class="modalCloseBtn">&times;</button>
  </div>
    <div class="modalBody"> 
      <p class="description">${data.overview}</p>
    </div>
  </div>
  `;
  let modalCloseBtn = document.querySelector(".modalCloseBtn");
  modalCloseBtn.addEventListener("click", () => {
    modalDiv.classList.add("hidden");
    overlayDiv.classList.add("hidden");
  });
};
