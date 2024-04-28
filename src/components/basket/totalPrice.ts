import { s } from "vitest/dist/reporters-MmQN-57K.js";
import {useShopContext } from "../../contexts/useShopContext";
import {useState} from "react";



export const useDiscountAmount = () => {
  const {totalPrice, discounted} = useTotalPrice();
  if (discounted)
  return (totalPrice / 0.9 - totalPrice)
else return 0;
}
  

  //TODO: also make a function to return the total discount amount.
  // 

export function useTotalPrice () {
  const [discounted, setDiscounted] = useState(false);
   const {basketLines} = useShopContext();

   function calculateDiscount(totalPrice: number): number {
    if ( totalPrice > 300 && !discounted ) {
      return (totalPrice - totalPrice * 0.1);
    } else {
      console.log(discounted)
      return totalPrice;
    }
  }
  
   
    //Array of all the original line prices without rebate
    var originalLinePrice = basketLines.map((item)=>item.quantity*item.product.price) ;

    //total price of all productlines and takes rebate into account. Co pilot helped here.
    const totalPrice = basketLines.reduce((sum, item, index) => {
      const price = item.quantity >= item.product.rebateQuantity
    ? originalLinePrice[index] * (1 - item.product.rebatePercent / 100)
    : originalLinePrice[index]
    return sum + price;
  }, 0);
    console.log(totalPrice)
    return {totalPrice: calculateDiscount(totalPrice), discounted} //copilot helped here
}

export const getShippingCost = () => {
  const {totalPrice} = useTotalPrice();

  if (totalPrice> 300) {
    return 0.0;
  }
    return 10.0;
}