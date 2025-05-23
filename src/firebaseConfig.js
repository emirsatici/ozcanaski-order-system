// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDG9QiR_vKONq7bUncNEP9TTrWbJQwbqnY",
  authDomain: "ozcan-aski.firebaseapp.com",
  projectId: "ozcan-aski",
  storageBucket: "ozcan-aski.appspot.com",
  messagingSenderId: "906176009967",
  appId: "1:906176009967:web:827a212ecfc561f9112d1a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
