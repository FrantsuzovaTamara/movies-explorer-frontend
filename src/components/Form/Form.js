import "./Form.css";
import { useState } from "react";
import FormValidator from "../../utils/FormValidators";
import { NavLink } from "react-router-dom";

function Form({ buttonText, textUnderButton, linkText, link }) {
  const [formValues, setFormValues] = useState([]);

  const { errors, isValid, handleChange } = FormValidator({});

  const handleChangeValue = (e) => {
    const { name, value } = e.target;
    handleChange(e, ".form");

    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  return (
    <form className="form" noValidate>
      {buttonText === "Зарегистрироваться" && (
        <label className="form__title">
          Имя
          <input
            id="name"
            type="text"
            name="name"
            minLength="2"
            maxLength="30"
            className={`form__input${
              errors.name ? " form__input_type_error" : ""
            }`}
            placeholder="Имя"
            value={formValues.name || ""}
            onChange={handleChangeValue}
            required
          />
          <span
            className={`form__input-error${
              errors.name ? " form__input-error_active" : ""
            }`}
          ></span>
        </label>
      )}
      <label className="form__title">
        E-mail
        <input
          id="email"
          type="email"
          name="email"
          className={`form__input${
            errors.email ? " form__input_type_error" : ""
          }`}
          placeholder="E-mail"
          value={formValues.email || ""}
          onChange={handleChangeValue}
          required
        />
        <span
          className={`form__input-error${
            errors.email ? " form__input-error_active" : ""
          }`}
        >
          {errors.email}
        </span>
      </label>
      <label className="form__title">
        Пароль
        <input
          id="password"
          type="password"
          name="password"
          minLength="6"
          maxLength="30"
          className={`form__input${
            errors.password ? " form__input_type_error" : ""
          }`}
          placeholder="Пароль"
          value={formValues.password || ""}
          onChange={handleChangeValue}
          required
        />
        <span
          className={`form__input-error${
            errors.password ? " form__input-error_active" : ""
          }`}
        >
          {errors.password}
        </span>
      </label>
      <div
        className={
          buttonText === "Зарегистрироваться"
            ? "form__buttons form__buttons_link_register"
            : "form__buttons form__buttons_link_login"
        }
      >
        <button
          className={`form__button${isValid ? " form__button_active" : ""}`}
          type="submit"
          disabled={!isValid}
        >
          {buttonText}
        </button>
        <span className="form__text">
          {textUnderButton}{" "}
          <NavLink className="form__link" to={link}>
            {linkText}
          </NavLink>
        </span>
      </div>
    </form>
  );
}

export default Form;
