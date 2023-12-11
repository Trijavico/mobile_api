import { initializeApp } from "firebase/app";
import firebaseConfig from "./firebase.config";
import {getFirestore} from "firebase/firestore/lite"

const app = initializeApp(firebaseConfig.firebaseConfig);
const db = getFirestore(app);

export = {
    db,
    app
};