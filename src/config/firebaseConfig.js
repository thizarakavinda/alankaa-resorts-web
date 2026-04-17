import { initializeApp, getApps } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBzkJ8CAUTnWVVikeMYMWFjrJ7TF7hXOjg",
  authDomain: "alankaa-35cea.firebaseapp.com",
  projectId: "alankaa-35cea",
  storageBucket: "alankaa-35cea.firebasestorage.app",
  messagingSenderId: "985157684961",
  appId: "1:985157684961:web:6ecf92b2724d727abf71a0",
  measurementId: "G-QNL5EKK37T",
};

// Initialize Firebase app
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

// Initialize Database
const database = getDatabase(app);
const storage = getStorage(app);
export { database, storage };
