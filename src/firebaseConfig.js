
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDG9QiR_vKONq7bUncNEP9TTrWbJQwbqnY",
  authDomain: "ozcan-aski.firebaseapp.com",
  projectId: "ozcan-aski",
  storageBucket: "ozcan-aski.firebasestorage.app",
  messagingSenderId: "906176009967",
  appId: "1:906176009967:web:33e1b56ca5b55bed112d1a"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
