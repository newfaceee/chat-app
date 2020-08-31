import React from "react";
import { firestore } from "../../firebase/firebase";
import Message from "../Message";
import { addMessageAndUpdateUser } from "../../firebase/addMessageAndUpdateUser";
import { MessagesContext, UserContext } from "../../App";
import { createMessage } from "../../utils";

const Content = () => {
  /**
   * @type {[Boolean, Function]} send icon visibility
   */
  const [iconVisible, setIconVisible] = React.useState(false);

  /**
   * @type {[String, Function]} value of message input
   */

  const [message, setMessage] = React.useState("");

  /**
   * @type {[Boolean, Function]} state of input
   */

  const [isDisable, setIsDisable] = React.useState(false);

  const { messages } = React.useContext(MessagesContext);
  const { user } = React.useContext(UserContext);

  /**
   * @type {Object || null} - reference to messages block
   */

  const messagesRef = React.useRef(null);

  /**
   * @type {Object || null} - reference to user document in firestore
   */

  const userRef = user && firestore.collection("users").doc(user.uid);

  /**
   * Handle value of message input
   * @param {Object} evt - event object
   */

  const handleMessageChange = (evt) => {
    setMessage(evt.target.value);
    if (evt.target.value.length > 0) {
      setIconVisible(true);
    } else {
      setIconVisible(false);
    }
  };

  /**
   * Handle submit event. If message length = 0, shows alert message,
   * otherwise trying add and update data in firestore
   * @async
   * @param {Object} evt
   */

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    if (message.length === 0) {
      alert("There is nothing to send, please type some letters");
      return;
    }
    setIsDisable(true);

    const newMessage = createMessage(message, user.userId, user.displayName);
    try {
      await addMessageAndUpdateUser(newMessage, userRef);
      setIsDisable(false);
      setIconVisible(false);
    } catch (err) {
      console.error("error while sending message: ", err.message);
    }

    setMessage("");
  };

  /**
   * Every time when messages updated, scroll window to current message
   */

  React.useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <>
      <div ref={messagesRef} className="chat__messages">
        {messages.map((message) => {
          return <Message key={message.id} message={message} />;
        })}
      </div>
      <div className="chat__bottom">
        <form onSubmit={handleSubmit} className="chat__message">
          <input
            className="chat__input-message"
            placeholder="Enter your message"
            value={message}
            onChange={handleMessageChange}
            disabled={isDisable}
          />
          {iconVisible && (
            <button type="submit" className="chat__send-msg-btn">
              <svg
                className="chat__send-msg-btn--icon"
                enableBackground="new 0 0 24 24"
                height="24"
                viewBox="0 0 24 24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="m8.75 17.612v4.638c0 .324.208.611.516.713.077.025.156.037.234.037.234 0 .46-.11.604-.306l2.713-3.692z" />
                <path d="m23.685.139c-.23-.163-.532-.185-.782-.054l-22.5 11.75c-.266.139-.423.423-.401.722.023.3.222.556.505.653l6.255 2.138 13.321-11.39-10.308 12.419 10.483 3.583c.078.026.16.04.242.04.136 0 .271-.037.39-.109.19-.116.319-.311.352-.53l2.75-18.5c.041-.28-.077-.558-.307-.722z" />
              </svg>
            </button>
          )}
        </form>
      </div>
    </>
  );
};

export default Content;
