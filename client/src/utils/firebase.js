import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";


const firebaseConfig = {
    
        apiKey: "AIzaSyD8Y600wLziOGLXK_1L0nR5dTbD9YAG9DM",
        authDomain: "theresfoodathome-810cc.firebaseapp.com",
        projectId: "theresfoodathome-810cc",
        storageBucket: "theresfoodathome-810cc.appspot.com",
        messagingSenderId: "40998373485",
        appId: "1:40998373485:web:5fe99aaf21d4f35607d764"
    
}


firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebase.firestore();