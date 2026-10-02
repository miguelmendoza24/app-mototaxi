
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyDUCpMoOli0puzdM05kJekJ-UL5QX2itLc",
  authDomain: "app-mototaxi-646d4.firebaseapp.com",
  projectId: "app-mototaxi-646d4",
  storageBucket: "app-mototaxi-646d4.firebasestorage.app",
  messagingSenderId: "786232525830",
  appId: "1:786232525830:web:4ff3ac72a0d89daf266f87"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);