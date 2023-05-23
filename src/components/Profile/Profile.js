import "./Profile.css";
import { NavLink } from "react-router-dom";
import { CurrentUserContext } from '../../context/CurrentUserContext';
import { useContext, useEffect, useState } from "react";

function Profile({ signOut }) {
  const currentUser = useContext(CurrentUserContext);
  const [currentUserName, setCurrentUserName] = useState(currentUser.name);
  const [currentUserEmail, setCurrentUserEmail] = useState(currentUser.email);
  
  useEffect(() => {
    setCurrentUserName(currentUser.name);
    setCurrentUserEmail(currentUser.email)
  }, [currentUser])

  return (
    <section className="profile">
      <h1 className="profile__greeting">Привет, {currentUserName}</h1>
      <div className="profile__info">
        <div className="profile__item">Имя</div>
        <div className="profile__item profile__item_meaning">{currentUserName}</div>
      </div>
      <div className="profile__info">
        <div className="profile__item">E-mail</div>
        <div className="profile__item profile__item_meaning">{currentUserEmail}</div>
      </div>
      <div className="profile__tools">
        <NavLink to="/movies-explorer-frontend/edit-profile" className="profile__button">
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
