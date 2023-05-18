import "./MoviesCard.css";
import { NavLink } from "react-router-dom";
import { MINUTES_IN_HOUR } from "../../utils/config";

function MoviesCard({ children, name, duration, poster, trailerLink }) {
  return (
    <li className="movies__card">
      <div className="movies__info">
        <h3 className="movies__name">{name}</h3>
        <p className="movies__duration">
          {duration < MINUTES_IN_HOUR
            ? `${duration} мин`
            : duration % MINUTES_IN_HOUR === 0
            ? `${Math.floor(duration / MINUTES_IN_HOUR)} ч`
            : `${Math.floor(duration / MINUTES_IN_HOUR)} ч ${duration % MINUTES_IN_HOUR} мин`}
        </p>
      </div>
      <NavLink to={trailerLink} target="_blank" className="movies__link">
        <img className="movies__poster" src={poster} alt="Постер фильма" />
      </NavLink>
      {children}
    </li>
  );
}

export default MoviesCard;
