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
   * @type {[Boolean, Function]} - state for fetch
   */

  const [isFetching, setIsFetching] = React.useState(false);

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
   * @async
   * @param {Object} evt - event object
   */

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    setIsFetching(true);
    if (email.length === 0 || password.length === 0) {
      alert("Email or password are empty or email is invalid");
      return;
    }
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      setEmail("");
      setPassword("");
      setIsFetching(false);
    } catch (err) {
      alert("Can't sign in, please check your e-mail or password");
    }
  };

  /**
   * Submits form when press enter
   * @param {Object} evt - object event
   */

  const handleEnterPress = (evt) => {
    if (evt.keyCode === 13) {
      handleSubmit(evt);
    }
  };

  React.useEffect(() => {
    document.addEventListener("keydown", handleEnterPress);
    return () => {
      document.removeEventListener("keydown", handleEnterPress);
    };
  }, []);
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
            disabled={isFetching}
          />
          <input
            type="password"
            className="form__input form__input--password"
            placeholder="Enter your password"
            value={password}
            onChange={handlePasswordChange}
            disabled={isFetching}
          />
          <button type="submit" className="form__btn btn" disabled={isFetching}>
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
