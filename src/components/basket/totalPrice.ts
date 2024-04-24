import { productLine,useShopContext } from "../../contexts/shopContext";


function calculateDiscount(totalPrice: number): number {
        
    if (totalPrice > 300) {
      
      return totalPrice * 0.9;
    } else {

      return totalPrice;
    }
  }
export const getTotalPrice = () => {

    const {basketItems} = useShopContext();
    /* TODO: make this return the correct total price and rebate is calculated correctly

    const product = basketItems.map(item => item.product);
    var originalLinePrice = product.forEach() * item.quantity;
    const totalPrice = basketItems.reduce((sum, item) => 
        item.quantity >= item.product.rebateQuantity
    ? originalLinePrice * (1 - item.product.rebatePercent / 100)
    : originalLinePrice, 0);
*/
    const totalPrice = basketItems.reduce((sum, item) => 
        sum + item.totalLinePrice, 0); 
    return(calculateDiscount(totalPrice))
}