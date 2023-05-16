import "./ErrorPopup.css";
import {
  VALID_ERR_MESSAGE,
  CONFL_ERR_MESSAGE,
  NOT_FOUND_ERR_MESSAGE,
  UNAUTH_ERR_MESSAGE,
  FORBID_ERR_MESSAGE,
  MAIN_ERR_MESSAGE,
} from "../../utils/constants";

function ErrorPopup({ isOpen, onClose, errorStatus }) {
  let errorText;

  switch (errorStatus) {
    case 404:
      errorText = NOT_FOUND_ERR_MESSAGE;
      break;
    case 401:
      errorText = UNAUTH_ERR_MESSAGE;
      break;
    case 409:
      errorText = CONFL_ERR_MESSAGE;
      break;
    case 403:
      errorText = FORBID_ERR_MESSAGE;
      break;
    case 400:
      errorText = VALID_ERR_MESSAGE;
      break;
    default:
      errorText = MAIN_ERR_MESSAGE;
  }

  return (
    <div className={`popup${isOpen ? " popup_opened" : ""}`}>
      <button
        aria-label="Закрыть"
        type="button"
        className="popup__close-button"
        onClick={onClose}
      ></button>
      <p className="popup__info">{errorText}</p>
    </div>
  );
}

export default ErrorPopup;
