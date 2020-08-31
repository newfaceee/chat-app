import React from "react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

const SignInAndSignUp = () => {
  /**
   * @type {[Boolean, Function]} - sign visibility state
   */

  const [isSignIn, setIsSignIn] = React.useState(false);

  /**
   * @type {[Boolean, Function]} - sign up visibility state
   */
  const [isSignUp, setIsSignUp] = React.useState(false);

  /**
   * Handle sign in button click
   */

  const handleSignIn = () => {
    setIsSignIn(!isSignIn);
  };

  /**
   * Handle sign up button click
   */

  const handleSignUp = () => {
    setIsSignUp(!isSignUp);
  };

  return (
    <div className="authorization">
      <button onClick={handleSignIn} className="authorization__btn btn">
        Sign In
      </button>
      <button onClick={handleSignUp} className="authorization__btn btn">
        Sign Up
      </button>
      {isSignUp && <SignUp handleSignUp={handleSignUp} />}
      {isSignIn && <SignIn handleSignIn={handleSignIn} />}
    </div>
  );
};

export default SignInAndSignUp;
