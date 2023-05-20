import "./SavedMovies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCard from "../MoviesCard/MoviesCard";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function SavedMovies({
  searchedMovies,
  deleteMovie,
  searchMovies,
  shortMovies,
  inputValue,
}) {
  return (
    <main>
      <SearchForm
        onSubmit={searchMovies}
        inputValue={inputValue}
        shortMovies={shortMovies}
      />
      <section className="saved-movies">
        {searchedMovies.length === 0 ? (
          <p className="saved-movies__text">Фильмы не найдены</p>
        ) : (
          <>
            <MoviesCardList>
              {searchedMovies.map((movie) => (
                <MoviesCard
                  name={movie.nameRU}
                  duration={movie.duration}
                  poster={movie.image}
                  trailerLink={movie.trailerLink}
                  key={movie.movieId}
                >
                  <button
                    className="saved-movies__delete-button"
                    onClick={() => deleteMovie(movie)}
                  ></button>
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
