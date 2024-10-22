import firebase from 'firebase/compat/app';
import 'firebase/compat/auth'; // Import any other Firebase services you need
import 'firebase/compat/firestore';
import firebaseConfig from './firebaseConfig';

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const db = firebase.firestore();
export { firebase, db };
