import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA2Wdv6IObi_RPdW70RFAG0fdQ3C91jNAs",
  authDomain: "madchef-next-js.firebaseapp.com",
  projectId: "madchef-next-js",
  storageBucket: "madchef-next-js.firebasestorage.app",
  messagingSenderId: "309299924587",
  appId: "1:309299924587:web:6250bf073436df3ff96b2e",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
