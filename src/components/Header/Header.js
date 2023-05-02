import "./Header.css";
import { NavLink } from "react-router-dom";

function Header({ children, headerClass }) {
  return (
    <header className={headerClass ? `header header${headerClass}` : "header"}>
      <div className={headerClass ? `header__content header__content${headerClass}` : "header__content"}>
        <NavLink to="/" className="header__logo"></NavLink>
        {children}
      </div>
    </header>
  );
}

export default Header;
