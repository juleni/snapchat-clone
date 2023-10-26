import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAOZGa42TYKJAjwyeeeMt3dj6fon6EhKYw",
  authDomain: "snapchat-clone-5a003.firebaseapp.com",
  projectId: "snapchat-clone-5a003",
  storageBucket: "snapchat-clone-5a003.appspot.com",
  messagingSenderId: "28564123444",
  appId: "1:28564123444:web:0e93cefc7a1d49c2d67f61",
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth();
const storage = getStorage(firebaseApp);
const provider = new GoogleAuthProvider();

// provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

export { db, auth, storage, provider };
