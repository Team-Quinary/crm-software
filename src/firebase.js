// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:"AIzaSyDy0oOeCgm7wSiobokj390Pirm1wmg-X9Y",
  // process.env.REACT_APP_API_KEY ,
  authDomain:"react-chatapp-firebase-8e4a3.firebaseapp.com",
  // process.env.REACT_APP_AUTH_DOMAIN ,
  databaseURL:"http://react-chatapp-firebase-8e4a3.firebaseio.com",
  // process.env.REACT_APP_DATABASE_URL,
  projectId:"react-chatapp-firebase-8e4a3",
  // process.env.REACT_APP_PROJECT_ID,
  storageBucket:"react-chatapp-firebase-8e4a3.appspot.com",
  // process.env.REACT_APP_STORAGE_BUCKET ,
  messagingSenderId:"553889301431",
  // process.env.REACT_APP_MESSAGING_SENDER_ID ,
  appId:"1:553889301431:web:d2050572950eaff5f41e32",
  // process.env.REACT_APP_APP_ID 
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export {auth, db};