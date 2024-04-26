import "./header.css";

function Header() {
  return (
    <>
      <header>
        <link rel="stylesheet" href="src\index.css" />
        <div>
          <h1>Checkout</h1>
          <a href=".">
            <img
              className="storeLogo"
              src="store-logo.png"
              alt="Store logo"
              width="80rem"
            />
          </a>
        </div>
      </header>
    </>
  );
}
export default Header;
