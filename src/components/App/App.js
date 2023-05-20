import { useState, useEffect } from "react";
import { Routes, Route, useNavigate, Navigate, useLocation } from "react-router-dom";

import ProtectedRoute from "../ProtectedRoute";
import { CurrentUserContext } from "../../context/CurrentUserContext";

import Header from "../Header/Header";
import UnauthorizedHeader from "../Header/UnauthorizedHeader/UnauthorizedHeader";
import FormHeader from "../Header/FormHeader/FormHeader";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Login from "../Login/Login";
import Register from "../Register/Register";
import EditProfile from "../EditProfile/EditProfile";
import Footer from "../Footer/Footer";
import Error from "../Error/Error";
import ErrorPopup from "../ErrorPopup/ErrorPopup";
import Preloader from "../Preloader/Preloader";
import { MAX_SHORT_FILM_DURATION } from "../../utils/config";

import * as MoviesApi from "../../utils/MoviesApi";
import * as MainApi from "../../utils/MainApi";
import * as Auth from "../../utils/Auth";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);

  const [searchedNewMovies, setSearchedNewMovies] = useState([]);
  const [searchedSavedMovies, setSearchedSavedMovies] = useState([]);
  const [inputValueNewMovies, setInputValueNewMovies] = useState("");
  const [inputValueSavedMovies, setInputValueSavedMovies] = useState("");
  const [shortNewMovies, setShortNewMovies] = useState(false);
  const [shortSavedMovies, setShortSavedMovies] = useState(false);

  const [savedMovies, setSavedMovies] = useState([]);
  const [moviesFromApi, setMoviesFromApi] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  let location = useLocation();

  // Форматирует данные о фильмах

  function formatMoviesArr(moviesArr) {
    return moviesArr.map((movie) => {
      return {
        country: movie.country,
        director: movie.director,
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        image: `https://api.nomoreparties.co/${movie.image.url}`,
        trailerLink: movie.trailerLink,
        thumbnail: `https://api.nomoreparties.co/${movie.image.formats.thumbnail.url}`,
        movieId: movie.id,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN,
      };
    });
  }

  function formatMovieInfo(movie) {
    return {
      country: movie.country,
      director: movie.director,
      duration: movie.duration,
      year: movie.year,
      description: movie.description,
      image: movie.image,
      trailerLink: movie.trailerLink,
      thumbnail: movie.thumbnail,
      movieId: movie.movieId,
      nameRU: movie.nameRU,
      nameEN: movie.nameEN,
    };
  }

  // Получает данные из локального хранилища

  function getItemsFromLocalStorage() {
    localStorage.getItem("searchingNewMoviesResults") !== null
      ? setSearchedNewMovies(
          JSON.parse(localStorage.getItem("searchingNewMoviesResults"))
        )
      : setSearchedNewMovies([]);

    localStorage.getItem("inputValueNewMovies") !== null
      ? setInputValueNewMovies(localStorage.getItem("inputValueNewMovies"))
      : setInputValueNewMovies("");
      
    localStorage.getItem("shortNewMovies") !== null
      ? setShortNewMovies(localStorage.getItem("shortNewMovies") === "false" ? false : true)
      : setShortNewMovies(false);
  }

  // Проверяет токен и подгружает данные с api

  useEffect(() => {
    handleTokenCheck();
  }, []);

  useEffect(() => {
    if (loggedIn) {
      setIsLoading(true);
      Promise.all([
        MainApi.getUserInfo(),
        MainApi.getSavedMovies(),
        MoviesApi.getMovies(),
      ])
        .then(([userData, savedMoviesFromMainApi, moviesFromMoviesApi]) => {
          setCurrentUser(userData.user);
          setSavedMovies(savedMoviesFromMainApi.userMovies);
          setMoviesFromApi(formatMoviesArr(moviesFromMoviesApi));
          setSearchedSavedMovies(savedMoviesFromMainApi.userMovies);
          setInputValueSavedMovies("");
          setShortSavedMovies(false);
        })
        .catch((err) => {
          setIsOpen(true);
          setError(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [loggedIn]);

  useEffect(() => {
    getItemsFromLocalStorage();
    setSearchedSavedMovies(savedMovies);
  }, [location]);

  // Авторизация

  function handleLogin({ email, password }) {
    setIsLoading(true);
    return Auth.authorize(email, password)
      .then((data) => {
        localStorage.setItem("jwt", JSON.stringify(data.token));
        setLoggedIn(true);
        setCurrentUser({
          email: email,
          password: password,
        });
        navigate("/movies");
      })
      .catch((err) => {
        setIsOpen(true);
        setError(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  // Регистрация

  function handleRegister({ name, email, password }) {
    setIsLoading(true);
    return Auth.register(name, email, password)
      .then(() => {
        handleLogin({ email, password });
      })
      .catch((err) => {
        setIsOpen(true);
        setError(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  //Проверка токена

  function handleTokenCheck() {
    const jwt = JSON.parse(localStorage.getItem("jwt"));
    if (jwt) {
      setIsLoading(true);
      Auth.checkToken(jwt)
        .then((res) => {
          if (res) {
            setCurrentUser({
              email: res.email,
            });
            setLoggedIn(true);
            navigate(location);
          }
        })
        .catch((err) => {
          setIsOpen(true);
          setError(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }

  // Обновление данных пользователя

  function handleUpdateUser(userData) {
    setIsLoading(true);
    MainApi.editProfileInfo(userData)
      .then((data) => {
        setCurrentUser(data.user);
        navigate("/profile");
        setIsOpen(true);
        setError(200);
      })
      .catch((err) => {
        setIsOpen(true);
        setError(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  // Выход из аккаунта

  function signOut() {
    localStorage.removeItem("jwt");
    setCurrentUser({
      email: "",
      password: "",
    });
    setLoggedIn(false);
    setSearchedNewMovies([]);
    setSearchedSavedMovies([]);
    setSavedMovies([]);
    localStorage.clear();
    navigate("/", { replace: true });
  }

  // Поиск фильмов

  function filterMovies(moviesArr, shortFilms, name) {
    return moviesArr.filter((movie) => {
      const rusName = movie.nameRU.toLowerCase();
      if (shortFilms) {
        if (
          rusName.includes(name) &&
          movie.duration <= MAX_SHORT_FILM_DURATION
        ) {
          return formatMovieInfo(movie);
        }
      } else {
        if (
          rusName.includes(name) &&
          movie.duration > MAX_SHORT_FILM_DURATION
        ) {
          return formatMovieInfo(movie);
        }
      }
    });
  }

  function searchMovies(
    moviesArr,
    setSearchedMovies,
    isNewMovies,
    name,
    shortFilms
  ) {
    setIsLoading(true);

    const searchedMoviesArr = filterMovies(moviesArr, shortFilms, name);
    setSearchedMovies(searchedMoviesArr);
    if (isNewMovies) {
      setShortNewMovies(shortFilms);
      setInputValueNewMovies(name);
      localStorage.setItem(
        "searchingNewMoviesResults",
        JSON.stringify(searchedMoviesArr)
      );
      localStorage.setItem("shortNewMovies", JSON.stringify(shortFilms));
      localStorage.setItem("inputValueNewMovies", name);
    }

    setIsLoading(false);
  }

  function searchNewMovies(name, shortFilms) {
    searchMovies(moviesFromApi, setSearchedNewMovies, true, name, shortFilms);
  }

  function searchSavedMovies(name, shortFilms) {
    searchMovies(savedMovies, setSearchedSavedMovies, false, name, shortFilms);
  }

  // Добавление фильма в сохранённые

  function handleSaveMovie(movie) {
    setIsLoading(true);
    MainApi.addMovieInApi(formatMovieInfo(movie))
      .then((newMovie) => {
        setSavedMovies([newMovie.movie, ...savedMovies]);
      })
      .catch((err) => {
        setIsOpen(true);
        setError(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  // Удаление фильма из сохранённых

  function deleteMovie(movie, searchedMovies, isDeleteFromSavedMovies) {
    setIsLoading(true);
    MainApi.deleteMovieInApi(movie._id)
      .then((res) => {
        if (isDeleteFromSavedMovies) {
          const moviesArrAfterDelete = searchedMovies.filter(
            (m) => m._id !== movie._id
          );
          setSearchedSavedMovies(moviesArrAfterDelete);
          localStorage.setItem(
            "searchingSavedMoviesResults",
            moviesArrAfterDelete
          );
        }
        setSavedMovies(savedMovies.filter((m) => m._id !== movie._id));
      })
      .catch((err) => {
        setIsOpen(true);
        setError(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function deleteMovieFromMovies(movie) {
    deleteMovie(movie, searchedNewMovies, false);
  }

  function deleteMovieFromSavedMovies(movie) {
    deleteMovie(movie, searchedSavedMovies, true);
  }

  // Закрывает попап с ошибкой

  function handleClosePopup() {
    setIsOpen(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header>
                <UnauthorizedHeader loggedIn={loggedIn} location={location} />
              </Header>
              <Main />
              <Footer />
            </>
          }
        />
        <Route
          path="/movies"
          element={
            <ProtectedRoute loggedIn={loggedIn}>
              <>
                <Header headerClass="_auth">
                  <UnauthorizedHeader loggedIn={loggedIn} pointed="films" location={location} />
                </Header>
                <Movies
                  searchedMovies={searchedNewMovies}
                  savedMovies={savedMovies}
                  searchMovies={searchNewMovies}
                  saveMovie={handleSaveMovie}
                  deleteMovie={deleteMovieFromMovies}
                  shortMovies={shortNewMovies}
                  inputValue={inputValueNewMovies}
                />
                <Footer />
              </>
            </ProtectedRoute>
          }
        />
        <Route
          path="/saved-movies"
          element={
            <ProtectedRoute loggedIn={loggedIn}>
              <>
                <Header headerClass="_auth">
                  <UnauthorizedHeader loggedIn={loggedIn} pointed="saved" location={location} />
                </Header>
                <SavedMovies
                  searchedMovies={searchedSavedMovies}
                  searchMovies={searchSavedMovies}
                  deleteMovie={deleteMovieFromSavedMovies}
                  shortMovies={shortSavedMovies}
                  inputValue={inputValueSavedMovies}
                />
                <Footer />
              </>
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute loggedIn={loggedIn}>
              <>
                <Header headerClass="_auth">
                  <UnauthorizedHeader loggedIn={loggedIn} location={location} />
                </Header>
                <Profile signOut={signOut} />
                <Footer />
              </>
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-profile"
          element={
            <ProtectedRoute loggedIn={loggedIn}>
              <>
                <Header headerClass="_form">
                  <FormHeader greeting="Внесите изменения:" />
                </Header>
                <EditProfile handleUpdateUser={handleUpdateUser} />
              </>
            </ProtectedRoute>
          }
        />
        <Route
          path="/signin"
          element={
            loggedIn ? (
              <Navigate to="/movies" replace />
            ) : (
            <>
              <Header headerClass="_form">
                <FormHeader greeting="Рады видеть!" />
              </Header>
              <Login handleLogin={handleLogin} />
            </>
            )
          }
        />
        <Route
          path="/signup"
          element={
            loggedIn ? (
              <Navigate to="/movies" replace />
            ) : (
            <>
              <Header headerClass="_form">
                <FormHeader greeting="Добро пожаловать!" />
              </Header>
              <Register handleRegister={handleRegister} />
            </>
            )
          }
        />
        <Route
          path="/404"
          element={
            <>
              <Error />
            </>
          }
        />
        <Route
          path={location.pathname}
          element={
            <Navigate to="/404" replace />
          }
        />
      </Routes>

      <Preloader isLoading={isLoading} />

      <ErrorPopup
        isOpen={isOpen}
        onClose={handleClosePopup}
        errorStatus={error}
      />
    </CurrentUserContext.Provider>
  );
}

export default App;
