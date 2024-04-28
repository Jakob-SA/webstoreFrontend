import React from "react";
import { ShopContext } from "./shopContext";

//Hook to use the shop context
export function useShopContext() {
  const context = React.useContext(ShopContext);
  if (!context) {
    throw new Error("useShopContext must be used within a ShopContextProvider");
  }
  return context;
}
