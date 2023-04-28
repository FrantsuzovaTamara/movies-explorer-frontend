import "./Navigation.css";

function Navigation({closeMenu}) {
  return (
    <>
      <div class="navigation__background"></div>
      <div class="navigation__popup">
        <button class="navigation__close-popup" onClick={closeMenu}></button>
      </div>
    </>
  );
}

export default Navigation;
