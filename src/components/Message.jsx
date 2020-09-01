import React from "react";
import { UserContext } from "../App";
import { transformTime } from "../utils";

const Message = ({ message }) => {
  const { user } = React.useContext(UserContext);
  const { message: content, sentBy, createdAt } = message;

  /**
   * @type {Boolean} checks if the sent message mine or not
   */
  const isItMine = user && user.userId === message.senderId;

  /**
   * @type {string} HH:MM formatted time
   */

  const time = transformTime(createdAt);

  return (
    <div className={`message ${isItMine ? "message--my" : ""}`}>
      <p className="message__send-by">{sentBy}</p>
      <p className="message__content">{content}</p>
      <p className="message__time">{time}</p>
    </div>
  );
};

export default Message;
