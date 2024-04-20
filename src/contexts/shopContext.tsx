import React, { useState, useEffect } from "react";
import { Product, fetchProducts } from '../components/basket/product';


//type of state

interface ShopState {
    products: Product[];
    basketItems: Product[];
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
| { type: 'UPDATE_TOTAL_PRICE'; productId: number; price: number };


//Reducer
  function shopReducer(state: ShopState, action: ShopAction): ShopState {
    switch (action.type) {
      case 'SET_PRODUCTS':
        return {...state, products: action.products.slice(0,5)}
      case 'SET_BASKET_ITEMS':
        const indices = [0, 3, 4, 7, 8, 9]; // indices of the items you want to select
        return { ...state, products: indices.map(index => action.basketItems[index]) };
      case 'REMOVE_FROM_BASKET':
        return { ...state, basketItems: state.basketItems.filter(item => item.id !== action.productId) };
      case 'UPDATE_TOTAL_PRICE':
        // Implement logic to update total price
      default:
        return state;
    }
  }
//Shop context
 export const ShopContext = React.createContext<ShopState>(initialState);

//Dispatch context (colipot suggested this)
 export  const DispatchShopContext = React.createContext<React.Dispatch<ShopAction>|null>(null)
 

  
  


  //ShopContextProvider. 
  type MyProviderProps = React.PropsWithChildren<{state?:ShopState }>

  export function ShopContextProvider({children}:MyProviderProps) {
    const [state, dispatch] = React.useReducer(shopReducer, initialState);
    const [totalPrice, setTotalPrice] = useState(0);
    const [prices, setPrices] = useState(new Map<number, number>());
    var basketDiscounted = false;


    useEffect(() => {
      fetchProducts().then((products) => {
        dispatch({type: 'SET_PRODUCTS', products});
        //dispatch({type: 'SET_BASKET_ITEMS', basketItems: state.products});
       });
    }, []);

    
  

 




    const updateTotalPrice = (productID: number, price: number) => {
        //would like this to not be stateful
        setPrices(prices.set(productID, price));
        var tempTotalPrice = 0;
        Array.from(prices.values()).forEach((price) => {
          tempTotalPrice += price;
        });
        setTotalPrice((calculateDiscount(tempTotalPrice)));
      };



   /* const handleRemoveItem = (id: number) => {
        setBasketItems((prevItems) => prevItems.filter((item) => item.id !== id));
        updateTotalPrice(id, 0);
      };

      const addToBasket = (productID: number) => {
        setBasketItems((prev)=> ({...prev, [productID]:prev[productID+1]}) );
      }


      const removeFromBasket =(productID:number) => {
        setBasketItems((prev)=> ({...prev, [productID]:prev[productID-1]}) );
        
      }*/
      function calculateDiscount(totalPrice: number): number {
        
        if (totalPrice > 300) {
          basketDiscounted = true;
          return totalPrice * 0.9;
        } else {
          basketDiscounted = false;
          return totalPrice;
        }
      }
    

    return (
        <ShopContext.Provider value = {state}>
          <DispatchShopContext.Provider value = {dispatch}>
            {children}
            </DispatchShopContext.Provider>
        </ShopContext.Provider>)
  }


  export function useShopContext() {
    const context = React.useContext(ShopContext);
    if (!context) {
      throw new Error('useShopContext must be used within a ShopContextProvider');
    }
    return context;
  }

  export function useDispatchShopContext() {
    const dispatch = React.useContext(DispatchShopContext);
    if (!dispatch) {
      throw new Error('useDispatchShopContext must be used within a ShopContextProvider');
    }
    return dispatch;
  }
