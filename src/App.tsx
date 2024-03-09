import "./App.css";
import Basket from "./assets/scripts/basket";
import UpsellItem from "./assets/scripts/upsellItem";
import Header from "./assets/scripts/header";

function App() {
  return (
    <div>
      <Header />
      <div className="frontPage">
        <Basket />
        <UpsellItem />
      </div>
    </div>
  );
}

export default App;
