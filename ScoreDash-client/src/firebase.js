import firebase from "firebase/app";
import "firebase/auth";

const firebase_config = {
  apiKey: "AIzaSyB04DScTVWLSgsL9kwlLwJn2gzaP9QEDfc",
  authDomain: "scoredash.firebaseapp.com",
  projectId: "scoredash",
  storageBucket: "scoredash.appspot.com",
  messagingSenderId: "195312883183",
  appId: "1:195312883183:web:8aff5358de97216f52921a",
};

const app = firebase.initializeApp(firebase_config);

export const auth = app.auth();
export default app;
