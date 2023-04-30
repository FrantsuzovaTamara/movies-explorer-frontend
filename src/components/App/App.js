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

import React from "react";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
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
            <>
              <Header headerClass="_auth">
                <UnauthorizedHeader auth={true} pointed="films" />
              </Header>
              <Movies />
              <Footer />
            </>
          }
        />
        <Route
          path="/saved-movies"
          element={
            <>
              <Header headerClass="_auth">
                <UnauthorizedHeader auth={true} pointed="saved" />
              </Header>
              <SavedMovies />
              <Footer />
            </>
          }
        />
        <Route
          path="/profile"
          element={
            <>
              <Header headerClass="_auth">
                <UnauthorizedHeader auth={true} />
              </Header>
              <Profile />
              <Footer />
            </>
          }
        />
        <Route
          path="/signin"
          element={
            <>
              <Header headerClass="_form">
                <FormHeader greeting="Рады видеть!" />
              </Header>
              <Login />
            </>
          }
        />
        <Route
          path="/signup"
          element={
            <>
              <Header headerClass="_form">
                <FormHeader greeting="Добро пожаловать!" />
              </Header>
              <Register />
            </>
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
    </>
  );
}

export default App;
