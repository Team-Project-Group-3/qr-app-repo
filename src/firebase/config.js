import * as firebase from 'firebase/compat';
import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyC1wIp0MXamIy6znkw_N_FyMs3GkngnPsc",
  authDomain: "qrapp-fe2f3.firebaseapp.com",
  projectId: "qrapp-fe2f3",
  storageBucket: "qrapp-fe2f3.appspot.com",
  messagingSenderId: "160703065138",
  appId: "1:160703065138:web:c9a18cc5a3ca9b3d76a02b",
  measurementId: "G-6KT4FGFG97"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };