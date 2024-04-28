import React from "react";
import { DispatchShopContext } from "./shopContext";

// Hook to use the dispatch context
export function useDispatchShopContext() {
  const dispatch = React.useContext(DispatchShopContext);
  if (!dispatch) {
    throw new Error(
      "useDispatchShopContext must be used within a ShopContextProvider"
    );
  }
  return dispatch;
}
