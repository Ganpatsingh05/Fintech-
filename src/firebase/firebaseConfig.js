// ==============================
// Firebase Configuration File
// ==============================
// This file initializes Firebase and exports Firestore
// for storing transaction data.

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

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

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firestore — used for reading/writing transaction data
export const db = getFirestore(app);

export default app;
