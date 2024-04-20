function PhoneBasket({ basketLines }: { basketLines: any }) {
  return (
    <section>
      <h1>Phone Basket</h1>
      <p>
        This is the phone basket. If you are on a small screen, you will see
        this instead of the full basket.
      </p>
      {basketLines}
    </section>
  );
}
export default PhoneBasket;
