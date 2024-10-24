import {
  collection,
  getDocs,
  addDoc,
  query,
  orderBy,
  doc,
  getDoc,
} from "firebase/firestore";
import { db } from "../config/firebase";

export const getAnnoncments = async () => {
  const q = query(
    collection(db, "Announcements"),
    orderBy("createdAt", "desc")
  );

  const snapshot = await getDocs(q);
  const announcements = await Promise.all(
    snapshot.docs.map(async (docSnapshot) => {
      const announcementData = docSnapshot.data();
      const idResto = announcementData.idResto;
      const userRef = doc(db, "users", idResto);
      const userSnapshot = await getDoc(userRef);
      const userData = userSnapshot.data();
      console.log("userData", userData);
      return {
        id: docSnapshot.id,
        ...announcementData,
        price: parseFloat(announcementData.price) || 0,
        createdAt: announcementData.createdAt || new Date().toISOString(),
        ownerEmail: userData ? userData.email : null, // Assuming 'email' is the field for user's email
        ownerName: userData ? userData.name : null, // Assuming 'name' is the field for user's name
      };
    })
  );

  return announcements;
};

export const createCommande = async (commande) => {
  const docRef = await addDoc(collection(db, "Commandes"), commande);
  return docRef.id;
};

export const getCommandes = async () => {
  const snapshot = await getDocs(collection(db, "Commandes"));
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};