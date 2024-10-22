import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";

export const getAnnoncments = async () => {
  const snapshot = await getDocs(collection(db, "Annoncments"));
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

