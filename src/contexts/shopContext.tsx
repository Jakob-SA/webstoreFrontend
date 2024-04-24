import React, { useReducer, useState, useEffect } from "react";
import { Product, fetchProducts } from '../components/basket/product';
 
//productLine type
export interface productLine {
  product: Product;
  quantity: number;
  totalLinePrice: number;
  rebatePercent: number;
}

//type of state
interface ShopState {
    products: Product[];
    basketItems: productLine[];
}

//inital state
const initialState: ShopState = {
  products: [],
  basketItems: [],
};

// Type of actions
 type ShopAction =
 { type: 'SET_PRODUCTS'; products: Product[] }
| { type: 'SET_BASKET_ITEMS'; basketItems: Product[] }
| { type: 'REMOVE_FROM_BASKET'; productId: number }
| { type: 'UPDATE_ITEM_QUANTITY'; productId: number; quantity: number }

 
//Reducer. co pilot helped here.
  function  shopReducer(state: ShopState, action: ShopAction): ShopState {
    switch (action.type) {

      case 'SET_PRODUCTS':
        return {...state, 
          products: action.products}

      case 'SET_BASKET_ITEMS':
        const indices = [0, 1 , 2, 3, 4, 7, 8, 9]; // indices of items to select. might need later.
       // return { ...state, basketItems: indices.map(index => action.basketItems[index]) };
       return {...state,
        basketItems: action.basketItems.map(item => ({
        product: item,
        quantity: 1,
        totalLinePrice: item.price*1,
        rebatePercent: item.rebatePercent}))}

      case 'REMOVE_FROM_BASKET': //copilot suggested this. Returns a new state with the item removed.
        const updatedBasketItems = state.basketItems.filter(item => item.product.id !== action.productId);
      return { 
        ...state, 
        basketItems: updatedBasketItems}
      
      case 'UPDATE_ITEM_QUANTITY': // Copilot suggested this. Returns a new state with the quantity of the item updated if the product id matches the action product id.
      const updatedBasketItems1 = state.basketItems.map(item => 
        item.product.id === action.productId
          ? { ...item, 
            quantity: action.quantity,
             totalLinePrice: item.product.price * action.quantity } : item
      );
      return { ...state, basketItems: updatedBasketItems1 };
       
      default:
        return state;
    }
  }

//Shop context
 export const ShopContext = React.createContext<ShopState>(initialState);

//Dispatch context 
 export  const DispatchShopContext = React.createContext<React.Dispatch<ShopAction>|null>(null)
 

//ShopContextProvider. 
type MyProviderProps = React.PropsWithChildren<{state?:ShopState }>

export function ShopContextProvider({children}:MyProviderProps) {
    const [state, dispatch] = useReducer(shopReducer, initialState);
    

// fetches all the products and sets them to the basketItems. Maybe not the best way to do it but cant find better.
    useEffect(() => {
      fetchProducts().then((products) => {
        //dispatch({type: 'SET_PRODUCTS', products});
        dispatch({type: 'SET_BASKET_ITEMS', basketItems: products});
        console.log(products);
       });
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
   */
    
    return (
        <ShopContext.Provider value = {state}>
          <DispatchShopContext.Provider value = {dispatch}>
            {children}
            </DispatchShopContext.Provider>
        </ShopContext.Provider>)
  }

//Hook to use the shop context
  export function useShopContext() {
    const context = React.useContext(ShopContext);
    if (!context) {
      throw new Error('useShopContext must be used within a ShopContextProvider');
    }
    return context;
  }
// Hook to use the dispatch context
  export function useDispatchShopContext() {
    const dispatch = React.useContext(DispatchShopContext);
    if (!dispatch) {
      throw new Error('useDispatchShopContext must be used within a ShopContextProvider');
    }
    return dispatch;
  }
