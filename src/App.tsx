import "./App.css";
import Basket from "./components/basket/basket";
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
        <aside className="rightCollumn">
          <div className="test">test</div>
        </aside>
      </div>
    </>
  );
}

export default App;
