import "./SearchForm.css";

function SearchForm() {
  return (
    <section className="search">
      <div className="search__find-film">
        <input
          className="search__text"
          type="text"
          id="find-film"
          placeholder="Фильм"
        />
        <button className="search__button">Найти</button>
      </div>
      <div className="search__short-films">
        <label className="search__label">Короткометражки</label>
        <div className="search__radio">
          <input
            className="search__item"
            id="short-film-of"
            type="radio"
            name="short-films"
          />
          <input
            className="search__item"
            id="short-film-on"
            type="radio"
            name="short-films"
            checked
          />
        </div>
      </div>
    </section>
  );
}

export default SearchForm;
