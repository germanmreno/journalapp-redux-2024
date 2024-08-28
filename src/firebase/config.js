// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDttLuhH9h_MGNYpIhy-cj4myxLKr5k_5I',
  authDomain: 'journal-app-react-a4b24.firebaseapp.com',
  projectId: 'journal-app-react-a4b24',
  storageBucket: 'journal-app-react-a4b24.appspot.com',
  messagingSenderId: '631987453683',
  appId: '1:631987453683:web:6c533acbadcf291d7f8186',
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);

export const FirebaseAuth = getAuth(FirebaseApp);

export const FireBaseDB = getFirestore(FirebaseApp);
