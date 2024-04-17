import "./App.css";
import Basket from "./components/basket/basket";
import UpsellItem from "./components/basket/upsellItem";
import Header from "./components/header/header";
import NavigationBar from "./components/header/NavigationBar";

function App() {
  return (
    <>
      <NavigationBar />
      <div>
        <Header />
        <div className="frontPage">
          <Basket />
          <div className="rightCollumn">
            <UpsellItem />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
