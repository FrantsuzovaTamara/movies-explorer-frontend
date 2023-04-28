import "./Header.css";
import { NavLink } from "react-router-dom";

function Header({ children, headerClass }) {
  return (
    <header className={"header " + headerClass}>
      <NavLink to="/" className="header__logo"></NavLink>
      {children}
    </header>
  );
}

export default Header;
