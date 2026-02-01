import { auth, db, storage } from "./config";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import {
  collectionimport { auth, db, storage } from "./config";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import {
  collection,
  addDoc,
  setDoc,
  doc,
  getDocs,
  getDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  type DocumentData,
  type CollectionReference,
  type WhereFilterOp,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

/**
 * Sign in with email and password
 */
export async function signIn(email: string, password: string) {
  return signInWithEmailAndPassword(auth, email, password);
}

/**
 * Sign up with email and password
 */
export async function signUp(email: string, password: string) {
  return createUserWithEmailAndPassword(auth, email, password);
}

/**
 * Sign out current user
 */
export async function signOut() {
  return firebaseSignOut(auth);
}

/**
 * Listen for auth state changes
 */
export function onAuthChange(cb: (user: User | null) => void) {
  return onAuthStateChanged(auth, cb);
}

/**
 * Add a document to a Firestore collection
 */
export async function addDocument<T extends DocumentData = DocumentData>(
  collectionPath: string,
  data: T,
  docID?: string
) {
  const _colRef = collection(db, collectionPath) as CollectionReference<T>;
  if (docID) {
    // Set using provided id
    const docRef = doc(db, collectionPath, docID);
    await setDoc(docRef, data);
    return docID;
  }

  const docRef = await addDoc(_colRef, data as T);
  return docRef.id;
}

/**
 * Get all documents from a Firestore collection
 */
export async function getCollection<T = DocumentData>(collectionPath: string): Promise<Array<T & { id: string }>> {
  const colRef = collection(db, collectionPath) as CollectionReference<T>;
  const snap = await getDocs(colRef);
  return snap.docs.map((d) => ({ id: d.id, ...(d.data() as T) }));
}

export async function getDocument<T = DocumentData>(collectionPath: string, id: string): Promise<T | null> {
  const docRef = doc(db, collectionPath, id);
  const snap = await getDoc(docRef);
  if (!snap.exists()) return null;
  return snap.data() as T;
}

export async function updateDocument(collectionPath: string, id: string, data: Partial<DocumentData>): Promise<void> {
  const docRef = doc(db, collectionPath, id);
  await updateDoc(docRef, data);
}

export async function deleteDocument(collectionPath: string, id: string): Promise<void> {
  const docRef = doc(db, collectionPath, id);
  await deleteDoc(docRef);
}

/**
 * Upload a file to Firebase Storage
 */
export async function uploadFile(
  path: string,
  file: Blob | Uint8Array | ArrayBuffer
) {
  const storageRef = ref(storage, path);

  // Convert ArrayBuffer to Uint8Array if needed
  const uploadData =
    file instanceof ArrayBuffer ? new Uint8Array(file) : file;

  await uploadBytes(storageRef, uploadData);
  return getDownloadURL(storageRef);
}

/**
 * Query a Firestore collection with filters
 */
export async function queryCollection<T = DocumentData>(
  collectionPath: string,
  field: string,
  op: WhereFilterOp,
  value: unknown
) {
  const q = query(collection(db, collectionPath), where(field, op, value));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...(d.data() as T) }));
}
,
  addDoc,
  getDocs,
  query,
  where,
  DocumentData,
  CollectionReference,
  WhereFilterOp,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

/**
 * Sign in with email and password
 */
export async function signIn(email: string, password: string) {
  return signInWithEmailAndPassword(auth, email, password);
}

/**
 * Sign up with email and password
 */
export async function signUp(email: string, password: string) {
  return createUserWithEmailAndPassword(auth, email, password);
}

/**
 * Sign out current user
 */
export async function signOut() {
  return firebaseSignOut(auth);
}

/**
 * Listen for auth state changes
 */
export function onAuthChange(cb: (user: User | null) => void) {
  return onAuthStateChanged(auth, cb);
}

/**
 * Add a document to a Firestore collection
 */
export async function addDocument<T = DocumentData>(
  collectionPath: string,
  data: T
) {
  const colRef = collection(db, collectionPath) as CollectionReference<T>;
  return addDoc(colRef, data);
}

/**
 * Get all documents from a Firestore collection
 */
export async function getCollection<T = DocumentData>(collectionPath: string) {
  const colRef = collection(db, collectionPath) as CollectionReference<T>;
  const snap = await getDocs(colRef);
  return snap.docs.map((d) => ({ id: d.id, ...(d.data() as T) }));
}

/**
 * Upload a file to Firebase Storage
 */
export async function uploadFile(
  path: string,
  file: Blob | Uint8Array | ArrayBuffer
) {
  const storageRef = ref(storage, path);

  // Convert ArrayBuffer to Uint8Array if needed
  const uploadData =
    file instanceof ArrayBuffer ? new Uint8Array(file) : file;

  await uploadBytes(storageRef, uploadData);
  return getDownloadURL(storageRef);
}

/**
 * Query a Firestore collection with filters
 */
export async function queryCollection<T = DocumentData>(
  collectionPath: string,
  field: string,
  op: WhereFilterOp,
  value: unknown
) {
  const q = query(collection(db, collectionPath), where(field, op, value));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...(d.data() as T) }));
}
