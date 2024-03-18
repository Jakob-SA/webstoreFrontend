import "./App.css";
import Basket from "./components/basket/basket";
import UpsellItem from "./components/basket/upsellItem";
import Header from "./components/header";
import { useState } from "react";
import { Steps } from "./Steps";
import Orderform from "./components/checkout/orderform";

function App() {
  const [currentStep, setCurrentStep] = useState<Steps>(Steps.Basket);
  if (currentStep === Steps.Basket) {
    return (
      <div>
        <Header />
        <div className="frontPage">
          <Basket />
          <div className="rightCollumn">
            <UpsellItem />
            <button onClick={() => setCurrentStep(Steps.Checkout)}>
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
        <button onClick={() => setCurrentStep(Steps.Basket)}>Checkout</button>
      </div>
    );
  }
}

export default App;
