
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getDatabase, ref as databaseRef, onValue } from "firebase/database"; // Import ref as databaseRef

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDITisLlh-O-dBmCRU2sv8609vEC4cSh1I",
  authDomain: "carbonwise-c60a4.firebaseapp.com",
  databaseURL: "https://carbonwise-c60a4-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "carbonwise-c60a4",
  storageBucket: "carbonwise-c60a4.appspot.com",
  messagingSenderId: "641740510902",
  appId: "1:641740510902:web:510f581b1ab9b914ab7817"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const db = getFirestore(app);
const auth = getAuth(app);
const rtdb = getDatabase(app);

export { db, auth, rtdb, databaseRef, onValue }; // Export databaseRef
