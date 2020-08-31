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

const UserContext = React.createContext(initialUserContext);
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

  /**
   * @type {Object}
   */

  const userValue = { user, setUser };

  /**
   * @type {Object}
   */

  const messagesValue = { messages, setMessages };

  React.useEffect(() => {
    const unsubscribeFromAuth = firebase
      .auth()
      .onAuthStateChanged(async (userInfo) => {
        if (userInfo) {
          const userRef = await createUserProfileDocument(userInfo);
          setUser(userRef);
        }
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
          <Chat />
        </UserContext.Provider>
      </MessagesContext.Provider>
    </>
  );
};

export { App, UserContext, MessagesContext };
