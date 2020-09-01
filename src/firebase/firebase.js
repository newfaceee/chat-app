import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyA9b5FYjNnLz5SfMeHXK6IINN_h5qbGA5g",
  authDomain: "chat-app-edu.firebaseapp.com",
  databaseURL: "https://chat-app-edu.firebaseio.com",
  projectId: "chat-app-edu",
  storageBucket: "chat-app-edu.appspot.com",
  messagingSenderId: "477567992622",
  appId: "1:477567992622:web:11d781adbbcd79784c70bf",
  measurementId: "G-L0NPGGN52J",
};

/**
 * connect our app with firebaase
 */
firebase.initializeApp(firebaseConfig);

/**
 * add firebase analytics in our app
 */
firebase.analytics();

/**
 * creates firestore object which we can use to get access to cloud firestore
 */
const firestore = firebase.firestore();

export { firebase, firestore };
