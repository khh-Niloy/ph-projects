import React, { useEffect, useState } from "react";
import { auth } from "../Firebase/Firebase";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const AuthContext = React.createContext();
const AuthContextProvider = ({ children }) => {
  const [user, setuser] = useState(null);
  const [loading, setloading] = useState(true);

  function createUser(email, password) {
    setloading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function signInUser(email, password) {
    setloading(true);
    return signInWithEmailAndPassword(auth, email, password);
  }

  function signOutUser() {
    setloading(true);
    return signOut(auth);
  }

  function profileInfo(updateInfo) {
    updateProfile(auth.currentUser, updateInfo);
    setuser((prev) => ({
      ...prev,
      displayName: updateInfo.displayName,
      photoURL: updateInfo.photoURL,
    }));
  }


  const provider = new GoogleAuthProvider();
  function googleSignIn(){
    return signInWithPopup(auth, provider)
  }

  function toastShow(toastType, toastMssg) {
    toast[toastType]?.(`${toastMssg}`, {
      position: "top-center",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  }


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setuser(currentUser);
      setloading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        createUser,
        signInUser,
        user,
        signOutUser,
        profileInfo,
        loading,
        googleSignIn,
        toastShow
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
