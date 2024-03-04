import "./App.css";
import Basket from "./assets/scripts/basket";
import { useState } from "react";
import { Steps } from "./Steps";
import Orderform from "./assets/scripts/orderform";

function App() {
  const [currentStep, setCurrentStep] = useState<Steps>(Steps.Basket);
  if (currentStep === Steps.Basket) {
    return (
      <div>
        <Basket />
        <button onClick={() => setCurrentStep(Steps.Checkout)}>Checkout</button>
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
