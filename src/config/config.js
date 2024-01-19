import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDZPof7BWLJwJPI10XIEbh9oJqk4tTS4QU",
  authDomain: "timetrackerflutterapp-cb3cc.firebaseapp.com",
  databaseURL:
    "https://timetrackerflutterapp-cb3cc-default-rtdb.firebaseio.com",
  projectId: "timetrackerflutterapp-cb3cc",
  storageBucket: "timetrackerflutterapp-cb3cc.appspot.com",
  messagingSenderId: "115231596806",
  appId: "1:115231596806:web:dfbeb00b6e7bbd2df93e87",
};

if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
}


export {firebase};