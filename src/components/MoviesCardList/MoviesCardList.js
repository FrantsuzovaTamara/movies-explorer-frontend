import "./MoviesCardList.css";

function MoviesCardList({children}) {
  return (
    <ul className="movies__cards">
      {children}
    </ul>
  );
}

export default MoviesCardList;
