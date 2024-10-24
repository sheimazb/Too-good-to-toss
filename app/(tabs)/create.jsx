import React, { useState } from "react";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  Alert,
  ScrollView,
} from "react-native";

import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";

import { useGlobalContext } from "../../context/GlobalProvider";
import { useAnnouncementService } from "../../services/announcementService";

const Create = () => {
  const { user } = useGlobalContext();
  const announcementService = useAnnouncementService();
  
  const [form, setForm] = useState({
    title: "",
    image: "",
    description: "",
  });

  const submit = async () => {
    if (form.description === "" || form.title === "" || !form.image) {
      return Alert.alert("Please provide all fields");
    }

    try {
      await announcementService.create({
        title: form.title,
        description: form.description,
        image: form.image,
        idResto: user.uid
      });

      Alert.alert("Success", "Announcement created successfully");
      router.push("/home");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setForm({
        title: "",
        image: "",
        description: "",
      });
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="px-4 my-6">
        <Text className="text-2xl text-white font-psemibold">Create Announcement</Text>

        <FormField
          title="Announcement Title"
          value={form.title}
          placeholder="Give your announcement a catchy title..."
          handleChangeText={(e) => setForm({ ...form, title: e })}
          otherStyles="mt-10"
        />

        <FormField
          title="Image URL"
          value={form.image}
          placeholder="Paste the URL of your image..."
          handleChangeText={(e) => setForm({ ...form, image: e })}
          otherStyles="mt-7"
        />

        <FormField
          title="Description"
          value={form.description}
          placeholder="Describe your announcement..."
          handleChangeText={(e) => setForm({ ...form, description: e })}
          otherStyles="mt-7"
          multiline={true}
          numberOfLines={4}
        />

        <CustomButton
          title="Submit & Publish"
          handlePress={submit}
          containerStyles="mt-7"
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Create;
