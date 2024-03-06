import "./orderform.css";

function Orderform() {
  return (
    <form action="/my-handling-form-page" method="post">
      <legend>Enter your shipping details</legend>
      <ul>
        <select id="businessCustomer" required name="businessCustomer">
          <option value="private">Private</option>
          <option value="business">Business</option>
        </select>
        <li>
          <label htmlFor="name">Name:</label>
          <input type="text" required id="name" name="user_name" />
        </li>
        <li>
          <label htmlFor="adress1">Adress:</label>
          <input type="text" required id="adress1" name="user_adress1" />
        </li>
        <li>
          <label htmlFor="adress2">Appartment, suite etc. *Optional*:</label>
          <input type="text" id="adress2" name="user_adress2" />
        </li>
        <li>
          <label htmlFor="zip">Zip Code:</label>
          <input type="text" required id="zip" name="user_zip" />
        </li>
        <li>
          <label htmlFor="city">City:</label>
          <input type="text" required id="city" name="user_city" />
        </li>
        <li>
          <label htmlFor="email">Email:</label>
          <input type="email" required id="email" name="user_email" />
        </li>
        <li>
          <label htmlFor="tel">Phonenumber:</label>
          <input
            type="tel"
            required
            pattern="^(\+45|0045)?\s?(\d{2}\s?){3}\d{2}$" // Used LLM to find the pattern
            name="user_telephoneNumber"
          ></input>
        </li>
        <input type="submit" value="Place order" />
      </ul>
    </form>
  );
}

export default Orderform;
