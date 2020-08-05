import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyDWK_YrmZTs2kIDvvTxAQ4LoaLsEUqmY5w",
  authDomain: "kings-queens-9f743.firebaseapp.com",
  databaseURL: "https://kings-queens-9f743.firebaseio.com",
  projectId: "kings-queens-9f743",
  storageBucket: "kings-queens-9f743.appspot.com",
  messagingSenderId: "1091343569027",
  appId: "1:1091343569027:web:81070d5d763df77a2c4bb6",
  measurementId: "G-WL5QVVXTHT",
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (err) {
      console.log("error creating user", err.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
