import "./Preloader.css";

import preloder from "../../images/preloader.gif";

function Preloader({isLoading}) {
  return (
    <div className={`preloader${isLoading ? " preloader_open" : ""}`}>
      <img src={preloder} alt="preloader" className="preloader_img" />
    </div>
  );
}

export default Preloader;
