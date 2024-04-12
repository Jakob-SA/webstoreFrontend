import "./App.css";
import Basket from "./components/basket/basket";
import UpsellItem from "./components/basket/upsellItem";
import Header from "./components/header";
import { Suspense, useState } from "react";
import Orderform from "./components/checkout/orderform";
import NavigationBar from "./NavigationBar";

function App() {
  return (
    <>
      <NavigationBar />
      <div>
        <Header />
        <div className="frontPage">
          <Suspense fallback={<div>BASKET HERE</div>}>
            <Basket />
          </Suspense>
          <div className="rightCollumn">
            <UpsellItem />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
