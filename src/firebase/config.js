// import core firebase
import firebase from "firebase/app";

// import firestore
import "firebase/firestore";

// import firebase auth
import "firebase/auth";

// config data from firebase
const firebaseConfig = {
  apiKey: "AIzaSyDz1C5VoOKmP9zhRuLbX2uZSfXbJI5p4PA",
  authDomain: "ramz-vue-sites.firebaseapp.com",
  projectId: "ramz-vue-sites",
  storageBucket: "ramz-vue-sites.appspot.com",
  messagingSenderId: "541492304648",
  appId: "1:541492304648:web:b2930c34768a1129b8aabd",
};

// init firebase
firebase.initializeApp(firebaseConfig);

// init firebase auth
const projectAuth = firebase.auth();

// init firestore
const projectFirestore = firebase.firestore();

// init timestamp
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { projectAuth, projectFirestore, timestamp };
