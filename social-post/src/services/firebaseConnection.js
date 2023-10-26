// Import the functions you need from the SDKs you need
import firebase from "firebase/app";
import 'firebase/auth'
import 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB4zJATJd_PFeYw3s-EC9Q44l09a15ghjk",
  authDomain: "socialpost-252d1.firebaseapp.com",
  projectId: "socialpost-252d1",
  storageBucket: "socialpost-252d1.appspot.com",
  messagingSenderId: "588838739459",
  appId: "1:588838739459:web:de873fd4d8c45bf6f07836"
};
//se nao existir nenhuma conexão com o firebase..
if(!firebase.apps.length){
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
}

export default firebase;
