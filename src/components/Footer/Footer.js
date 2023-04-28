import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__info">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </div>
      <nav className="footer__nav">
        <p className="footer__copy">&copy;Тамара Французова, {new Date().getFullYear()}</p>
        <ul className="footer__links">
          <li className="footer__item">
            <Link
              className="footer__link"
              to="https://practicum.yandex.ru/"
              target="_blank"
            >
              Яндекс.Практикум
            </Link>
          </li>
          <li className="footer__item">
            <Link
              className="footer__link"
              to="https://github.com/FrantsuzovaTamara"
              target="_blank"
            >
              GitHub
            </Link>
          </li>
        </ul>
      </nav>
    </footer>
  );
}

export default Footer;
