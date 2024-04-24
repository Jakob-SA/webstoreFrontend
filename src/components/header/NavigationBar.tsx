import { Link, useLocation } from "react-router-dom";
import "./NavigationBar.css";
import { useEffect, useState } from "react";
import { Steps } from "../../steps";

export default function NavigationBar() {
  const location = useLocation();
  const [step, setStep] = useState<Steps>();

  useEffect(() => {
    switch (location.pathname) {
      case "/":
        setStep(Steps.Basket);
        break;
      case "/delivery":
        setStep(Steps.Delivery);
        break;
      case "/confirmation":
        setStep(Steps.Confirmation);
      // Add more cases as needed...
      default:
        setStep(Steps.Basket);
    }
  }, [location.pathname]);

  const decideClass = (thisStep: Steps) => {
    if (step === thisStep) {
      return "active";
    } else if (step && step > thisStep) {
      return "past";
    } else {
      return "future";
    }
  };

  return (
    <nav>
      <ul>
        <li className={decideClass(Steps.Basket)}>
          <Link className="bubble" to="/">
            Basket
          </Link>
        </li>
        <div className={decideClass(Steps.Basket) + "divider"}></div>
        <li className={decideClass(Steps.Delivery)}>
          <Link className="bubble" to="/delivery">
            Delivery
          </Link>
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
