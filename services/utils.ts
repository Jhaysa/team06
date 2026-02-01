import { db } from './config';
import {
  addDoc,
  collection,
  doc,
  setDoc,
  getDocs,
  getDoc,
  updateDoc,
  deleteDoc,
  type DocumentData,
} from 'firebase/firestore';

export async function addDocument<T extends DocumentData = DocumentData>(
  collectionName: string,
  data: T,
  docID?: string
): Promise<string> {
  if (docID) {
    await setDoc(doc(db, collectionName, docID), data);
    return docID;
  } else {
    const docRef = await addDoc(collection(db, collectionName), data);
    return docRef.id;
  }
}

export async function getCollection<T extends DocumentData = DocumentData>(
  collectionName: string
): Promise<Array<T & { id: string }>> {
  const snapshot = await getDocs(collection(db, collectionName));
  return snapshot.docs.map((d) => ({ id: d.id, ...(d.data() as T) }));
}

export async function getDocument<T extends DocumentData = DocumentData>(
  collectionName: string,
  id: string
): Promise<T | null> {
  const docRef = doc(db, collectionName, id);
  const snap = await getDoc(docRef);
  if (!snap.exists()) return null;
  return snap.data() as T;
}

export async function updateDocument(
  collectionName: string,
  id: string,
  data: Partial<DocumentData>
): Promise<void> {
  const docRef = doc(db, collectionName, id);
  await updateDoc(docRef, data);
}

export async function deleteDocument(collectionName: string, id: string): Promise<void> {
  await deleteDoc(doc(db, collectionName, id));
}
