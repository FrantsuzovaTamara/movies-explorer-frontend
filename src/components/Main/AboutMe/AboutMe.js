import { Link } from "react-router-dom";
import "./AboutMe.css";
import avatar from "../../../images/student__avatar.png";

function AboutMe() {
  return (
    <section className="about-me" id="about-me">
      <h2 className="title title_about-me">Студент</h2>
      <div className="about-me__about">
        <div className="about-me__info">
          <div className="about-me_main-info">
            <h3 className="about-me__name">Тамара</h3>
            <p className="about-me__short-info">Web-разработчик, 26 лет</p>
            <p className="about-me__description">
              Я родилась в Грузии, но большую часть своей жизни прожила в
              России. Сейчас я живу и работаю в Белграде. Я закончила РХТУ им.
              Д.И.Менделеева и работала в области, связанной с химией. Еще в
              университете помимо специальных предметов, связанных с
              программированием и включенных в программу обучения, я просто для
              себя проходила курсы по С++, Python и, конечно, веб-разработке.
              Последняя привлекла меня больше всего, из-за чего я решила
              изменить сферу деятельности и заняться тем, что действительно меня
              интересует.
            </p>
          </div>
          <Link
            className="about-me__github-link"
            to="https://github.com/FrantsuzovaTamara"
            target="_blank"
          >
            GitHub
          </Link>
        </div>
        <img
          src={avatar}
          alt="Фото студента"
          className="about-me__avatar"
        />
      </div>
    </section>
  );
}

export default AboutMe;
