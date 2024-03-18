import "./header.css";

function Header() {
  return (
    <header>
      <div className="header">
        <h1>Checkout</h1>
        <img
          className="storeLogo"
          src="store-logo.png"
          alt="Store logo"
          width="150em"
        />
      </div>
      <h2> Basket</h2>
    </header>
  );
}
export default Header;
