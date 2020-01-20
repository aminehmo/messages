import firebase from "@firebase/app";
import "@firebase/firestore";

// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
  apiKey: "AIzaSyAEwJSqSZ-uvSeftB5MusT4LibSD8y-d0I",
  authDomain: "messages-11ea9.firebaseapp.com",
  databaseURL: "https://messages-11ea9.firebaseio.com",
  projectId: "messages-11ea9",
  storageBucket: "messages-11ea9.appspot.com",
  messagingSenderId: "846179048567",
  appId: "1:846179048567:web:55abb51b4d97e421ea7a72",
  measurementId: "G-L63BPX4VCC"
});

//we will access fire store from here:

export default firebase.firestore();
