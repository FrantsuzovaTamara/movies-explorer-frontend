import "./MoviesCard.css";
import poster from "../../images/film_poster.png";

function MoviesCard({children}) {
  return (
    <li className="movies__card">
      <div className="movies__info">
        <h3 className="movies__name">В погоне за Бенкси</h3>
        <p className="movies__duration">27 минут</p>
      </div>
      <img className="movies__poster" src={poster} alt="Постер фильма" />
      {children}
    </li>
  );
}

export default MoviesCard;
