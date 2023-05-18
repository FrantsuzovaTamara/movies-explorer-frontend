const STATUS = "development";
export const MOVIE_URL = "https://api.nomoreparties.co/beatfilm-movies";
let BASE_URL;

if (STATUS === "production") {
  BASE_URL = "https://api.movies.explorer.nomoredomains.monster";
} else {
  BASE_URL = "http://localhost:3000";
}

const VALID_ERR_MESSAGE = 'Проверьте введённые данные';
const CONFL_ERR_MESSAGE = 'Пользователь с такой почтой уже зарегистрирован';
const NOT_FOUND_ERR_MESSAGE = 'Данные не найдены';
const UNAUTH_ERR_MESSAGE = 'Необходима авторизация';
const FORBID_ERR_MESSAGE = 'Вы не можете удалить фильм другого пользователя';
const MAIN_ERR_MESSAGE = 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз'
const SCREEN_WIDTH = window.screen.width;
const MINUTES_IN_HOUR = 60;
const MAX_SHORT_FILM_DURATION = 40
let MOVIES_IN_ROW;
let NUMBER_OF_MOVIES_PER_PAGE;

if (SCREEN_WIDTH >= 1280) {
  MOVIES_IN_ROW = 3;
  NUMBER_OF_MOVIES_PER_PAGE = 12;
} else if (SCREEN_WIDTH < 1280 && SCREEN_WIDTH >= 761) {
  MOVIES_IN_ROW = 2;
  NUMBER_OF_MOVIES_PER_PAGE = 8;
} else {
  MOVIES_IN_ROW = 2;
  NUMBER_OF_MOVIES_PER_PAGE = 5;
}

export {
  BASE_URL,
  VALID_ERR_MESSAGE,
  CONFL_ERR_MESSAGE,
  NOT_FOUND_ERR_MESSAGE,
  UNAUTH_ERR_MESSAGE,
  FORBID_ERR_MESSAGE,
  MAIN_ERR_MESSAGE,
  MINUTES_IN_HOUR,
  MOVIES_IN_ROW,
  NUMBER_OF_MOVIES_PER_PAGE,
  MAX_SHORT_FILM_DURATION
};
