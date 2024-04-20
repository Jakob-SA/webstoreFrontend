function NormalBasket({ basketLines }: { basketLines: any }) {
  return (
    <table>
      <tbody>
        <tr>
          <th></th>
          <th>Product</th>
          <th>Price per unit</th>
          <th>Quantity</th>
          <th>Total </th>
          <th> </th>
          <th></th>
        </tr>
        {basketLines}
      </tbody>
    </table>
  );
}
export default NormalBasket;
