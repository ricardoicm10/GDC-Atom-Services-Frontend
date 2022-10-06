// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import {getStorage} from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDrRFQphu4oIeWlYgzwj0ROtG9mbN7ZKFs",
  authDomain: "gdc-atom-services.firebaseapp.com",
  projectId: "gdc-atom-services",
  storageBucket: "gdc-atom-services.appspot.com",
  messagingSenderId: "846376038866",
  appId: "1:846376038866:web:4173b6f2c90c91f452580b",
  measurementId: "G-N65FELRF42"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
export const storage = getStorage(app)