// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC_NQwrD1hwrh4de2cqM8AF-p6I7oA3qoA",
    authDomain: "global-sourysco.firebaseapp.com",
    projectId: "global-sourysco",
    storageBucket: "global-sourysco.appspot.com",
    messagingSenderId: "791844601855",
    appId: "1:791844601855:web:4b4e3b2d44c7c678a9f1ca",
    measurementId: "G-Y99XTFHFK6"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore();