import { RouteObject } from "react-router-dom";
import App from "./App";
import Delivery from "./components/delivery/delivery";
import Confirmation from "./components/confirmationScreen/confirmation";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/delivery",
    element: <Delivery />,
  },
  /*
  {
    path: "/payment",
    element: <Payment />,
  },
  */
  {
    path: "/confirmation",
    element: <Confirmation />,
  },
];
