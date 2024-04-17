import "./App.css";
import Basket from "./components/basket/basket";
import UpsellItem from "./components/basket/upsellItem";
import Header from "./components/header/header";
import NavigationBar from "./components/header/NavigationBar";

function App() {
  return (
    <>
      <Header />
      <nav>
        <NavigationBar />
      </nav>
      <main>
        <Basket />
        <aside className="rightCollumn">
          <UpsellItem />
        </aside>
      </main>
    </>
  );
}

export default App;
