// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDF0CfOCIufPuQw6TZgtj6sxkswLhY_54c",
  authDomain: "tarot-profile.firebaseapp.com",
  projectId: "tarot-profile",
  storageBucket: "tarot-profile.firebasestorage.app",
  messagingSenderId: "55016854558",
  appId: "1:55016854558:web:60443b474c6c686d108a0f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Auth stuff
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export default app;