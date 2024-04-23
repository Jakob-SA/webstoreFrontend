import React, { useReducer, useState, useEffect } from "react";
import { Product, fetchProducts } from "../components/basket/product";

//productLine type
interface productLine {
  product: Product;
  quantity: number;
  totalLinePrice: number;
  rebatePrice: number;
}

//type of state

interface ShopState {
  products: Product[];
  basketItems: productLine[];
  subtotal: number;
}

//inital state
const initialState: ShopState = {
  products: [],
  basketItems: [],
  subtotal: 0,
};

// Type of actions
type ShopAction =
  | { type: "SET_PRODUCTS"; products: Product[] }
  | { type: "SET_BASKET_ITEMS"; basketItems: Product[] }
  | { type: "REMOVE_FROM_BASKET"; productId: number }
  | { type: "UPDATE_TOTAL_PRICE"; productId: number; price: number }
  | { type: "UPDATE_QUANTITY"; productId: number; quantity: number };

//Reducer. co pilot helped here.
function shopReducer(state: ShopState, action: ShopAction): ShopState {
  switch (action.type) {
    case "SET_PRODUCTS":
      return { ...state, products: action.products };
    case "SET_BASKET_ITEMS":
      const indices = [0, 1, 2, 3, 4, 7, 8, 9]; // indices of the items you want to select
      // return { ...state, basketItems: indices.map(index => action.basketItems[index]) };
      return {
        ...state,
        basketItems: action.basketItems.map((item) => ({
          product: item,
          quantity: 1,
          totalLinePrice: item.price * 1,
          rebatePrice: item.rebatePercent * item.price,
        })),
      };

    case "REMOVE_FROM_BASKET": //copilot solution
      const updatedBasketItems = state.basketItems.filter(
        (item) => item.product.id !== action.productId
      );
      return {
        ...state,
        basketItems: updatedBasketItems,
      };
    case "UPDATE_TOTAL_PRICE": //copilot solution
      return { ...state };
    /* const updatedItems = state.basketItems.map(item => item.id === action.productId ? { ...item, price: action.price } : item);
      return { 
        ...state, 
        basketItems: updatedItems,
        totalPrice: updatedItems.reduce((acc, item) => acc + item.price, 0)
      };*/

    case "UPDATE_QUANTITY":
      const updatedItems = state.basketItems.map((item) =>
        item.product.id === action.productId
          ? {
              ...item,
              quantity: action.quantity,
              totalLinePrice: item.product.price * action.quantity,
            }
          : item
      );
      return {
        ...state,
        basketItems: updatedItems,
      };
    default:
      return state;
  }
}

//Shop context
export const ShopContext = React.createContext<ShopState>(initialState);

//Dispatch context (colipot suggested this)
export const DispatchShopContext =
  React.createContext<React.Dispatch<ShopAction> | null>(null);

//ShopContextProvider.
type MyProviderProps = React.PropsWithChildren<{ state?: ShopState }>;

export function ShopContextProvider({ children }: MyProviderProps) {
  console.log("ShopContextProvider mounted");
  const [state, dispatch] = useReducer(shopReducer, initialState);
  //const [totalPrice, setTotalPrice] = useState(0);
  //const [prices, setPrices] = useState(new Map<number, number>());
  //var basketDiscounted = false;
  const [subtotal, setSubtotal] = useState(0); // Add subtotal state

  useEffect(() => {
    // Calculate subtotal whenever basketItems change
    const subtotalAmount = state.basketItems.reduce(
      (total, item) => total + item.totalLinePrice,
      0
    );
    setSubtotal(subtotalAmount);
  }, [state.basketItems]);

  // fetches all the products and sets them to the basketItems.

  useEffect(() => {
    fetchProducts().then((products) => {
      //dispatch({type: 'SET_PRODUCTS', products});
      dispatch({ type: "SET_BASKET_ITEMS", basketItems: products });
      console.log(products);
      console.log("hej");
    });
    return () => {
      console.log("ShopContextProvider unmounted");
    };
  }, []);

  //Might need some of the logic later.

  /*const updateTotalPrice = (productID: number, price: number) => {
        //would like this to not be stateful
        setPrices(prices.set(productID, price));
        var tempTotalPrice = 0;
        Array.from(prices.values()).forEach((price) => {
          tempTotalPrice += price;
        });
        setTotalPrice((calculateDiscount(tempTotalPrice)));
      };



   const handleRemoveItem = (id: number) => {
        setBasketItems((prevItems) => prevItems.filter((item) => item.id !== id));
        updateTotalPrice(id, 0);
      };

      const addToBasket = (productID: number) => {
        setBasketItems((prev)=> ({...prev, [productID]:prev[productID+1]}) );
      }


      const removeFromBasket =(productID:number) => {
        setBasketItems((prev)=> ({...prev, [productID]:prev[productID-1]}) );
        
      }
      function calculateDiscount(totalPrice: number): number {
        
        if (totalPrice > 300) {
          basketDiscounted = true;
          return totalPrice * 0.9;
        } else {
          basketDiscounted = false;
          return totalPrice;
        }
      }*/

  return (
    <ShopContext.Provider value={{ ...state, subtotal }}>
      <DispatchShopContext.Provider value={dispatch}>
        {children}
      </DispatchShopContext.Provider>
    </ShopContext.Provider>
  );
}

export function useShopContext() {
  const context = React.useContext(ShopContext);
  if (!context) {
    throw new Error("useShopContext must be used within a ShopContextProvider");
  }
  return context;
}

export function useDispatchShopContext() {
  const dispatch = React.useContext(DispatchShopContext);
  if (!dispatch) {
    throw new Error(
      "useDispatchShopContext must be used within a ShopContextProvider"
    );
  }
  return dispatch;
}
