
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBWZliIKDx-37YGZ0AGAY48cLEGgXwthDE",
  authDomain: "fintrack-8ab35.firebaseapp.com",
  projectId: "fintrack-8ab35",
  storageBucket: "fintrack-8ab35.firebasestorage.app",
  messagingSenderId: "723929733457",
  appId: "1:723929733457:web:095a874e28b3c8e646db70",
  measurementId: "G-H4TLDQWK45",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const auth = getAuth(app);

export default app;
