// ==============================
// Firebase Configuration File
// ==============================
// This file initializes Firebase and exports the Realtime Database
// for storing transaction data.

import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDPlaceholder",
  authDomain: "fintrack-8ab35.firebaseapp.com",
  databaseURL: "https://fintrack-8ab35-default-rtdb.firebaseio.com",
  projectId: "fintrack-8ab35",
  storageBucket: "fintrack-8ab35.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Realtime Database — used for reading/writing transaction data
export const db = getDatabase(app);

export default app;
