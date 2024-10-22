import { ScrollView, Text, View, Image } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { authService } from "../../services/authService";
import { Link } from "expo-router";

const SignUp = () => {
  const [form, setForm] = useState({
    username: "",
    phoneNumber: "",
    city: "",
    email: "",
    password: "",  // Changed to lowercase
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isValidEmail = (email) => {
    // Basic email validation regex
    return /\S+@\S+\.\S+/.test(email);
  };

  const submit = async () => {
    if (!form.username || !form.email || !form.password) {
      console.error("Please fill in all required fields");
      return;
    }

    if (!isValidEmail(form.email)) {
      console.error("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);
    try {
      const user = await authService.register(form.email, form.password);
      console.log("User registered successfully:", user);
      // Navigate to next screen or show success message
    } catch (error) {
      console.error("Registration failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[83vh] px-4 my-6">
          <Image source={images.logo} resizeMode="contain" className="w-[115px] h-[35px]" />
          <Text className="text-2xl text-white font-semibold mt-10">
            Sign up Too good to toss
          </Text>

          <FormField
            title="UserName"
            value={form.username}
            handleChangeText={(e) => setForm({ ...form, username: e })}
            otherStyles="mt-10"
          />
          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-2"
            keyboardType="email-address"
          />
          <FormField
            title="PhoneNumber"
            value={form.phoneNumber}
            handleChangeText={(e) => setForm({ ...form, phoneNumber: e })}
            otherStyles="mt-2"
          />
          <FormField
            title="City"
            value={form.city}
            handleChangeText={(e) => setForm({ ...form, city: e })}
            otherStyles="mt-2"
          />
          <FormField
            title="Password"
            value={form.password}  // Changed to lowercase
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-2"
            secureTextEntry={true}  // Ensure it's a password field
          />
          <CustomButton
            title="Sign Up"
            handlePress={submit}
            containerStyles="mt-9"
            isLoading={isSubmitting}
          />
          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-base text-gray-100">Have an account already?</Text>
            <Link href="/sign-in" className="text-base text-secondary">
              Sign In
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
