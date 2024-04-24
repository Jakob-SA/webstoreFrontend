import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { routes } from "./routes.tsx";
import {ShopContextProvider} from "./contexts/shopContext";

const router = createBrowserRouter(routes);
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ShopContextProvider>
    <RouterProvider router={router} />
    </ShopContextProvider>
  </React.StrictMode>
);
