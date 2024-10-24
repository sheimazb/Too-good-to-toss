import {
  collection,
  getDocs,
  addDoc,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "../config/firebase";

export const getAnnoncments = async () => {
  const q = query(
    collection(db, "Announcements"),
    orderBy("createdAt", "desc")
  );

  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
    price: parseFloat(doc.data().price) || 0,
    createdAt: doc.data().createdAt || new Date().toISOString(),
  }));
};

export const createCommande = async (commande) => {
  const docRef = await addDoc(collection(db, "Commandes"), commande);
  return docRef.id;
};
