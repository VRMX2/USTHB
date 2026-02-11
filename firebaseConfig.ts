import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
// import { getAnalytics } from "firebase/analytics";

// Initialize Firebase
const firebaseConfig = {
    apiKey: "API_KEY_PLACEHOLDER",
    authDomain: "usthb-student-app-vrmx.firebaseapp.com",
    projectId: "usthb-student-app-vrmx",
    storageBucket: "usthb-student-app-vrmx.firebasestorage.app",
    messagingSenderId: "SENDER_ID_PLACEHOLDER",
    appId: "APP_ID_PLACEHOLDER"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
