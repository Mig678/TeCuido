import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAvEh61Dh1HJM5KiEE0--olPeMX7xflnb4",
  authDomain: "tecuido-ea37e.firebaseapp.com",
  projectId: "tecuido-ea37e",
  storageBucket: "tecuido-ea37e.firebasestorage.app",
  messagingSenderId: "611774216477",
  appId: "1:611774216477:web:0c4ab188a332629d1bc9f4",
  measurementId: "G-CGBT5BR7MM"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const signIn = () => signInWithPopup(auth, provider);
const logout = () => signOut(auth);

export { auth, signIn, logout };
