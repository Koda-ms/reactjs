import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCGuUWOEUg_1ZE5uKwZnHOjN-Is1dnVeLQ",
    authDomain: "cursoreact-239e1.firebaseapp.com",
    projectId: "cursoreact-239e1",
    storageBucket: "cursoreact-239e1.appspot.com",
    messagingSenderId: "951802903752",
    appId: "1:951802903752:web:7371a3f7082da01dc2b9fd",
    measurementId: "G-4SX5BM3LCB"
};

const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export { db, auth };