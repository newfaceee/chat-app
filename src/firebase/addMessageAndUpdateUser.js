import { firestore, firebase } from "./firebase";

/**
 * function which add message to firestore collection "messages",
 * and updates array of messages in collection "users" which user
 * have been send
 * @param {Object} newMessage - object newMessage with time, when message was created, unique id, message content,
 * senderId and displayName of user who sent the message
 * @param {Object} userRef - reference to user document in firestore
 * @returns {void} nothing to return
 */

export const addMessageAndUpdateUser = async (newMessage, userRef) => {
  try {
    await firestore.collection("messages").add(newMessage);
    userRef.update({
      messages: firebase.firestore.FieldValue.arrayUnion(newMessage.id),
    });
  } catch (err) {
    console.error(
      "Something went wrong while adding or updating messages, err.message: ",
      err.message
    );
  }
};
