import firebase from "firebase/compat/app"
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyA8vQSHnndXVZZRTReUGDfQSUp1WcwpWgI",
  authDomain: "react-proyect-3eaf7.firebaseapp.com",
  projectId: "react-proyect-3eaf7",
  storageBucket: "react-proyect-3eaf7.appspot.com",
  messagingSenderId: "480649517523",
  appId: "1:480649517523:web:26775cc8808d66cacb3726",
  measurementId: "G-LFWL95MSYK",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const store = getFirestore(app)

export {store}