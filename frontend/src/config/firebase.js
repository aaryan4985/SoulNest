// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { browserLocalPersistence, getAuth, inMemoryPersistence, setPersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAPbXLjIjrKze7prVJ0EIVfVBfqKNX5Kys",
  authDomain: "soul-nest.firebaseapp.com",
  projectId: "soul-nest",
  storageBucket: "soul-nest.firebasestorage.app",
  messagingSenderId: "977321981738",
  appId: "1:977321981738:web:6189e257a9d8961890d053"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export const db = getFirestore(app);

setPersistence(auth, browserLocalPersistence);
setPersistence(auth, inMemoryPersistence);

export { auth };