import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "../config/firebase";

export const getAnnoncments = async () => {
  const snapshot = await getDocs(collection(db, "Announcements"));
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const createCommande = async (commande) => {
  const docRef = await addDoc(collection(db, "Commandes"), commande);
  return docRef.id; // Retourner l'ID de la nouvelle commande
};
