import "./SearchForm.css";
import { useState } from "react";
import FormValidator from "../../utils/FormValidators";

function SearchForm({ onSubmit }) {
  const [formValues, setFormValues] = useState([]);
  const [shortFilms, setShortFilms] = useState(false);

  const { isValid, handleChange } = FormValidator({});

  const handleChangeValue = (e) => {
    const { name, value } = e.target;
    handleChange(e, ".search");

    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  function handleChangeShortFilms(e) {
    console.log(e.target.id, shortFilms)
    if (e.target.id === "off") {
      setShortFilms(false)
    } else {
      setShortFilms(true)
    }
    console.log(e.target.id, shortFilms)
  }

  function submitForm(e) {
    e.preventDefault();
    onSubmit(formValues.movie.toLowerCase(), shortFilms);
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
          value={formValues.movie || ""}
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
            defaultChecked={true}
          />
          <input
            className="search__item"
            id="on"
            type="radio"
            name="short-films"
            onClick={handleChangeShortFilms}
          />
        </div>
      </div>
    </form>
  );
}

export default SearchForm;
