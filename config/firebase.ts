import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Firebase Config
const firebaseConfig = {
  apiKey: 'AIzaSyDyF_dX0eMwvw3MGmsnUsP1NHybRGzMAzE',
  authDomain: '388749525367-1frbbgeg507rmt9kcmujicr26qet5058.apps.googleusercontent.com',
  projectId: 'byteme-a2fdf',
  storageBucket: 'byteme-a2fdf.appspot.com',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// if (!firebase.apps.length) {
//   firebase.initializeApp(firebaseConfig);
// }
