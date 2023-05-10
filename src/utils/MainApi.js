import BASE_URL from "./constants";
const contentType = "application/json";

const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
};

export const getUserInfo = () => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      authorization: `Bearer ${JSON.parse(localStorage.getItem("jwt"))}`,
      "Access-Control-Allow-Origin": "*",
    },
  }).then(checkResponse);
};

export const editProfileInfo = ({ name, email }) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "PATCH",
    headers: {
      authorization: `Bearer ${JSON.parse(localStorage.getItem("jwt"))}`,
      "Content-Type": contentType,
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      name: name,
      email: email,
    }),
  }).then(checkResponse);
};

export const getSavedMovies = () => {
  return fetch(`${BASE_URL}/movies`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem("jwt"))}`,
      "Access-Control-Allow-Origin": "*",
    },
  }).then(checkResponse);
};

export const addMovieInApi = ({
  country,
  director,
  duration,
  year,
  description,
  image,
  trailerLink,
  thumbnail,
  movieId,
  nameRU,
  nameEN,
}) => {
  console.log({country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN});
  return fetch(`${BASE_URL}/movies`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem("jwt"))}`,
      "Content-Type": contentType,
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      thumbnail,
      movieId,
      nameRU,
      nameEN,
    }),
  }).then(checkResponse);
};

export const deleteMovieInApi = (movieId) => {
  return fetch(`${BASE_URL}/movies/${movieId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem("jwt"))}`,
      "Content-Type": contentType,
      "Access-Control-Allow-Origin": "*",
    },
  }).then(checkResponse);
};
