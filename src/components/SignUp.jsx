import React from "react";
import { firebase } from "../firebase/firebase";
import { createUserProfileDocument } from "../firebase/createUser";

const SignUp = ({ handleSignUp }) => {
  /**
   * @type {[String, Function]} email state
   */

  const [email, setEmail] = React.useState("");

  /**
   * @type {[String, Function]} login state
   */

  const [login, setLogin] = React.useState("");

  /**
   * @type {[String, Function]} password state
   */

  const [password, setPassword] = React.useState("");

  /**
   * Handle change of email input
   * @param {Object} evt - object event
   */

  const handleEmailChange = (evt) => {
    setEmail(evt.target.value);
  };

  /**
   * Handle change of login input
   * @param {Object} evt - object event
   */

  const handleLoginChange = (evt) => {
    setLogin(evt.target.value);
  };

  /**
   * Handle change of password input
   * @param {Object} evt - object event
   */

  const handlePasswordChange = (evt) => {
    setPassword(evt.target.value);
  };

  /**
   * Handle click on close button
   * @param {Object} evt - object event
   */

  const handleClose = (evt) => {
    evt.preventDefault();
    handleSignUp();
  };

  /**
   * Handle click to submit button, tries create user with
   * email and password and creates user profile document in firestore
   * collection users
   * @async
   * @param {Object} evt - object event
   */

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    try {
      const { user } = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
      createUserProfileDocument(user, { displayName: login });
    } catch (err) {
      console.log("something went wrong while creating user", err.message);
    }

    setEmail("");
    setPassword("");
    setLogin("");
    handleSignUp();
  };

  return (
    <div className="modal">
      <form onSubmit={handleSubmit} className="form">
        <div className="form__wrapper">
          <div className="form__header">
            <h2 className="form__name">Sign Up</h2>
            <button onClick={handleClose} className="form__close-btn"></button>
          </div>
          <input
            type="text"
            className="form__input form__input--login"
            placeholder="Login"
            value={login}
            onChange={handleLoginChange}
          />
          <input
            type="email"
            className="form__input form__input--email"
            placeholder="E-mail"
            value={email}
            onChange={handleEmailChange}
          />
          <input
            type="password"
            className="form__input form__input--password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
          />
          <input type="submit" className="form__btn btn" value="Sign Up" />
        </div>
      </form>
    </div>
  );
};

export default SignUp;
