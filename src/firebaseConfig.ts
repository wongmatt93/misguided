import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCy2PD_dIpKwcwVverekLii21R1RzjqzCQ",
  authDomain: "bad-trip-advisor-v2.firebaseapp.com",
  projectId: "bad-trip-advisor-v2",
  storageBucket: "bad-trip-advisor-v2.appspot.com",
  messagingSenderId: "328786293932",
  appId: "1:328786293932:web:fdd81aeab2c41f91729b09",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

const authProvider = new GoogleAuthProvider();

export function signInWithGoogle(): void {
  signInWithPopup(auth, authProvider);
}

export function signOut(): void {
  auth.signOut();
}

export const storage = getStorage(app);
