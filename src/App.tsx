import "./App.css";
import Basket from "./components/basket/basket";
import UpsellItem from "./components/basket/upsellItem";
import Header from "./components/header";
import { Suspense, useState } from "react";
import { Steps } from "./steps";
import Orderform from "./components/checkout/orderform";

function App() {
  const [currentStep, setCurrentStep] = useState<Steps>(Steps.Basket);
  if (currentStep === Steps.Basket) {
    return (
      <div>
        <Header />
        <div className="frontPage">
          <Suspense fallback={<div>BASKET HERE</div>}>
            <Basket />
          </Suspense>
          <div className="rightCollumn">
            <UpsellItem />
            <button
              className="checkoutButton"
              onClick={() => {
                alert("are you sure you want to checkout?");
                setCurrentStep(Steps.Checkout);
              }}
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    );
  }
  if (currentStep === Steps.Checkout) {
    return (
      <div>
        <Orderform />
        <button onClick={() => setCurrentStep(Steps.Basket)}>Basket</button>
      </div>
    );
  }
}

export default App;
