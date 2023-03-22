import * as firebase from 'firebase/compat';
import '@firebase/auth';
import '@firebase/firestore';

import { firebaseConfig } from '../../credentials/secret';

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };