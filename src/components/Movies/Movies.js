import "./Movies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCard from "../MoviesCard/MoviesCard";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function Movies() {
  return (
    <main>
      <SearchForm />
      <section className="movies">
        <MoviesCardList>
          <MoviesCard>
            <button className="movies__save-button"></button>
          </MoviesCard>
          <MoviesCard>
            <button className="movies__save-button"></button>
          </MoviesCard>
          <MoviesCard>
            <button className="movies__save-button"></button>
          </MoviesCard>
          <MoviesCard>
            <button className="movies__save-button"></button>
          </MoviesCard>
        </MoviesCardList>
        <div className="movies__more">
          <button className="movies__add-more-movies-button">Ещё</button>
        </div>
      </section>
    </main>
  );
}

export default Movies;
