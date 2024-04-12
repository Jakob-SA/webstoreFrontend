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

/*
export default function NavigationBar() {
    return (
      <div className="checkout-steps">
        <div className="basket">
          <Link to="/">Basket</Link>{" "}
        </div>
        <div className="orderForm">
          <Link to="/orderform">Delivery</Link>
        </div>
      </div>
    );
  }
  */
