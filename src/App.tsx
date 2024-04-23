import "./App.css";
import Basket from "./components/basket/basket";
import OrderSummary from "./components/basket/orderSummary";
import UpsellItem from "./components/basket/upsellItem";
import Footer from "./components/header/footer";
import Header from "./components/header/header";
import NavigationBar from "./components/header/NavigationBar";
import { ShopContextProvider } from "./contexts/shopContext";

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
      <Footer />
    </>
  );
}

export default App;
