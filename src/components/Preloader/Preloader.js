import "./Preloader.css";

import preloder from "../../images/preloader.gif";

function Preloader() {
  return (
    <div className="preloader">
      <img src={preloder} alt="preloader" className="preloader_img" />
    </div>
  );
}

export default Preloader;
