import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updatePassword, sendPasswordResetEmail } from 'firebase/auth'
const firebaseConfig = {
  apiKey: "AIzaSyDm7QiAhvhRBYho_UkF_yub6P1ZW5Q28DA",
  authDomain: "eader-home.firebaseapp.com",
  projectId: "eader-home",
  storageBucket: "eader-home.appspot.com",
  messagingSenderId: "235621251100",
  appId: "1:235621251100:web:dc884ffd7f7203b6d1c7d9"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth()
const orders = collection(db, 'orders');
const payment = collection(db, 'payments');

export { db, orders, payment, auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updatePassword, sendPasswordResetEmail }