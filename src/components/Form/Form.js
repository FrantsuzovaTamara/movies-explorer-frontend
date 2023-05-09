import { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Form.css";
import FormValidator from "../../utils/FormValidators";

function Form({
  buttonText,
  textUnderButton,
  linkText,
  link,
  onSubmit,
  form,
  userName,
  userEmail,
  handleChangeName,
  handleChangeEmail,
}) {
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

  function submitForm(e) {
    e.preventDefault();
    onSubmit(formValues);
  }

  return (
    <form className="form" onSubmit={submitForm} noValidate>
      {(form === "register" || form === "edit") && (
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
            value={form === "edit" ? userName || "" : formValues.name || ""}
            onChange={form === "edit" ? handleChangeName : handleChangeValue}
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
          value={form === "edit" ? userEmail || "" : formValues.email || ""}
          onChange={form === "edit" ? handleChangeEmail : handleChangeValue}
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
      {(form === "register" || form === "login") && (
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
      )}
      <div
        className={
          form === "register"
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
