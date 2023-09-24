import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";
import { getDatabase } from "firebase/database";
import { writeUserData } from "./api";

const firebaseConfig = {
  apiKey: "AIzaSyBOvNqqsbFzvMrb1G5vA3eq5r0oaNCTw-U",
  authDomain: "filmsmatch-e729e.firebaseapp.com",
  databaseURL:
    "https://filmsmatch-e729e-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "filmsmatch-e729e",
  storageBucket: "filmsmatch-e729e.appspot.com",
  messagingSenderId: "222304334340",
  appId: "1:222304334340:web:58fa896d69ebff67f77b51",
  measurementId: "G-N8LG4SKY1R",
};
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);

const provider = new GoogleAuthProvider();
export const auth = getAuth(app);

export const signInWithGoogle = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      const name = result.user.displayName as string;
      const email = result.user.email as string;
      const avatar = result.user.photoURL as string;
      const uid = result.user.uid;

      localStorage.setItem("name", name as string);
      localStorage.setItem("email", email as string);
      localStorage.setItem("avatar", avatar as string);
      localStorage.setItem("uid", uid as string);
      writeUserData(uid, email, avatar, name);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const signOutWithGoogle = () => {
  signOut(auth);
};
