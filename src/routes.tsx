import { RouteObject } from "react-router-dom";
import App from "./App";
import Orderform from "./components/checkout/orderform";
import { TermsAndConditions } from "./components/checkout/termsAndConditions";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/orderform",
    element: <Orderform />,
  },
  {
    path: "/terms-and-conditions",
    element: <TermsAndConditions />,
  },
];
