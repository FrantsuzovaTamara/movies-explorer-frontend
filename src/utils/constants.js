const STATUS = "development";
export const MOVIE_URL = "https://api.nomoreparties.co/beatfilm-movies";
let BASE_URL;

if (STATUS === "production") {
  BASE_URL = "https://api.movies.explorer.nomoredomains.monster";
} else {
  BASE_URL = "http://localhost:3000";
}

export const screenWidth = window.screen.width;

export default BASE_URL;
