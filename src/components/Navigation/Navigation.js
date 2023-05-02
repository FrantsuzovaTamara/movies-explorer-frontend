import "./Navigation.css";

function Navigation({closeMenu}) {
  return (
    <>
      <div className="navigation__background"></div>
      <div className="navigation__popup">
        <button className="navigation__close-popup" onClick={closeMenu}></button>
      </div>
    </>
  );
}

export default Navigation;
