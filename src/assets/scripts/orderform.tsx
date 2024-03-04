import "./orderform.css";

function Orderform() {
  return (
    <form action="/my-handling-form-page" method="post">
      <ul>
        <li>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="user_name" />
        </li>
        <li>
          <label htmlFor="mail">Email:</label>
          <input type="email" id="mail" name="user_email" />
        </li>
        <li>
          <label htmlFor="msg">Message:</label>
          <textarea id="msg" name="user_message"></textarea>
        </li>
      </ul>
    </form>
  );
}

export default Orderform;
