// ==============================
// Firebase Configuration File
// ==============================
// This file initializes Firebase and exports the Realtime Database
// and Authentication instances for the app.

import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBWZliIKDx-37YGZ0AGAY48cLEGgXwthDE",
  authDomain: "fintrack-8ab35.firebaseapp.com",
  databaseURL: "https://fintrack-8ab35-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "fintrack-8ab35",
  storageBucket: "fintrack-8ab35.firebasestorage.app",
  messagingSenderId: "723929733457",
  appId: "1:723929733457:web:095a874e28b3c8e646db70",
  measurementId: "G-H4TLDQWK45",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Realtime Database — used for reading/writing transaction data
export const db = getDatabase(app);

// Firebase Authentication — login/signup
export const auth = getAuth(app);

export default app;
