// Firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth"; // <-- add this

const firebaseConfig = {
  apiKey: "AIzaSyAjszJstEZreJh1NP1IAUFvh-zpT0heLQk",
  authDomain: "flex-arena-gym-store.firebaseapp.com",
  projectId: "flex-arena-gym-store",
  storageBucket: "flex-arena-gym-store.firebasestorage.app",
  messagingSenderId: "480072610137",
  appId: "1:480072610137:web:0a751590258cc818dd1c48",
  measurementId: "G-8FM7P1FTZD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Auth
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider(); // for Google login

// Export everything you need
export { app, analytics, auth, googleProvider };
