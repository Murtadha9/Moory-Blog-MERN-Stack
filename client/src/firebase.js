
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_KEY,
  authDomain: "bloggy-moory.firebaseapp.com",
  projectId: "bloggy-moory",
  storageBucket: "bloggy-moory.appspot.com",
  messagingSenderId: "963218590817",
  appId: "1:963218590817:web:43a8418a12c0227579ae20"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);