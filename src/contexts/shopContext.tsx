import React, { useState, useEffect } from "react";
import { Product, fetchProducts } from '../components/basket/product';


//type of state

interface ShopState {
    products: Product[];
    basketItems: Product[];
    handleRemoveItem: (id: number) => void; 
    updateTotalPrice: (productID: number, price: number) => void;
    addToBasket: (productID: number) => void;

}
//inital state
const initialState: ShopState = {
    products: [],
    basketItems: [],
    handleRemoveItem: () => {},
    updateTotalPrice: () => {},
    addToBasket: () => {},
  };

  const ShopContext = React.createContext<ShopState>(initialState);


  //Dispacth context 


  //ShopContextProvider. 
  type MyProviderProps = React.PropsWithChildren<{state?:ShopState }>

  export function ShopContextProvider({children}:MyProviderProps) {
    const [products, setProducts] = useState<Product[]>([]);
    const [basketItems, setBasketItems] = useState<Product[]>([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [prices, setPrices] = useState(new Map<number, number>());

    
    useEffect(() => {
      fetchProducts().then((products) => {
        setProducts(products);
      });
    }, []);

    const updateTotalPrice = (productID: number, price: number) => {
        //would like this to not be stateful
        setPrices(prices.set(productID, price));
        var tempTotalPrice = 0;
        Array.from(prices.values()).forEach((price) => {
          tempTotalPrice += price;
        });
        setTotalPrice((tempTotalPrice));
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
    

    return (
        <ShopContext.Provider value = {{products,basketItems,handleRemoveItem,updateTotalPrice,addToBasket}}>
            {children}
        </ShopContext.Provider>



    )
  }
