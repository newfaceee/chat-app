import React from "react";
import User from "./User";
import SignInAndSignUp from "./SignInAndSignUp";
import { UserContext } from "../App";

const Authentication = () => {
  const { user } = React.useContext(UserContext);
  return <>{user ? <User /> : <SignInAndSignUp />}</>;
};

export default Authentication;
