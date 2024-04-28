import React, { useReducer, useEffect } from "react";
import { Product, fetchProducts } from "../components/basket/product";

//productLine type
export interface ProductLine {
  product: Product;
  quantity: number;
  totalLinePrice: number;
  rebatePercent: number;
  giftwrapping: boolean;
}

//type of state
interface ShopState {
  products: Product[];
  basketLines: ProductLine[];
}

//inital state
const initialState: ShopState = {
  products: [],
  basketLines: [],
};

// Type of actions
type ShopAction =
  | { type: "SET_PRODUCTS"; products: Product[] }
  | { type: "SET_BASKET_ITEMS"; basketLines: Product[] }
  | { type: "REMOVE_FROM_BASKET"; productId: number }
  | { type: "UPDATE_ITEM_QUANTITY"; productId: number; quantity: number }
  | { type: "UPDATE_GIFTWRAPPING"; productId: number; giftwrapping: boolean };

// Move the declarations outside of the switch case block
const indices = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]; //indices of items to select. might need later.
const shuffledIndices = [...indices].sort(() => Math.random() - 0.5);
const usedIndices = shuffledIndices.slice(0, 7); //selects 7 random indices from the shuffled indices.

//Reducer. co pilot helped here.
//We should not declare consts inside the switch case block.
function shopReducer(state: ShopState, action: ShopAction): ShopState {
  switch (action.type) {
    case "SET_PRODUCTS":
      return { ...state, products: action.products };

    case "SET_BASKET_ITEMS":
      return {
        ...state,
        basketLines: usedIndices.map((item) => ({
          product: state.products[item],
          quantity: 1,
          totalLinePrice: state.products[item].price * 1,
          rebatePercent: state.products[item].rebatePercent || 0,
          giftwrapping: false,
        })),
      };

    case "REMOVE_FROM_BASKET":
      const updatedBasketItems = state.basketLines.filter(
        (item) => item.product.id !== action.productId
      );
      return {
        ...state,
        basketLines: updatedBasketItems,
      };

    case "UPDATE_ITEM_QUANTITY":
      const updatedBasketItems1 = state.basketLines.map((item) =>
        item.product.id === action.productId
          ? {
              ...item,
              quantity: action.quantity,
              totalLinePrice: item.product.price * action.quantity,
            }
          : item
      );
      return { ...state, basketLines: updatedBasketItems1 };
    case "UPDATE_GIFTWRAPPING":
      const updatedBasketItems2 = state.basketLines.map((item) =>
        item.product.id === action.productId
          ? { ...item, giftwrapping: action.giftwrapping }
          : item
      );
      return { ...state, basketLines: updatedBasketItems2 };

    default:
      return state;
  }
}

//Shop context
export const ShopContext = React.createContext<ShopState>(initialState);

//Dispatch context
export const DispatchShopContext =
  React.createContext<React.Dispatch<ShopAction> | null>(null);

type MyProviderProps = {
  children: React.ReactNode;
};

export function ShopContextProvider({ children }: MyProviderProps) {
  const [state, dispatch] = useReducer(shopReducer, initialState);

  // fetches all the products and sets them to the basketItems. Maybe not the best way to do it but cant find better.
  useEffect(() => {
    fetchProducts().then((products) => {
      dispatch({ type: "SET_PRODUCTS", products });
      dispatch({ type: "SET_BASKET_ITEMS", basketLines: products });
    });
  }, []);

  return (
    <ShopContext.Provider value={state}>
      <DispatchShopContext.Provider value={dispatch}>
        {children}
      </DispatchShopContext.Provider>
    </ShopContext.Provider>
  );
}
