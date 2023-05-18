import { NavLink } from "react-router-dom";
import { useState } from "react";
import "./UnauthorizedHeader.css";
import Navigation from "../../Navigation/Navigation";

function UnauthorizedHeader({ pointed, loggedIn, location }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  function openMenu() {
    setIsMenuOpen(!isMenuOpen);
  }

  function closeMenu() {
    setIsMenuOpen(false);
  }

  return (
    <>
      {loggedIn ? (
        <>
          {isMenuOpen && <Navigation closeMenu={closeMenu} />}
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
                  onClick={closeMenu}
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
              className={`header__menu-item${location.pathname === "/" && !isMenuOpen ? " header__menu-item_place_main" : ""}${
                isMenuOpen ? " header__menu-item_opened" : ""
              }`}
            >
              <NavLink
                to="/movies"
                onClick={closeMenu}
                className={
                  pointed === "films"
                    ? `header__menu-link header__menu-link_pointed${location.pathname === "/" && !isMenuOpen ? " header__menu-link_place_main" : ""}`
                    : `header__menu-link${location.pathname === "/" && !isMenuOpen ? " header__menu-link_place_main" : ""}`
                }
              >
                Фильмы
              </NavLink>
            </li>
            <li
              className={`header__menu-item${location.pathname === "/" && !isMenuOpen ? " header__menu-item_place_main" : ""}${
                isMenuOpen ? " header__menu-item_opened" : ""
              }`}
            >
              <NavLink
                to="/saved-movies"
                onClick={closeMenu}
                className={
                  pointed === "saved"
                    ? `header__menu-link header__menu-link_pointed${location.pathname === "/" && !isMenuOpen ? " header__menu-link_place_main" : ""}`
                    : `header__menu-link${location.pathname === "/" && !isMenuOpen ? " header__menu-link_place_main" : ""}`
                }
              >
                Сохранённые фильмы
              </NavLink>
            </li>
          </ul>
          <NavLink
            to="/profile"
            onClick={closeMenu}
            className={`header__account${location.pathname === "/" && !isMenuOpen ? " header__accaunt_place_main" : ""}${
              isMenuOpen ? " header__account_opened" : ""
            }`}
          >
            Аккаунт
            <div className="header__account-icon"></div>
          </NavLink>
          {!isMenuOpen && (
            <button
              className={`header__menu${location.pathname === "/" && !isMenuOpen ? " header__menu_place_main" : ""}${
                isMenuOpen ? " header__menu_opened" : ""
              }`}
              onClick={openMenu}
            ></button>
          )}
        </>
      ) : (
        <nav className="header__entrence">
          <NavLink
            to={"/signup"}
            className="header__button header__button_link_register"
          >
            Регистрация
          </NavLink>
          <NavLink
            to={"/signin"}
            className="header__button header__button_link_login"
          >
            Войти
          </NavLink>
        </nav>
      )}
    </>
  );
}

export default UnauthorizedHeader;
