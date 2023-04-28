import { NavLink } from "react-router-dom";
import Form from "../Form/Form";

function Register() {
  return (
    <Form>
      <label className="form__title">
        Имя
        <input
          className="form__input"
          type="text"
          placeholder="Имя"
          id="profile-name"
        />
        <span className="form__input-error"></span>
      </label>
      <label className="form__title">
        E-mail
        <input
          className="form__input"
          type="url"
          placeholder="E-mail"
          id="email"
        />
        <span className="form__input-error"></span>
      </label>
      <label className="form__title">
        Пароль
        <input
          className="form__input"
          type="password"
          placeholder="Пароль"
          id="password"
        />
        <span className="form__input-error"></span>
      </label>
      <div className="form__buttons">
        <button
          className="form__button form__button_active"
          type="submit"
          disabled
        >
          Зарегистрироваться
        </button>
        <span className="form__text">
          Уже зарегистрированы?{" "}
          <NavLink className="form__link" to="/signin">
            Войти
          </NavLink>
        </span>
      </div>
    </Form>
  );
}

export default Register;
