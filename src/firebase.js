// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyABOL7ckS4Pcb2e2wQSckUS2IoKbDFkbOM",
  authDomain: "realtor-clone-55fc4.firebaseapp.com",
  projectId: "realtor-clone-55fc4",
  storageBucket: "realtor-clone-55fc4.firebasestorage.app",
  messagingSenderId: "461992454643",
  appId: "1:461992454643:web:b79275b7b31d8e0ac70a86",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
