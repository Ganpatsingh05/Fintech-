// ==============================
// Firebase Configuration File
// ==============================
// This file initializes Firebase and exports the services we need:
// 1. Authentication (for login/signup)
// 2. Firestore Database (for storing transactions)

// Step 1: Import the Firebase SDK functions we need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";           // For user authentication
import { getFirestore } from "firebase/firestore"; // For database operations

// Step 2: Your Firebase project configuration
// 🔧 REPLACE these values with your own Firebase project credentials
// Go to: Firebase Console → Project Settings → General → Your Apps → Config
const firebaseConfig = {
  apiKey: "YOUR_API_KEY_HERE",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID",
};

// Step 3: Initialize Firebase app with the config above
const app = initializeApp(firebaseConfig);

// Step 4: Create and export service instances
// 'auth' — used for signup, login, logout, and checking current user
export const auth = getAuth(app);

// 'db' — used for reading/writing transaction data in Firestore
export const db = getFirestore(app);

// Step 5: Export the app instance (optional, in case we need it later)
export default app;
