function NormalBasket({ basketLines }: { basketLines: any }) {
  return (
    <table>
      <tbody>
        <tr>
          <th></th>
          <th>
            <p>Product</p>
          </th>
          <th>
            <p>Price per unit</p>
          </th>
          <th>
            <p>Quantity</p>
          </th>
          <th>
            <p>Total</p>
          </th>
          <th> </th>
          <th></th>
        </tr>
        {basketLines}
      </tbody>
    </table>
  );
}
export default NormalBasket;
