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
  console.log("test1", userAuth, additionalData);
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();
  console.log("test2", userRef, snapShot);
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

export const addCollectionAndDocuments = async (collectionKey, objectToAdd) => {
  const collectionRef = firestore.collection(collectionKey);
  console.log("collectionRef", collectionRef);

  const batch = firestore.batch();
  objectToAdd.forEach((obj) => {
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj);
  });
  await batch.commit();
};

export const convertCollectionsSnapshotToMap = (collections) => {
  const transformedCollections = collections.docs.map((obj) => {
    const { title, items } = obj.data();
    return {
      title,
      items,
      routeName: encodeURI(title.toLowerCase()),
      id: obj.id,
    };
  });
  return transformedCollections.reduce((acc, ele) => {
    acc[ele.title.toLowerCase()] = ele;
    return acc;
  }, {});
};

firebase.initializeApp(config);

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      unsubscribe();
      resolve(userAuth);
    }, reject);
  });
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;
