import {useShopContext } from "../../contexts/useShopContext";

var discounted = false;
function calculateDiscount(totalPrice: number): number {
    if (totalPrice > 300) {
      discounted = true;
      return totalPrice * 0.9;
    } else {
      discounted = false;
      return totalPrice;
    }
  }

  export const useDiscountAmount = () => {
    const totalPrice = useTotalPrice();
    if (discounted)
    return (totalPrice / 0.9 - totalPrice)
  else return 0;
  }

  //TODO: also make a function to return the total discount amount.
  // 

export function useTotalPrice () {

    const {basketItems} = useShopContext();
   
    //Array of all the original line prices without rebate
    var originalLinePrice = basketItems.map((item)=>item.quantity*item.product.price) ;

    //total price of all productlines and takes rebate into account. Co pilot helped here.
    const totalPrice = basketItems.reduce((sum, item, index) => {
      const price = item.quantity >= item.product.rebateQuantity
    ? originalLinePrice[index] * (1 - item.product.rebatePercent / 100)
    : originalLinePrice[index]
    return sum + price;
  }, 0);
    console.log(totalPrice)
    return(calculateDiscount(totalPrice))
}

export const getShippingCost = () => {

  if (useTotalPrice() > 300) {
    return 0.0;
  }
    return 10.0;
}