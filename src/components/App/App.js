import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

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

import * as MoviesApi from "../../utils/MoviesApi";
import * as MainApi from "../../utils/MainApi";
import * as Auth from "../../utils/Auth";
import ErrorPopup from "../ErrorPopup/ErrorPopup";
import { errorText } from "../../utils/constants";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);

  const [movies, setMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [moviesFromApi, setMoviesFromApi] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    handleTokenCheck();
  }, []);

  useEffect(() => {
    if (loggedIn) {
      Promise.all([
        MainApi.getUserInfo(),
        MainApi.getSavedMovies(),
        MoviesApi.getMovies(),
      ])
        .then(([userData, savedMovies, moviesFromApi]) => {
          setCurrentUser(userData);
          setSavedMovies(savedMovies.userMovies);
          setMoviesFromApi(moviesFromApi);
        })
        .catch((err) => {
          setIsOpen(true);
          console.log(err);
        });
    }
  }, [loggedIn]);

  function handleLogin({ email, password }) {
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
        console.log(err);
      });
  }

  function handleRegister({ name, email, password }) {
    return Auth.register(name, email, password)
      .then(() => {
        navigate("/signin");
      })
      .catch((err) => {
        setIsOpen(true);
        console.log(err);
      });
  }

  function handleTokenCheck() {
    const jwt = JSON.parse(localStorage.getItem("jwt"));
    if (jwt) {
      Auth.checkToken(jwt)
        .then((res) => {
          if (res) {
            setCurrentUser({
              email: res.email,
            });
            setLoggedIn(true);
          }
        })
        .catch((err) => {
          setIsOpen(true);
          console.log(err);
        });
    }
  }

  function handleUpdateUser(userData) {
    console.log(userData);
    setIsLoading(true);
    MainApi.editProfileInfo(userData)
      .then((data) => {
        setCurrentUser(data);
        navigate("/profile");
      })
      .catch((err) => {
        setIsOpen(true);
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function signOut() {
    localStorage.removeItem("jwt");
    setCurrentUser({
      email: "",
      password: "",
    });
    setLoggedIn(false);
    navigate("/", { replace: true });
  }

  function searchMovies(moviesArr, setArr, name, shortFilms) {
    setIsLoading(true);
    setMovies([]);
    const searchedMovies = moviesArr.filter((movie) => {
      const rusName = movie.nameRU.toLowerCase();
      const engName = movie.nameEN.toLowerCase();
      if (!shortFilms) {
        if (
          (rusName.includes(name) || engName.includes(name)) &&
          movie.duration > 40
        ) {
          return movie;
        }
      } else {
        if (
          (rusName.includes(name) || engName.includes(name)) &&
          movie.duration <= 40
        ) {
          return movie;
        }
      }
    });
    setArr(searchedMovies);
    setIsLoading(false);
  }

  function searchNewMovies(name, shortFilms) {
    searchMovies(moviesFromApi, setMovies, name, shortFilms);
  }

  function searchSavedMovies(name, shortFilms) {
    searchMovies(savedMovies, setSavedMovies, name, shortFilms);
  }

  function handleSaveMovie(movie) {
    MainApi.addMovieInApi({
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
    })
      .then((newMovie) => {
        setSavedMovies([newMovie.movie, ...savedMovies]);
      })
      .catch((err) => {
        setIsOpen(true);
        console.log(err);
      });
  }

  function deleteMovie(movie) {
    MainApi.deleteMovieInApi(movie._id)
      .then((res) => {
        setSavedMovies(savedMovies.filter((m) => m._id !== movie._id));
      })
      .catch((err) => {
        setIsOpen(true);
        console.log(err);
      });
  }

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
                <UnauthorizedHeader />
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
                  <UnauthorizedHeader auth={true} pointed="films" />
                </Header>
                <Movies
                  searchMovies={searchNewMovies}
                  saveMovie={handleSaveMovie}
                  deleteMovie={deleteMovie}
                  movies={movies}
                  savedMovies={savedMovies}
                  isLoading={isLoading}
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
                  <UnauthorizedHeader auth={true} pointed="saved" />
                </Header>
                <SavedMovies
                  searchMovies={searchSavedMovies}
                  deleteMovie={deleteMovie}
                  savedMovies={savedMovies}
                  isLoading={isLoading}
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
                  <UnauthorizedHeader auth={true} />
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
      </Routes>

      <ErrorPopup isOpen={isOpen} onClose={handleClosePopup} />
    </CurrentUserContext.Provider>
  );
}

export default App;
