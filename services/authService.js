import { firebase } from "../config/firebase";
import { Alert } from "react-native";

export const authService = {
  register: async (email, password) => {
    try {
      const userCredential = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
      return userCredential.user;
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    }
  },
  login: async (email, password) => {
    try {
      const userCredential = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);
      return userCredential.user;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  },
  signOut: async () => {
    try {
      await firebase.auth().signOut();
    } catch (error) {
      console.error("Error signing out:", error);
      Alert.alert("Error", "Failed to sign out");
    }
  },
};
