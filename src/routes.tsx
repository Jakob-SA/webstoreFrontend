import { RouteObject } from "react-router-dom";
import App from "./App";
import Orderform from "./components/checkout/orderform";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/orderform",
    element: <Orderform />,
  },
];
