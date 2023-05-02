import "./SearchForm.css";

function SearchForm() {
  return (
    <form className="search">
      <div className="search__find-film">
        <input
          className="search__text"
          type="text"
          id="find-film"
          placeholder="Фильм"
        />
        <button type="submit" className="search__button">Найти</button>
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
    </form>
  );
}

export default SearchForm;
