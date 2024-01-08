import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import config from './firebase.js'
import { getFirestore } from "firebase/firestore";

const app=initializeApp(config);

const storage = getFirestore(app);
const auth = getAuth(app);

export  {auth,storage};