//API key
const APIKey = "9f7ff340242713835a084c08084a9afa";
//Image URL
const imageURL = "https://image.tmdb.org/t/p/w500";

//For accessing the form HTML
let form = document.querySelector("#form");
//For accessing the empty Div for content movies
let contentDiv = document.querySelector("#contentDiv");

//popular movies: "/discover/movie?sort_by=popularity.desc"

//poster_path: "/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg"

// Full URL
// https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=9f7ff340242713835a084c08084a9afa

//1st part:https://api.themoviedb.org/3
//2nd part of the url:/discover/movie?sort_by=popularity.desc&
//3rd part:api key

const getDataMovies = async () => {
  const url = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=9f7ff340242713835a084c08084a9afa";
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
  //
  displayMovies(data.results);
};

getDataMovies();

//Function that display movies
const displayMovies = (movies) => {
  // code that iterates on each object movie and FOR EACH movie creates a div with its post, title and vote.
  movies.forEach((movie) => {
    contentDiv.innerHTML +=
      //Double check if it's a good practice to create a div for pics only and another one for the info: title, vote
      `<div class="movieContainers">
    <img src="${imageURL}${movie.poster_path}" alt="${movie.title}">
    <h2 class="movieTitle" >${movie.title}</h2>
    <h3 class="movieVote" >${movie.vote_average}</h3>
    </div> 
    <div class="movieOverview>
    <h3>Overview:</h3>
    ${movie.overview}
    </div>`;
  });
};
