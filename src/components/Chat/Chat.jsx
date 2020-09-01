import React from "react";
import Authentication from "../Authentication";
import Content from "./Content";
import Warning from "./Warning";

import { UserContext } from "../../App";

/**
 *
 * @param {Boolean} props.isFetching - auth state
 */

const Chat = ({ isFetching }) => {
  /**
   * @type {{user: Object}} - user object from context
   */
  const { user } = React.useContext(UserContext);

  return (
    <section className="chat">
      <div className="chat__wrapper">
        <div className="chat__sidebar">
          {isFetching ? "Loading..." : <Authentication />}
        </div>
        <div className="chat__window">{!user ? <Warning /> : <Content />}</div>
      </div>
    </section>
  );
};

export default Chat;
