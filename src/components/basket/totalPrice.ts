
import {useShopContext } from "../../contexts/useShopContext";

let discounted = false



export const useDiscountAmount = () => {
  const totalPrice = useTotalPrice();
  if (discounted){
  return (totalPrice*0.1 )}
else return 0;
}

export const calculateDiscount = (totalPrice:number) => {
  if ( totalPrice > 300 ) {
    discounted = true;
    return (totalPrice * 0.9)
  }
  else{
    discounted = false;
    return totalPrice;
  }
}

export const getShippingCost = () => {
  const totalPrice = useTotalPrice();
  if (totalPrice> 300 && discounted) {
    return 0.0;
  }
    return 10.0;
}

export function useTotalPrice () {
   const {basketLines} = useShopContext();

    //Array of all the original line prices without rebate
    const originalLinePrice = basketLines.map((item)=>item.quantity*item.product.price) ;

    //total price of all productlines and takes rebate into account. Co pilot helped here.
    const totalPrice = basketLines.reduce((sum, item, index) => {
      const price = item.quantity >= item.product.rebateQuantity
    ? originalLinePrice[index] * (1 - item.product.rebatePercent / 100)
    : originalLinePrice[index]
    return sum + price;
  }, 0);
    return (totalPrice)
}

