import "./Profile.css";
import { NavLink } from "react-router-dom";

function Profile() {
  return (
    <section className="profile">
      <h1 className="profile__greeting">Привет, Тамара!</h1>
      <div className="profile__info">
        <div className="profile__item">Имя</div>
        <div className="profile__item profile__item_meaning">Тамара</div>
      </div>
      <div className="profile__info">
        <div className="profile__item">E-mail</div>
        <div className="profile__item profile__item_meaning">test@mail.ru</div>
      </div>
      <div className="profile__tools">
        <NavLink to="/edit" className="profile__button">Редактировать</NavLink>
        <NavLink to="/" className="profile__button profile__button_exit">
          Выйти из аккаунта
        </NavLink>
      </div>
    </section>
  );
}

export default Profile;
