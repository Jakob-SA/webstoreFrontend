import { Link, useLocation } from "react-router-dom";
import "./NavigationBar.css";
import { useEffect, useState } from "react";
import { Steps } from "../../steps";

export default function NavigationBar() {
  const location = useLocation();
  const [step, setStep] = useState<Steps>();

  useEffect(() => {
    console.log(location.pathname);
    switch (location.pathname) {
      case "/":
        setStep(Steps.Basket);
        break;
      case "/delivery":
        setStep(Steps.Delivery);
        break;
      case "/confirmation":
        setStep(Steps.Confirmation);
        break;
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
    } else if (step && step === thisStep - 1) {
      return "previous";
    } else {
      return "future";
    }
  };

  return (
    <nav>
      <ul>
        <li className={decideClass(Steps.Basket)}>
          <p className="bubble">Basket</p>
        </li>
        <div className={decideClass(Steps.Basket) + "divider"}></div>
        <li className={decideClass(Steps.Delivery)}>
          <p className="bubble">Delivery</p>
        </li>
        <div className={decideClass(Steps.Delivery) + "divider"}></div>
        <li className={decideClass(Steps.Confirmation)}>
          <Link className="bubble" to="/confirmation">
            Confirmation
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
