import NavigationBar from "../header/NavigationBar";
import Footer from "../header/footer";
import Header from "../header/header";
import Orderform from "./orderform";

function Delivery() {
  return (
    <>
      <Header />
      <NavigationBar />
      <main>
        <div className="deliveryPage">
          <Orderform />
        </div>

        <aside></aside>
      </main>
      <Footer />
    </>
  );
}

export default Delivery;
