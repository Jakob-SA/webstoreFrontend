import { RouteObject } from "react-router-dom";
import App from "./App";
import Delivery from "./components/delivery/delivery";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/delivery",
    element: <Delivery />,
  },
];
