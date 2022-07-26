import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAYrs7nFfJ5SsulcQeL9WrM7nVwqPXI_J4",
  authDomain: "sbsc-9d988.firebaseapp.com",
  projectId: "sbsc-9d988",
  storageBucket: "sbsc-9d988.appspot.com",
  messagingSenderId: "261315757355",
  appId: "1:261315757355:web:01cac1bc79bdfb8b0cf16e"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);