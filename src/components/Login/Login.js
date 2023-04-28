import { NavLink } from "react-router-dom";
import Form from "../Form/Form";

function Login() {
  return (
    <Form>
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
          className="form__input form__input_error"
          type="password"
          placeholder="Пароль"
          id="password"
        />
        <span className="form__input-error form__input-error_active"></span>
      </label>
      <div className="form__buttons">
        <button
          className="form__button"
          type="submit"
          disabled
        >
          Войти
        </button>
        <span className="form__text">
          Ещё не зарегистрированы?{" "}
          <NavLink className="form__link" to="/signup">
            Регистрация
          </NavLink>
        </span>
      </div>
    </Form>
  );
}

export default Login;
