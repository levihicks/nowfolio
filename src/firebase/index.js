import * as firebase from 'firebase/app';
import "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDxha7T391hwE6akFz9mmHYn0V1HPvr9QQ",
    authDomain: "nowfolio.firebaseapp.com",
    databaseURL: "https://nowfolio.firebaseio.com",
    projectId: "nowfolio",
    storageBucket: "nowfolio.appspot.com",
    messagingSenderId: "1044388391125",
    appId: "1:1044388391125:web:e2986082da9268a1989a5c",
    measurementId: "G-TY1S3P0XTG"
  };

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

export const doCreateUserWithEmailAndPassword = (email, password) =>
    auth.createUserWithEmailAndPassword(email, password);

export const doSignInWithEmailAndPassword = (email, password) =>
    auth.signInWithEmailAndPassword(email, password);

export const doSignOut = () => 
    auth.signOut();

export const authObserver = (success, fail) => 
    auth.onAuthStateChanged(authUser => {
        if(authUser) 
            success(authUser)
        else
            fail();
    });