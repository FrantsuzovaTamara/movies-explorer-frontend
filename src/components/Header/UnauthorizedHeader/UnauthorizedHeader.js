import { NavLink } from "react-router-dom";
import { useState } from "react";
import "./UnauthorizedHeader.css";
import Navigation from "../../Navigation/Navigation";

function UnauthorizedHeader({ auth, pointed }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  console.log(isMenuOpen);

  function openMenu() {
    setIsMenuOpen(!isMenuOpen);
    console.log(isMenuOpen);
  }

  return (
    <>
      {auth ? (
        <>
          {isMenuOpen && <Navigation closeMenu={openMenu} />}
          <ul
            className={`header__menu-items ${
              isMenuOpen ? "header__menu-items_opened" : ""
            }`}
          >
            {isMenuOpen && (
              <li
                className={`header__menu-item ${
                  isMenuOpen ? "header__menu-item_opened" : ""
                }`}
              >
                <NavLink
                  to="/"
                  onClick={openMenu}
                  className={
                    pointed === "films"
                      ? "header__menu-link header__menu-link_pointed"
                      : "header__menu-link"
                  }
                >
                  Главная
                </NavLink>
              </li>
            )}
            <li
              className={`header__menu-item ${
                isMenuOpen ? "header__menu-item_opened" : ""
              }`}
            >
              <NavLink
                to="/movies"
                onClick={openMenu}
                className={
                  pointed === "films"
                    ? "header__menu-link header__menu-link_pointed"
                    : "header__menu-link"
                }
              >
                Фильмы
              </NavLink>
            </li>
            <li
              className={`header__menu-item ${
                isMenuOpen ? "header__menu-item_opened" : ""
              }`}
            >
              <NavLink
                to="/saved-movies"
                onClick={openMenu}
                className={
                  pointed === "saved"
                    ? "header__menu-link header__menu-link_pointed"
                    : "header__menu-link"
                }
              >
                Сохранённые фильмы
              </NavLink>
            </li>
          </ul>
          <NavLink
            to="/profile"
            className={`header__account ${
              isMenuOpen ? "header__account_opened" : ""
            }`}
          >
            Аккаунт
            <div className="header__account-icon"></div>
          </NavLink>
          {!isMenuOpen && (
            <button
              className={`header__menu ${
                isMenuOpen ? "header__menu_opened" : ""
              }`}
              onClick={openMenu}
            ></button>
          )}
        </>
      ) : (
        <nav className="header__entrence">
          <NavLink to="/signup" className="header__button header__button_reg">
            Регистрация
          </NavLink>
          <NavLink to="/signin" className="header__button header__button_enter">
            Войти
          </NavLink>
        </nav>
      )}
    </>
  );
}

export default UnauthorizedHeader;
