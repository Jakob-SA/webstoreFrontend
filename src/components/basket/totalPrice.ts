import {useShopContext } from "../../contexts/shopContext";


function calculateDiscount(totalPrice: number): number {
    if (totalPrice > 300) {
      return totalPrice * 0.9;
    } else {
      return totalPrice;
    }
  }

  export const getDiscountAmount = () => {
    const totalPrice = getTotalPrice();
    return (totalPrice / 0.9 - totalPrice).toFixed(2)
  }

  //TODO: also make a function to return the total discount amount.
  // 

export const getTotalPrice = () => {

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