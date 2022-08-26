import firebase from "firebase/app";
import 'firebase/auth';
import "firebase/firestore";
import "firebase/storage";


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDm7QiAhvhRBYho_UkF_yub6P1ZW5Q28DA",
    authDomain: "eader-home.firebaseapp.com",
    projectId: "eader-home",
    storageBucket: "eader-home.appspot.com",
    messagingSenderId: "235621251100",
    appId: "1:235621251100:web:dc884ffd7f7203b6d1c7d9"
  };

firebase.initializeApp(firebaseConfig);

