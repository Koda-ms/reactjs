import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

let firebaseConfig = {
    apiKey: "AIzaSyBWLXXB54r3X650wiKz58EtbuO0ruQqUL0",
    authDomain: "systemcall-6d034.firebaseapp.com",
    projectId: "systemcall-6d034",
    storageBucket: "systemcall-6d034.appspot.com",
    messagingSenderId: "283799753815",
    appId: "1:283799753815:web:815afc5bee7679b653bf12",
    measurementId: "G-R3Z0K2VR3N"
};
  
firebase.initializeApp(firebaseConfig);

export default firebase;