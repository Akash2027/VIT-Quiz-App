import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAwPpu-tIyO7QtCuCH5p57o37pkcrXN9Vs",
  authDomain: "vit-quiz-portal.firebaseapp.com",
  projectId: "vit-quiz-portal",
  storageBucket: "vit-quiz-portal.firebasestorage.app",
  messagingSenderId: "471877528223",
  appId: "1:471877528223:web:2fce2aa781a094209410aa",
  measurementId: "G-7RK5FCKLBT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export services to use in your Pages
export const auth = getAuth(app);
export const db = getFirestore(app);