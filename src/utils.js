/**
 * @param {number} seconds - the number of seconds after 1970,0,1
 * @returns string in format HH::MM
 */

export const transformTime = (d) => {
  const date = new Date(d);
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
};

/**
 * creates newMessage object this information further will be placed in firestore
 * @param {string} message - content of message
 * @param {number} senderId - users id who send the message
 * @param {string} sentBy - displayName of user who send the message
 * @returns {Object} with time, when message was created, unique id, message content,
 * senderId and displayName of user who sent the message
 */

export const createMessage = (message, senderId, sentBy) => {
  const id = String(Math.random().toFixed(6)).split(".")[1];
  const createdAt = new Date().toISOString();

  return {
    message,
    senderId,
    sentBy,
    id,
    createdAt,
  };
};
