import { firebase, firestore } from "./firebase";
import { getUserDocument } from "./getUserDocument";

/**
 * create new user
 * @param {string} email - user email
 * @param {string} password - user password
 * @returns {void}  nothing to return
 */

export const createUser = async (email, password) => {
  try {
    await firebase.auth().createUserWithEmailAndPassword(email, password);
  } catch (error) {
    console.error("Something went wrong while creating user: ", error.message);
  }
};

/**
 * Creates document with user data, if this this document already exists
 * just return a user document
 * @param {Object} user - user object from firestore
 * @param {Object} additionalData - any additional data that we might want
 * add to our user profile document, in this case additional data is displayName of user
 * @returns {(userID:string) => void} - returns a function that find user document by userID
 */

export const createUserProfileDocument = async (user, additionalData) => {
  if (!user) return;
  const userRef = firestore.doc(`users/${user.uid}`);
  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { email } = user;
    const createdAt = new Date();
    const userId = String(Math.random().toFixed(7)).split(".")[1];

    try {
      await userRef.set({
        email,
        createdAt,
        userId,
        ...additionalData,
        messages: [],
      });
    } catch (err) {
      console.error(
        "Something went from while creating a user profile: ",
        err.message
      );
    }
  }
  return getUserDocument(user.uid);
};

createUserProfileDocument();
