// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBtoaA-jOSpm7lbkQdSTKW-5I8a1r7RlDc",
  authDomain: "ocomni-data.firebaseapp.com",
  projectId: "ocomni-data",
  storageBucket: "ocomni-data.appspot.com",
  messagingSenderId: "884490326410",
  appId: "1:884490326410:web:4cd1e29a1e439efdadf873",
  measurementId: "G-DQ98H2LL5P",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);
