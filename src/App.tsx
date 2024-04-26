import "./App.css";
import Basket from "./components/basket/basket";
import OrderSummary from "./components/basket/orderSummary";
import UpsellItem from "./components/basket/upsellItem";
import Footer from "./components/header/footer";
import Header from "./components/header/header";
import NavigationBar from "./components/header/NavigationBar";

function App() {
  return (
    <>
      <Header />
      <NavigationBar />
      <main>
        <div className="frontPage">
          <Basket />
        </div>
        <aside>
          <UpsellItem />
          <OrderSummary />
        </aside>
      </main>
      <Footer />
    </>
  );
}

export default App;
