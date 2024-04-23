import { Link, useLocation } from "react-router-dom";
import "./NavigationBar.css";

export default function NavigationBar() {
  const location = useLocation();

  return (
    <nav>
      <ul>
        <li
          className={
            location.pathname === "/"
              ? "active"
              : location.pathname === "/delivery"
              ? "past"
              : ""
          }
        >
          <Link to="/">Basket</Link>
        </li>
        <li className={location.pathname === "/delivery" ? "active" : ""}>
          <Link to="/delivery">Delivery</Link>
        </li>
      </ul>
    </nav>
  );
}

/*
import { Link } from "react-router-dom";

export default function NavigationBar() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Basket</Link>
        </li>
        <li>
          <Link to="/orderform">Delivery</Link>
        </li>
      </ul>
    </nav>
  );
}
*/
