import React from "react";
import { firebase } from "../firebase/firebase";

const SignIn = ({ handleSignIn }) => {
  /**
   * @type {[String, Function]} email
   */

  const [email, setEmail] = React.useState("");

  /**
   * @type {[String, Function]} - password
   */

  const [password, setPassword] = React.useState("");

  /**
   * Handles email input
   * @param {Object} evt - event object
   */

  const handleEmailChange = (evt) => {
    setEmail(evt.target.value);
  };

  /**
   * Handles password input
   * @param {Object} evt - event object
   */

  const handlePasswordChange = (evt) => {
    setPassword(evt.target.value);
  };

  /**
   * Handle click on close btn of modal window
   * @param {Object} evt - event object
   */

  const handleClose = (evt) => {
    evt.preventDefault();
    handleSignIn();
  };

  /**
   * Handle click on submit button
   * @param {Object} evt - event object
   */

  const handleSubmit = (evt) => {
    evt.preventDefault();
    try {
      firebase.auth().signInWithEmailAndPassword(email, password);
    } catch (err) {
      console.log("Something went wrong while Sign In:", err.message);
    }
  };
  return (
    <div className="modal">
      <form onSubmit={handleSubmit} className="modal__form form">
        <div className="form__wrapper">
          <div className="form__header">
            <h2 className="form__name">Sign In</h2>
            <button onClick={handleClose} className="form__close-btn"></button>
          </div>

          <input
            type="email"
            className="form__input form__input--login"
            placeholder="Enter your e-mail"
            value={email}
            onChange={handleEmailChange}
          />
          <input
            type="password"
            className="form__input form__input--password"
            placeholder="Enter your password"
            value={password}
            onChange={handlePasswordChange}
          />
          <input type="submit" className="form__btn btn" value="Sign In" />
        </div>
      </form>
    </div>
  );
};

export default SignIn;
