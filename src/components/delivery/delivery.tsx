import NavigationBar from "../header/NavigationBar";
import Header from "../header/header";
import Orderform from "./orderform";

function Delivery() {
  return (
    <>
      <Header />
      <NavigationBar />
      <main>
        <Orderform />
      </main>
    </>
  );
}

export default Delivery;
