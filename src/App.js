import React from "react";
import Chat from "./components/Chat/Chat";

import { firebase, firestore } from "./firebase/firebase";
import { createUserProfileDocument } from "./firebase/createUser";

const initialUserContext = {
  user: null,
  setUser: () => {},
};

const initialMessages = {
  messages: [],
  setMessages: () => {},
};
/**
 * @type {Object} creating user context with initial value
 */
const UserContext = React.createContext(initialUserContext);

/**
 * @type {Object} creating messages context with initial value
 */
const MessagesContext = React.createContext(initialMessages);

const App = () => {
  /**
   * @type {[Object, Function]} current user
   */

  const [user, setUser] = React.useState(null);

  /**
   * @type {[Array.<Object>, Function]} all messages
   */

  const [messages, setMessages] = React.useState([]);

  const [isFetching, setIsFetching] = React.useState(false);

  /**
   * @type {Object}
   */

  const userValue = { user, setUser };

  /**
   * @type {Object}
   */

  const messagesValue = { messages, setMessages };

  React.useEffect(() => {
    setIsFetching(true);
    const unsubscribeFromAuth = firebase
      .auth()
      .onAuthStateChanged(async (userInfo) => {
        if (userInfo) {
          const userRef = await createUserProfileDocument(userInfo);
          setUser(userRef);
        }
        setIsFetching(false);
      });

    return () => {
      unsubscribeFromAuth();
    };
  }, []);

  React.useEffect(() => {
    const unsubcribeFromFirestore = firestore
      .collection("messages")
      .orderBy("createdAt")
      .onSnapshot((snapshot) => {
        const allMessages = snapshot.docs.map((doc) => {
          return {
            ...doc.data(),
          };
        });
        setMessages(allMessages);
      });

    return () => {
      unsubcribeFromFirestore();
    };
  }, []);

  return (
    <>
      <MessagesContext.Provider value={messagesValue}>
        <UserContext.Provider value={userValue}>
          <Chat isFetching={isFetching} />
        </UserContext.Provider>
      </MessagesContext.Provider>
    </>
  );
};

export { App, UserContext, MessagesContext };
