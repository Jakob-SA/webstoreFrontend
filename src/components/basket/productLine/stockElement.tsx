function StockElement({
  stock,
  quantity,
}: {
  stock: number;
  quantity: number;
}) {
  let content;
  const decideStockSituation = (): string => {
    if (stock === 0) {
      content = "Out of stock";
      return "OutOfStock";
    } else if (stock < quantity) {
      content = "Not enough stock";
      return "NotEnoughStock";
    } else if (stock <= 5) {
      content = "Low stock";
      return "LowStock";
    } else {
      content = "In stock";
      return "InStock";
    }
  };

  return <p className={"stockElement" + decideStockSituation()}>{content}</p>;
}

export default StockElement;
