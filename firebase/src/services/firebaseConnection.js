import firebase from "firebase/app";
import 'firebase/firestore'
import 'firebase/auth'

let firebaseConfig = {
    apiKey: "AIzaSyDy_ncc6Oj1UrMKvKk_VcyNcOzebzV30zU",
    authDomain: "vueapp-5c92b.firebaseapp.com",
    projectId: "vueapp-5c92b",
    storageBucket: "vueapp-5c92b.appspot.com",
    messagingSenderId: "788526786389",
    appId: "1:788526786389:web:2746c2e56bcd81d9c931dc",
    measurementId: "G-58GYRGQ5GB"
  };

  if(!firebase.apps.length){
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
  }

  export default firebase