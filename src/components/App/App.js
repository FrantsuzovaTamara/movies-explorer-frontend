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
import Footer from "../Footer/Footer";
import Error from "../Error/Error";

import * as MoviesApi from "../../utils/MoviesApi";
import * as MainApi from "../../utils/MainApi";
import * as Auth from "../../utils/Auth";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState({});
  const [deletedMovie, setDeletedMovie] = useState({});

  const [userData, setUserData] = useState({});

  const [loggedIn, setLoggedIn] = useState(false);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    handleTokenCheck();
  }, []);

  useEffect(() => {
    if (loggedIn) {
      Promise.all([MainApi.getUserInfo(), MainApi.getSavedMovies()])
        .then(([userData, movies]) => {
          setCurrentUser(userData);
          setMovies(movies.movies.reverse());
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn]);

  function handleLogin({ email, password }) {
    return Auth.authorize(email, password)
      .then((data) => {
        localStorage.setItem("jwt", JSON.stringify(data.token));
        setLoggedIn(true);
        setUserData({
          email: email,
          password: password,
        });
        navigate("/movies");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleRegister({ name, email, password }) {
    return Auth.register(name, email, password)
      .then(() => {
        navigate("/signin");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleTokenCheck() {
    const jwt = JSON.parse(localStorage.getItem("jwt"));
    if (jwt) {
      Auth.checkToken(jwt)
        .then((res) => {
          if (res) {
            setUserData({
              email: res.email,
            });
            setLoggedIn(true);
            navigate("/movies", { replace: true });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  function signOut() {
    localStorage.removeItem("jwt");
    setUserData({
      email: "",
      password: "",
    });
    setLoggedIn(false);
    navigate("/", { replace: true });
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
              <Header headerClass="_auth">
                <UnauthorizedHeader auth={true} pointed="films" />
              </Header>
              <Movies />
              <Footer />
            </ProtectedRoute>
          }
        />
        <Route
          path="/saved-movies"
          element={
            <ProtectedRoute loggedIn={loggedIn}>
              <Header headerClass="_auth">
                <UnauthorizedHeader auth={true} pointed="saved" />
              </Header>
              <SavedMovies />
              <Footer />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute loggedIn={loggedIn}>
              <Header headerClass="_auth">
                <UnauthorizedHeader auth={true} />
              </Header>
              <Profile />
              <Footer />
            </ProtectedRoute>
          }
          signOut={signOut}
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
                <Login />
              </>
            )
          }
          handleLogin={handleLogin}
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
                <Register />
              </>
            )
          }
          handleRegister={handleRegister}
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
    </CurrentUserContext.Provider>
  );
}

export default App;
