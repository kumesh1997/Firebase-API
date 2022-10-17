import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyD3wBIObu1fdtdmY04AXojjw_S-GR7w-dA",
    authDomain: "fir-crud-efd96.firebaseapp.com",
    projectId: "fir-crud-efd96",
    storageBucket: "fir-crud-efd96.appspot.com",
    messagingSenderId: "698010456831",
    appId: "1:698010456831:web:edc364df3bf00963e272ca",
    measurementId: "G-6LFHEQ8NJE"
  };

  const app = initializeApp(firebaseConfig);
  export const db = getFirestore(app);