import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

let firebaseConfig = {
    apiKey: "AIzaSyA_OdS_4Ba_w_WqZ13vPqykePosj3gWWEE",
    authDomain: "callsystem-2edfd.firebaseapp.com",
    projectId: "callsystem-2edfd",
    storageBucket: "callsystem-2edfd.appspot.com",
    messagingSenderId: "37104387634",
    appId: "1:37104387634:web:a42f4393069183942e9e2b"
};
  
firebase.initializeApp(firebaseConfig);

export default firebase;