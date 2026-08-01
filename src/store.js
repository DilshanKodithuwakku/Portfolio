import {
  doc,
  getDoc,
  onSnapshot,
  setDoc,
} from 'firebase/firestore';

import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';

import { auth, db } from './firebase';
import defaultContent from './data/defaultContent';

const portfolioDocument = doc(db, 'portfolio', 'main');

export async function getContent() {
  const snapshot = await getDoc(portfolioDocument);

  if (snapshot.exists()) {
    return snapshot.data();
  }

  return defaultContent;
}

export function subscribeToContent(callback, onError) {
  const unsubscribe = onSnapshot(
    portfolioDocument,

    (snapshot) => {
      if (snapshot.exists()) {
        callback(snapshot.data());
      } else {
        /*
         * Do not try to create the document here.
         * Public visitors may not have write permission.
         */
        callback(defaultContent);
      }
    },

    (error) => {
      console.error(
        'Firestore portfolio listener error:',
        error,
      );

      if (onError) {
        onError(error);
      }
    },
  );

  return unsubscribe;
}

export async function saveContent(content) {
  await setDoc(
    portfolioDocument,
    content,
    {
      merge: false,
    },
  );
}

export async function resetContent() {
  await setDoc(
    portfolioDocument,
    defaultContent,
    {
      merge: false,
    },
  );
}

export async function login(email, password) {
  const credential =
    await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );

  return credential.user;
}

export async function logout() {
  await signOut(auth);
}

export function subscribeToAuthentication(callback) {
  return onAuthStateChanged(auth, callback);
}