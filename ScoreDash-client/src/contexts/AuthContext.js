import React, { useContext, useState, useEffect } from "react";
import { auth } from "../firebase";
import app from "firebase/app";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  function verify() {
    return auth.currentUser.sendEmailVerification();
  }

  function googleLogin() {
    const provider = new app.auth.GoogleAuthProvider();
    return auth.signInWithPopup(provider);
  }

  function facebookLogin() {
    const provider = new app.auth.FacebookAuthProvider();
    return auth.signInWithPopup(provider);
  }

  function logout() {
    return auth.signOut();
  }

  function getCurrentUser() {
    return auth;
  }
  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email);
  }

  function updateEmail(email) {
    return user.updateEmail(email);
  }

  function updatePassword(password) {
    return user.updatePassword(password);
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    user,
    setUser,
    login,
    verify,
    signup,
    googleLogin,
    facebookLogin,
    getCurrentUser,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
