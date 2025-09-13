
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDS3r11CyVYkTK-c3gWha2aAD9O6Ax8eQY",
  authDomain: "studio-7590879981-70af3.firebaseapp.com",
  projectId: "studio-7590879981-70af3",
  storageBucket: "studio-7590879981-70af3.appspot.com",
  messagingSenderId: "1030206573250",
  appId: "1:1030206573250:web:743b2803c06a71c73d495b"
};


const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { app, db, auth, storage };
