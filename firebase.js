// Firebase Configuration

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";

const firebaseConfig = {
  apiKey: "AIzaSyDrCU4rrwPAKWLmX60NXjUKXu0wtL0jiGA",
  authDomain: "quick-information-5adff.firebaseapp.com",
  projectId: "quick-information-5adff",
  storageBucket: "quick-information-5adff.firebasestorage.app",
  messagingSenderId: "958042278145",
  appId: "1:958042278145:web:c259453253ba2e1026f300"
};

const app = initializeApp(firebaseConfig);

export { app };