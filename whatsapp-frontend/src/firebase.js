import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyBI_ri9dRckmF29Bhw7UzyYXScYk9fD14g",
  authDomain: "whatsapp-30552.firebaseapp.com",
  projectId: "whatsapp-30552",
  storageBucket: "whatsapp-30552.appspot.com",
  messagingSenderId: "512942505070",
  appId: "1:512942505070:web:0dbec738a418b4ea3f3a7f"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth  = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider};
export default db;