import "./AboutProject.css";

function AboutProject() {
  return (
    <section className="about-project" id="about">
      <h2 className="title title_about">О проекте</h2>
      <div className="about-project__table">
        <div className="about-project__text">
          <h3 className="about-project__text-title">Дипломный проект включал 5 этапов</h3>
          <p className="about-project__main-text">
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
        </div>
        <div className="about-project__text">
          <h3 className="about-project__text-title">На выполнение диплома ушло 5 недель</h3>
          <p className="about-project__main-text">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </p>
        </div>
      </div>
      <div className="about-project__scales">
        <div className="about-project__scale about-project__scale_green">
          <div className="about-project__week about-project__week_green">1 неделя</div>
          <div className="about-project__subscription">Back-end</div>
        </div>
        <div className="about-project__scale about-project__scale_grey">
          <div className="about-project__week about-project__week_grey">4 недели</div>
          <div className="about-project__subscription">Front-end</div>
        </div>
      </div>
    </section>
  );
}

export default AboutProject;
