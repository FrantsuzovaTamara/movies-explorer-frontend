import "./SavedMovies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCard from "../MoviesCard/MoviesCard";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";

function SavedMovies({ isLoading, savedMovies, deleteMovie, searchMovies }) {
  const savedMoviesQuantity = savedMovies.length;

  return (
    <main>
      <SearchForm onSubmit={searchMovies} />
      <section className="saved-movies">
        {isLoading ? (
          <Preloader />
        ) : savedMoviesQuantity === 0 ? (
          <p className="saved-movies__text">Фильмы не найдены</p>
        ) : (
          <>
            <MoviesCardList>
              {savedMovies.map((savedMovie) => (
                <MoviesCard
                  name={savedMovie.nameRU}
                  duration={savedMovie.duration}
                  poster={savedMovie.image}
                  key={savedMovie.movieId}
                >
                  <button className="saved-movies__delete-button" onClick={() => deleteMovie(savedMovie)}></button>
                </MoviesCard>
              ))}
            </MoviesCardList>
          </>
        )}
      </section>
    </main>
  );
}

export default SavedMovies;
