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
    price: "", // Added price field
  });

  const submit = async () => {
    if (form.description === "" || form.title === "" || !form.image || !form.price) {
      return Alert.alert("Please provide all fields");
    }

    try {
      await announcementService.create({
        title: form.title,
        description: form.description,
        image: form.image,
        price: parseFloat(form.price), // Convert price to number
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
        price: "", // Reset price field
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
          title="Price"
          value={form.price}
          placeholder="Enter the price..."
          handleChangeText={(e) => {
            // Only allow numbers and decimal point
            const numericValue = e.replace(/[^0-9.]/g, '');
            setForm({ ...form, price: numericValue });
          }}
          otherStyles="mt-7"
          keyboardType="numeric" // Set keyboard type to numeric
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
