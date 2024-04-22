import NavigationBar from "../header/NavigationBar";
import Footer from "../header/footer";
import Header from "../header/header";
import Orderform from "./orderform";

function Delivery() {
  return (
    <>
      <Header />
      <NavigationBar />
      <div className="deliveryPage">
        <main>
          <Orderform />
        </main>
        <aside></aside>
      </div>
      <Footer />
    </>
  );
}

export default Delivery;
