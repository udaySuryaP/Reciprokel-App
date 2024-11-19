import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, serverTimestamp} from 'firebase/firestore';

const firebaseConfig = {

    apiKey: "AIzaSyBVdTECNPVWilgl004_BEoIPeNRZy7ue2E",

    authDomain: "reciprokel.firebaseapp.com",

    projectId: "reciprokel",

    storageBucket: "reciprokel.firebasestorage.app",

    messagingSenderId: "229742685890",

    appId: "1:229742685890:web:0d34df8f79bee78019d55b",

    measurementId: "G-Y3W32QD1Y2"

  };

const app = initializeApp(firebaseConfig);

  // Initialize Firestore
const db = getFirestore(app);
  
export { db, serverTimestamp,collection,addDoc };