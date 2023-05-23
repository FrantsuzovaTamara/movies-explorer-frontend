import "./Error.css";
import { NavLink } from "react-router-dom";

function Error() {
  return (
    <div className="error">
        <div className="error__text">
            <h1 className="error__number">404</h1>
            <p className="error__explanation">Страница не найдена</p>
        </div>
        <NavLink to="/movies-explorer-frontend/" className="error__link">Назад</NavLink>
    </div>
  );
}

export default Error;