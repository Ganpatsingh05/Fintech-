// ==============================
// Firebase Configuration File
// ==============================
// This file initializes Firebase and exports the Realtime Database
// for storing transaction data.

import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDummy",
  authDomain: "fintrack-8ab35.firebaseapp.com",
  databaseURL: "https://fintrack-8ab35-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "fintrack-8ab35",
  storageBucket: "fintrack-8ab35.appspot.com",
  messagingSenderId: "000000000000",
  appId: "1:000000000000:web:0000000000000000",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Realtime Database — used for reading/writing transaction data
export const db = getDatabase(app);

export default app;
