import { Link } from "react-router-dom";
import "./Portfolio.css";

function Portfolio() {
  return (
    <section className="portfolio">
      <h3 className="portfolio__title">Портфолио</h3>
      <nav className="portfolio__sites">
        <Link
          className="portfolio__link"
          to="https://frantsuzovatamara.github.io/how-to-learn/"
          target="_blank"
        >
          <p className="portfolio__site">Статичный сайт</p>
          <p className="portfolio__site">↗</p>
        </Link>
        <Link
          className="portfolio__link"
          to="https://frantsuzovatamara.github.io/russian-travel/"
          target="_blank"
        >
          <p className="portfolio__site">Адаптивный сайт</p>
          <p className="portfolio__site">↗</p>
        </Link>
        <Link
          className="portfolio__link"
          to="https://frantsuzovatamara.github.io/react-mesto-auth/"
          target="_blank"
        >
          <p className="portfolio__site">Одностраничное приложение</p>
          <p className="portfolio__site">↗</p>
        </Link>
      </nav>
    </section>
  );
}

export default Portfolio;
