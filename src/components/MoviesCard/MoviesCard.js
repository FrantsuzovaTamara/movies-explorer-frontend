import "./MoviesCard.css";

function MoviesCard({children, name, duration, poster, id}) {
  return (
    <li className="movies__card" id={id}>
      <div className="movies__info">
        <h3 className="movies__name">{name}</h3>
        <p className="movies__duration">{duration} минут</p>
      </div>
      <img className="movies__poster" src={`https://api.nomoreparties.co/${poster}`} alt="Постер фильма" />
      {children}
    </li>
  );
}

export default MoviesCard;
