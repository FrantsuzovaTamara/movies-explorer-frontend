import "./MoviesCardList.css";

function MoviesCardList({children}) {
  return (
    <ul class="movies__cards">
      {children}
    </ul>
  );
}

export default MoviesCardList;
