import "./header.css";

function Header() {
  return (
    <>
      <header>
        <div>
          <h1>Checkout</h1>
          <a href=".">
            <img
              className="storeLogo"
              src="store-logo.png"
              alt="Store logo"
              height="40rem"
            />
          </a>
        </div>
      </header>
    </>
  );
}
export default Header;
