import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyC9i9jx7Wz1RBYx8MziXOdfVtu7Si64njvo",
  authDomain: "competition-foot.firebaseapp.com",
  projectId: "competition-foot",
  storageBucket: "competition-foot.appspot.com",
  messagingSenderId: "731546807160",
  appId: "1:731546807160:web:829b3101ee86d9a83bf68d"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
window.db = db;
