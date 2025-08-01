// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBdVEhGTqBmHjS6NSnJ1FC26Ns1wFX0NcA",
  authDomain: "nowquiz-80c34.firebaseapp.com",
  projectId: "nowquiz-80c34",
  storageBucket: "nowquiz-80c34.firebasestorage.app",
  messagingSenderId: "628365724942",
  appId: "1:628365724942:web:1e0db52f7fc6deb19cdb5f",
  measurementId: "G-8BGT3F01N6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
