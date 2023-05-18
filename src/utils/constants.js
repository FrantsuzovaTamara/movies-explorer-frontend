const STATUS = "production";
export const MOVIE_URL = "https://api.nomoreparties.co/beatfilm-movies";
let BASE_URL;

if (STATUS === "production") {
  BASE_URL = "https://api.movies.explorer.nomoredomains.monster";
} else {
  BASE_URL = "http://localhost:3000";
}

const SUCCESS_MESSAGE = 'Данные успешно изменены';
const VALID_ERR_MESSAGE = 'Проверьте введённые данные';
const CONFL_ERR_MESSAGE = 'Пользователь с такой почтой уже зарегистрирован';
const NOT_FOUND_ERR_MESSAGE = 'Данные не найдены';
const UNAUTH_ERR_MESSAGE = 'Необходима авторизация';
const FORBID_ERR_MESSAGE = 'Вы не можете удалить фильм другого пользователя';
const MAIN_ERR_MESSAGE = 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз'


export {
  BASE_URL,
  SUCCESS_MESSAGE,
  VALID_ERR_MESSAGE,
  CONFL_ERR_MESSAGE,
  NOT_FOUND_ERR_MESSAGE,
  UNAUTH_ERR_MESSAGE,
  FORBID_ERR_MESSAGE,
  MAIN_ERR_MESSAGE,
};
