import "./Movies.css";
import {
  MOVIES_IN_ROW,
  NUMBER_OF_MOVIES_PER_PAGE,
} from "../../utils/config";
import { useEffect, useState } from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCard from "../MoviesCard/MoviesCard";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function Movies({
  searchedMovies,
  savedMovies,
  searchMovies,
  saveMovie,
  deleteMovie,
  shortMovies,
  inputValue,
}) {
  const [lastMovie, setLastMovie] = useState(NUMBER_OF_MOVIES_PER_PAGE);
  const [moviesOnPage, setMoviesOnPage] = useState(searchedMovies);

  useEffect(() => {
    setLastMovie(NUMBER_OF_MOVIES_PER_PAGE);
  }, [searchedMovies]);

  useEffect(() => {
    if (
      searchedMovies.length !== 0 &&
      searchedMovies.length <= NUMBER_OF_MOVIES_PER_PAGE
    ) {
      setMoviesOnPage(searchedMovies);
    } else {
      setMoviesOnPage(searchedMovies.slice(0, lastMovie));
    }
  }, [searchedMovies, lastMovie]);

  function addMoreMovie() {
    if (searchedMovies.length >= lastMovie + MOVIES_IN_ROW) {
      setLastMovie(lastMovie + MOVIES_IN_ROW);
    } else {
      setLastMovie(searchMovies.length);
    }
  }

  return (
    <main>
      <SearchForm
        onSubmit={searchMovies}
        inputValue={inputValue}
        shortMovies={shortMovies}
      />
      <section className="movies">
        {searchedMovies.length === 0 ? (
          <p className="movies__text">Фильмы не найдены</p>
        ) : (
          <>
            <MoviesCardList>
              {moviesOnPage.map((movie) => (
                <MoviesCard
                  poster={movie.image}
                  key={movie.movieId}
                  name={movie.nameRU}
                  duration={movie.duration}
                  trailerLink={movie.trailerLink}
                >
                  <button
                    className={`movies__save-button${
                      savedMovies.some((m) => m.movieId === movie.movieId)
                        ? " movies__save-button_saved"
                        : ""
                    }`}
                    onClick={
                      savedMovies.some((m) => m.movieId === movie.movieId)
                        ? () =>
                            deleteMovie(
                              savedMovies.find(
                                (m) => m.movieId === movie.movieId
                              )
                            )
                        : () => saveMovie(movie)
                    }
                  ></button>
                </MoviesCard>
              ))}
            </MoviesCardList>
            {searchedMovies.length > lastMovie ? (
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
