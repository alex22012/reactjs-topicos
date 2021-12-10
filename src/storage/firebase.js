import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

const firebaseConfig = {

  apiKey: "AIzaSyCFn9UcM8b5NkvH1oiEQLa1nQ9qkb4-quM",

  authDomain: "escola-e7d9b.firebaseapp.com",

  projectId: "escola-e7d9b",

  storageBucket: "escola-e7d9b.appspot.com",

  messagingSenderId: "83233590816",

  appId: "1:83233590816:web:d3a09e6104134f5b88f645"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);

export default app