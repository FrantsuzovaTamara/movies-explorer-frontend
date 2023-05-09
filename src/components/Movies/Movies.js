import "./Movies.css";
import { useEffect, useState, useContext } from "react";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCard from "../MoviesCard/MoviesCard";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";

function Movies({ isLading, movies, searchMovies, saveMovie, savedMovies }) {
  const moviesQuantity = movies.length;
  const [lastMovie, setLastMovie] = useState(12);
  const [moviesOnPage, setMoviesOnPage] = useState([]);
  const userData = useContext(CurrentUserContext);
  /* const isSaved = savedMovies.owner.some(i => i === ); */
  const isSaved = false;
  
  useEffect(() => {
    setLastMovie(12);
  }, [movies]);

  useEffect(() => {
    if (moviesQuantity !== 0 && moviesQuantity < 13) {
      setMoviesOnPage(movies);
    } else if (moviesQuantity > 11) {
      setMoviesOnPage(movies.slice(0, lastMovie));
    }
  }, [movies, lastMovie]);

  function addMoreMovie() {
    if (movies.length >= lastMovie + 3) {
      setLastMovie(lastMovie + 3);
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
                  poster={movie.image.url}
                  key={movie.id}
                >
                  <button className={`movies__save-button${isSaved ? " movies__save-button_saved" : ""}`} onClick={saveMovie(movie)}></button>
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
