import "./header.css";

function Header() {
  return (
    <header>
      <div className="header">
        <h1>Checkout</h1>
        <a href=".">
          <img
            className="storeLogo"
            src="store-logo.png"
            alt="Store logo"
            width="150em"
          />
        </a>
      </div>
      <h2>My Cart</h2>
    </header>
  );
}
export default Header;
