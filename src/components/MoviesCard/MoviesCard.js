import "./MoviesCard.css";

function MoviesCard({children, name, duration, poster}) {
  return (
    <li className="movies__card">
      <div className="movies__info">
        <h3 className="movies__name">{name}</h3>
        <p className="movies__duration">{duration < 60 ? `${duration} мин` : (duration % 60 === 0) ? `${Math.floor(duration / 60)} ч` : `${Math.floor(duration / 60)} ч ${duration % 60} мин`}</p>
      </div>
      <img className="movies__poster" src={poster} alt="Постер фильма" />
      {children}
    </li>
  );
}

export default MoviesCard;
