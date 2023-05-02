import "./SavedMovies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCard from "../MoviesCard/MoviesCard";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function SavedMovies() {
  return (
    <main>
      <SearchForm />
      <section className="saved-movies">
        <MoviesCardList>
          <MoviesCard>
            <button className="saved-movies__delete-button"></button>
          </MoviesCard>
          <MoviesCard>
            <button className="saved-movies__delete-button"></button>
          </MoviesCard>
          <MoviesCard>
            <button className="saved-movies__delete-button"></button>
          </MoviesCard>
        </MoviesCardList>
      </section>
    </main>
  )
}

export default SavedMovies;