import "./Profile.css";
import { NavLink } from "react-router-dom";
import { CurrentUserContext } from '../../context/CurrentUserContext';
import { useContext } from "react";

function Profile({ signOut }) {
  const currentUser = useContext(CurrentUserContext).user;

  return (
    <section className="profile">
      <h1 className="profile__greeting">Привет, {currentUser.name}</h1>
      <div className="profile__info">
        <div className="profile__item">Имя</div>
        <div className="profile__item profile__item_meaning">{currentUser.name}</div>
      </div>
      <div className="profile__info">
        <div className="profile__item">E-mail</div>
        <div className="profile__item profile__item_meaning">{currentUser.email}</div>
      </div>
      <div className="profile__tools">
        <NavLink to="/edit-profile" className="profile__button">
          Редактировать
        </NavLink>
        <button className="profile__button profile__button_exit" onClick={signOut}>
          Выйти из аккаунта
        </button>
      </div>
    </section>
  );
}

export default Profile;
