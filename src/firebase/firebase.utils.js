import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyArFsgzBd_3ICsLYiVo_9XsVLnxlYa5Qcg",
  authDomain: "crwn-clothing-20cef.firebaseapp.com",
  projectId: "crwn-clothing-20cef",
  storageBucket: "crwn-clothing-20cef.appspot.com",
  messagingSenderId: "314746258017",
  appId: "1:314746258017:web:3eef9a9fb5013798732020",
  measurementId: "G-JBGCEDBJMB"
};

firebase.initializeApp(config);

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
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
