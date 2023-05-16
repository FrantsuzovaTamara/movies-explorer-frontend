import { MOVIE_URL } from "./constants";

const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(res.status);
  }
};

export const getMovies = () => {
  return fetch(MOVIE_URL, {
    method: "GET",
  }).then(checkResponse);
};
