// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth/web-extension";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBBfbYruWnAMrA_AUuC6QwSFHa3VigPa7Y",
  authDomain: "fashion-mart-4613a.firebaseapp.com",
  projectId: "fashion-mart-4613a",
  storageBucket: "fashion-mart-4613a.firebasestorage.app",
  messagingSenderId: "619194199119",
  appId: "1:619194199119:web:7458724cc845297de40e3a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
export default auth