import React, { useState } from "react";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  Alert,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker"; // Import Picker

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
    price: "",
    category: "market", // Default category
  });

  const submit = async () => {
    if (form.description === "" || form.title === "" || !form.image || !form.price || !form.category) {
      return Alert.alert("Please provide all fields");
    }

    try {
      await announcementService.create({
        title: form.title,
        description: form.description,
        image: form.image,
        price: parseFloat(form.price),
        category: form.category, // Include category in the creation
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
        price: "",
        category: "market", // Reset category
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
            const numericValue = e.replace(/[^0-9.]/g, '');
            setForm({ ...form, price: numericValue });
          }}
          otherStyles="mt-7"
          keyboardType="numeric"
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

        {/* Category Picker */}
        <Text style={{ fontSize: 16, color: '#fff', marginTop: 20 }}>Category</Text>
        <Picker
          selectedValue={form.category}
          onValueChange={(itemValue, itemIndex) => setForm({ ...form, category: itemValue })}
          style={{ backgroundColor: '#fff', color: '#000', marginBottom: 20 }}
        >
          <Picker.Item label="Market" value="market" />
          <Picker.Item label="Bakery" value="bakery" />
          <Picker.Item label="Restaurants" value="restaurants" />
        </Picker>

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
