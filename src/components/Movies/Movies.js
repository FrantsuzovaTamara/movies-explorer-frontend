import "./Movies.css";
import { screenWidth } from "../../utils/constants";
import { useEffect, useState } from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCard from "../MoviesCard/MoviesCard";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";

function Movies({ isLading, movies, searchMovies, saveMovie, deleteMovie, savedMovies }) {
  let cardInRow;
  let numberOfMovies;

  if (screenWidth >= 1280) {
    cardInRow = 3;
    numberOfMovies = 12;
  } else if (screenWidth < 1280 && screenWidth >= 761) {
    cardInRow = 2;
    numberOfMovies = 8;
  } else {
    cardInRow = 2;
    numberOfMovies = 5;
  }
  
  const moviesQuantity = movies.length;
  const [lastMovie, setLastMovie] = useState(numberOfMovies);
  const [moviesOnPage, setMoviesOnPage] = useState([]);

  useEffect(() => {
    setLastMovie(numberOfMovies);
  }, [movies]);

  useEffect(() => {
    if (moviesQuantity !== 0 && moviesQuantity <= numberOfMovies) {
      setMoviesOnPage(movies);
    } else if (moviesQuantity >= numberOfMovies) {
      setMoviesOnPage(movies.slice(0, lastMovie));
    }
  }, [movies, lastMovie]);

  function addMoreMovie() {
    if (movies.length >= lastMovie + cardInRow) {
      setLastMovie(lastMovie + cardInRow);
    } else {
      setLastMovie(moviesQuantity);
    }
  }
  
  return (
    <main>
      <SearchForm onSubmit={searchMovies} />
      <section className="movies">
        {isLading ? (
          <Preloader />
        ) : moviesQuantity === 0 ? (
          <p className="movies__text">Фильмы не найдены</p>
        ) : (
          <>
            <MoviesCardList>
              {moviesOnPage.map((movie) => (
                <MoviesCard
                  name={movie.nameRU}
                  duration={movie.duration}
                  poster={`https://api.nomoreparties.co/${movie.image.url}`}
                  key={movie.id}
                >
                  <button
                    className={`movies__save-button${
                      savedMovies.some((m) => m.movieId === movie.id)
                        ? " movies__save-button_saved"
                        : ""
                    }`}
                    onClick={savedMovies.some((m) => m.movieId === movie.id) ? (() => deleteMovie(savedMovies.find((m) => m.movieId === movie.id))) : (() => saveMovie(movie))}
                  ></button>
                </MoviesCard>
              ))}
            </MoviesCardList>
            {moviesQuantity > lastMovie ? (
              <div className="movies__more">
                <button
                  className="movies__add-more-movies-button"
                  onClick={addMoreMovie}
                >
                  Ещё
                </button>
              </div>
            ) : (
              <></>
            )}
          </>
        )}
      </section>
    </main>
  );
}

export default Movies;
