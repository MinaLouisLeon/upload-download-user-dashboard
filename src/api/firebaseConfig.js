// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAtHAVsIQcEdL6FSWc22TOFGPPZBKRkdsk",
  authDomain: "xdevmdemo.firebaseapp.com",
  projectId: "xdevmdemo",
  storageBucket: "xdevmdemo.appspot.com",
  messagingSenderId: "733569911480",
  appId: "1:733569911480:web:651d4346ddf1f778f4024d",
  measurementId: "G-3VZ0NNZ7XP"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore();
export const storage = getStorage(app);