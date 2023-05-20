import "./SearchForm.css";
import { useState, useEffect } from "react";

function SearchForm({ onSubmit, shortMovies, inputValue }) {
  const [formValue, setFormValue] = useState(inputValue);
  const [shortFilms, setShortFilms] = useState(shortMovies);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    formValue.length !== 0 &&
    (formValue !== inputValue || shortFilms !== shortMovies)
      ? setIsValid(true)
      : setIsValid(false);
  }, [formValue, shortFilms]);

  const handleChangeValue = (e) => {
    const value = e.target.value;
    setFormValue(value);
  };

  function handleChangeShortFilms(e) {
    if (e.target.id === "off") {
      setShortFilms(false);
    } else {
      setShortFilms(true);
    }
  }

  function submitForm(e) {
    e.preventDefault();
    onSubmit(formValue.toLowerCase(), shortFilms);
  }
  
  return (
    <form className="search" onSubmit={submitForm}>
      <div className="search__find-film">
        <input
          minLength="1"
          name="movie"
          className="search__text"
          type="text"
          id="find-film"
          placeholder="Фильм"
          value={formValue || ""}
          onChange={handleChangeValue}
        />
        <button
          className={`search__button${isValid ? " search__button_active" : ""}`}
          type="submit"
          disabled={!isValid}
        >
          Найти
        </button>
      </div>
      <div className="search__short-films">
        <label className="search__label">Короткометражки</label>
        <div className="search__radio">
          <input
            className="search__item"
            id="off"
            type="radio"
            name="short-films"
            onClick={handleChangeShortFilms}
            defaultChecked={shortFilms ? false : true}
          />
          <input
            className="search__item"
            id="on"
            type="radio"
            name="short-films"
            onClick={handleChangeShortFilms}
            defaultChecked={shortFilms ? true : false}
          />
        </div>
      </div>
    </form>
  );
}

export default SearchForm;
