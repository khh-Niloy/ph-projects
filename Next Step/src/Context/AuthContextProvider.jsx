import React, { useEffect, useState } from "react";
import { auth } from "../Firebase/Firebase";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const AuthContext = React.createContext();
const AuthContextProvider = ({ children }) => {
  const [user, setuser] = useState(null);
  const [loading, setloading] = useState(true);
  const [loginPageEmail, setloginPageEmail] = useState("");

  function createUser(email, password) {
    setloading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function signInUser(email, password) {
    setloading(true);
    return signInWithEmailAndPassword(auth, email, password);
  }

  const provider = new GoogleAuthProvider();
  function googleSignIn() {
    setloading(true);
    return signInWithPopup(auth, provider);
  }

  function signOutUser() {
    setloading(true);
    return signOut(auth);
  }

  function resetPass(email) {
    setloading(true);
    return sendPasswordResetEmail(auth, email);
  }

  async function profileInfo(updateInfo) {
    await updateProfile(auth.currentUser, updateInfo);
    setuser((prev) => ({
      ...prev,
      displayName: updateInfo.displayName,
      photoURL: updateInfo.photoURL,
    }));
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

  return (
    <AuthContext.Provider
      value={{
        createUser,
        signInUser,
        googleSignIn,
        user,
        signOutUser,
        toastShow,
        profileInfo,
        loading,
        setuser,
        setloading,
        loginPageEmail,
        setloginPageEmail,
        resetPass,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
