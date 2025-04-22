
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, } from 'https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBrG3emfLkcf9SLZ7BW_RXIKJyhC0cKeKg",
    authDomain: "trndx-fashion-store.firebaseapp.com",
    projectId: "trndx-fashion-store",
    storageBucket: "trndx-fashion-store.firebasestorage.app",
    messagingSenderId: "1088147142592",
    appId: "1:1088147142592:web:cd5114f3e5d88175d9fa25",
    measurementId: "G-10GNV6851B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

export { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword}
