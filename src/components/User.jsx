import React from "react";
import { firebase } from "../firebase/firebase";
import { UserContext } from "../App";

const User = () => {
  /**
   * @type {{user: Object, setUser: Function}} - user object & setUser function
   */

  const { user, setUser } = React.useContext(UserContext);

  /**
   * Handle click to sign out button
   * @async
   */

  const handleSignOut = async () => {
    try {
      await firebase.auth().signOut();
      setUser(null);
    } catch (err) {
      console.error("Error when sign out", err.message);
    }
  };
  return (
    <section className="user-profile">
      <p className="user-profile__content">
        Welcome,
        <span className="user-profile__username">{user.displayName}</span>
      </p>
      <button
        onClick={handleSignOut}
        className="user-profile__sign-out-btn btn"
      >
        Sign Out
      </button>
    </section>
  );
};

export default User;
