import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

// firestore
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCbyFsl5UISXywPPKEdKV7cLdLGvpcvOS8",
  authDomain: "crwn-clothing-db-37608.firebaseapp.com",
  projectId: "crwn-clothing-db-37608",
  storageBucket: "crwn-clothing-db-37608.appspot.com",
  messagingSenderId: "950869326563",
  appId: "1:950869326563:web:cb355f604abb43f38c63d6",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Initialize a Provider (for use google authentication)
const googleProvider = new GoogleAuthProvider();
// this coustomParameters takes some kind of configuration object
googleProvider.setCustomParameters({
  prompt: "select_account",
});

// this keep tracks of the authentication state of the entire application
// as the user sign in through the different means and methods
export const auth = getAuth();

export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);

export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

// after importing the firestore we need to create the DB
export const db = getFirestore();

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });

  await batch.commit();
  console.log("done");
};

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, "categories");

  const queryMethod = query(collectionRef)

  const querySnapshot = await getDocs(queryMethod);
  // console.log(querySnapshot);
  const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
    const {title, items} = docSnapshot.data()
    acc[title.toLowerCase()] = items
    return acc;
  }, {})
  return categoryMap
};

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation
) => {
  if (!userAuth) return;
  const userDocRef = doc(db, "users", userAuth.uid);

  console.log("the document reference", userDocRef);

  const userSnapshot = await getDoc(userDocRef);
  console.log("snapshot of user", userSnapshot);
  // console.log("snapshot of user", userSnapshot.exists());

  // if user data does not exists
  // create / set the document with the data from userAuth in my collection
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log("error creating the user", error.message);
    }
  }

  //if user data exists
  return userDocRef;

  // return userDocRef
};

// user authentication with email and password
export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) {
    return;
  }
  return createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) {
    return;
  }
  return signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListner = (callback) =>
  onAuthStateChanged(auth, callback);
