import NavigationBar from "../header/NavigationBar";
import Footer from "../header/footer";
import Header from "../header/header";
import OrderConfirmation from "./orderConfirmation";

function Confirmation() {
  return (
    <>
      <Header />
      <NavigationBar />
      <main>
        <div className="order-confirmation-page">
          <OrderConfirmation />
        </div>
      </main>
      <aside></aside>
      <Footer />
    </>
  );
}

export default Confirmation;
