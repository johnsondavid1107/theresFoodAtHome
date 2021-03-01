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


const provider = new firebase.auth.GoogleAuthProvider();

export const signInWithGoogle = async() => {
  await auth.signInWithPopup(provider).then().catch(err=>{console.log(err)});
};

export const signOut =  ()=>{
        auth.signOut().then(() => {
                window.location.href="/"
              }).catch((error) => {
                console.log(error)      
              });
}

export const generateUserDocument = async (user, additionalData) => {
        if (!user) return;
        const userRef = firestore.doc(`users/${user.uid}`);
        const snapshot = await userRef.get();

        if (!snapshot.exists) {
                const { email, displayName, photoURL } = user;
                try {
                        await userRef.set({
                                displayName,
                                email,
                                photoURL,
                                ...additionalData
                        });
                } catch (error) {
                        console.error("Error creating user document", error);
                }
        }
        return getUserDocument(user.uid);
};

export const getUserDocument = async uid => {
        if (!uid) return null;
        try {
                const userDocument = await firestore.doc(`users/${uid}`).get();
                return {
                        uid,
                        ...userDocument.data()
                };
        } catch (error) {
                console.error("Error fetching user", error);
        }
};

