// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBM6sEEQKsSMCRasKZPLh0rv84JyMuX9qI",
  authDomain: "lms-frp.firebaseapp.com",
  projectId: "lms-frp",
  storageBucket: "lms-frp.firebasestorage.app",
  messagingSenderId: "405005002205",
  appId: "1:405005002205:web:a33accf48e0b6533d9c234"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export {auth,db}
