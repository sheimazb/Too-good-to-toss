import { Alert } from "react-native";
import { db } from "../config/firebase";

export const useAnnouncementService = () => {
  return {
    create: async (announcement) => {
      try {
        const docRef = await db.collection("Announcements").add({
          ...announcement,
          createdAt: new Date().toISOString(),
        });
        console.log("Announcement added with ID:", docRef.id);
        return docRef.id;
      } catch (error) {
        console.error("Error adding announcement:", error);
        Alert.alert(
          "Error",
          "Failed to create announcement. Please try again."
        );
        throw error;
      }
    },
  };
};

export default useAnnouncementService;
