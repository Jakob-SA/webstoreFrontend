import "./orderform.css";

function Orderform() {
  return (
    <form action="/shipping-information" method="post">
      <h1>Checkout</h1>

      <h2>Shipping</h2>
      <legend>Enter your shipping details</legend>
      <ul>
        <select id="businessCustomer" required name="businessCustomer">
          <option value="private">Private</option>
          <option value="business">Business</option>
        </select>
        <section>
          <div className="input-group">
            <label htmlFor="first-name">First Name:</label>
            <input
              type="text"
              required
              id="first-name"
              name="user_first_name"
            />
          </div>
          <div className="input-group">
            <label htmlFor="last-name">Last Name:</label>
            <input type="text" required id="last-name" name="user_last_name" />
          </div>
          <div className="input-group">
            <label htmlFor="adress1">Adress:</label>
            <input type="text" required id="adress1" name="user_adress1" />
          </div>
          <div className="input-group">
            <label htmlFor="adress2">Appartment, suite etc. *Optional*:</label>
            <input type="text" id="adress2" name="user_adress2" />
          </div>
          <div className="address-checkbox">
            <label>Different shipping address</label>
            <input type="checkbox"></input>
          </div>
          <div className="input-group">
            <label htmlFor="zip">Zip Code:</label>
            <input type="text" required id="zip" name="user_zip" />
          </div>
          <div className="input-group">
            <label htmlFor="city">City:</label>
            <input type="text" required id="city" name="user_city" />
          </div>
          <div className="input-group">
            <label htmlFor="email">Email:</label>
            <input type="email" required id="email" name="user_email" />
          </div>
          <div className="input-group">
            <label htmlFor="tel">Phonenumber:</label>
            <input
              type="tel"
              required
              pattern="^(?:\+45|0045)?\s?\d{2}(?:\s?|\-?)\d{2}(?:\s?|\-?)\d{2}(?:\s?|\-?)\d{2}$"
              name="user_telephoneNumber"
            ></input>
          </div>
        </section>
        <section>
          <div className="submit-button">
            <input type="submit" value="Place order" />
          </div>
        </section>
      </ul>
    </form>
  );
}

export default Orderform;
