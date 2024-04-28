
import {useShopContext } from "../../contexts/useShopContext";
import { useRef} from "react";



export const useDiscountAmount = () => {
  const {totalPrice, discounted} = useTotalPrice();
  if (discounted)
  return (totalPrice - (totalPrice*0.9))
else return 0;
}


  //TODO: also make a function to return the total discount amount.
  //

export function useTotalPrice () {
// const [discounted, setDiscounted] = useState(false);
   const {basketLines} = useShopContext();
   const discounted = useRef(false)
   
   //let discounted = false;
   function calculateDiscount(totalPrice: number){
    if ( totalPrice > 300 && !discounted.current ) {
      discounted.current = true;
      console.log("Discount applied  " + totalPrice)
      return (totalPrice * 0.9)
    } 
    if(discounted.current && totalPrice < 300){
      discounted.current = false;
      console.log("Discount removed")
    }
    else{
      console.log(discounted.current)
      return totalPrice;
    }
  }


    //Array of all the original line prices without rebate
    const originalLinePrice = basketLines.map((item)=>item.quantity*item.product.price) ;

    //total price of all productlines and takes rebate into account. Co pilot helped here.
    const totalPrice = basketLines.reduce((sum, item, index) => {
      const price = item.quantity >= item.product.rebateQuantity
    ? originalLinePrice[index] * (1 - item.product.rebatePercent / 100)
    : originalLinePrice[index]
    return sum + price;
  }, 0);
    return {totalPrice: calculateDiscount(totalPrice) || 0, discounted} //copilot helped here
}

export const getShippingCost = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const {totalPrice, discounted} = useTotalPrice();

  if (totalPrice> 300 && discounted) {
    return 0.0;
  }
    return 10.0;
}