import "./App.css";
import Basket from "./components/basket/basket";
import OrderSummary from "./components/basket/orderSummary";
import UpsellItem from "./components/basket/upsellItem";
import Header from "./components/header/header";
import NavigationBar from "./components/header/NavigationBar";

function App() {
  return (
    <>
      <Header />
      <NavigationBar />
      <div className="frontPage">
        <main>
          <Basket />
        </main>
        <aside>
          <UpsellItem />
          <OrderSummary />
        </aside>
      </div>
    </>
  );
}

export default App;
