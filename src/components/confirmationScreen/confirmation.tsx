import NavigationBar from "../header/NavigationBar";
import Footer from "../header/footer";
import Header from "../header/header";
import OrderConfirmation from "./orderConfirmation";

function Confirmation() {
  const orderNumber = generateOrderNumber();

  return (
    <>
      <Header />
      <NavigationBar />
      <main>
        <div className="order-confirmation-page">
          <OrderConfirmation orderNumber={orderNumber} />
        </div>
      </main>
      <aside></aside>
      <Footer />
    </>
  );
}

function generateOrderNumber() {
  return Math.floor(Math.random() * 10000) + 1;
}

export default Confirmation;
