import { firestore } from "./firebase";

/**
 * Finds in the firestore user document and returns an object
 * @param {string} uid - user id
 * @returns {Object} return object with user id, and other user data
 */

export const getUserDocument = async (uid) => {
  if (!uid) return null;

  try {
    const userDocument = await firestore.doc(`users/${uid}`).get();
    return { uid, ...userDocument.data() };
  } catch (error) {
    console.error(
      "Something went wrong while getting a user document: ",
      error.message
    );
  }
};
