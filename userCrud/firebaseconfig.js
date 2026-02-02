// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB4Kk3Dl5KvEESO4uczd-c0e4KB5U2eph8",
  authDomain: "usercrud-14a15.firebaseapp.com",
  projectId: "usercrud-14a15",
  storageBucket: "usercrud-14a15.firebasestorage.app",
  messagingSenderId: "330083576834",
  appId: "1:330083576834:web:4776d87f1682bb51f3cb1b",
  measurementId: "G-G9WSJHFKL6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };