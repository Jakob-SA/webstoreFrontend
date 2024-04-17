import NavigationBar from "../header/NavigationBar";
import Header from "../header/header";
import Orderform from "./orderform";

function Delivery() {
  return (
    <>
      <Header />
      <nav>
        <NavigationBar />
      </nav>
      <main>
        <Orderform />
      </main>
    </>
  );
}

export default Delivery;
