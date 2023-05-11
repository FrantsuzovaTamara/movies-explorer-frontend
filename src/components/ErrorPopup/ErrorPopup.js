import "./ErrorPopup.css";

function ErrorPopup({ isOpen, onClose }) {
  return (
    <div className={`popup${isOpen ? " popup_opened" : ""}`}>
      <button
        aria-label="Закрыть"
        type="button"
        className="popup__close-button"
        onClick={onClose}
      ></button>
      <p className="popup__info">
        Во время запроса произошла ошибка. Возможно, проблема с соединением или
        сервер недоступен. Подождите немного и попробуйте ещё раз
      </p>
    </div>
  );
}

export default ErrorPopup;
