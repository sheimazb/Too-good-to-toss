import { ScrollView, Text, View, Image } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { Link, useNavigation } from "expo-router";
import { authService } from "../../services/authService";
import { useGlobalContext } from '../../context/GlobalProvider';

const SignIn = () => {

  const navigation =useNavigation();
  const { setUser } = useGlobalContext();
  const [form, setForm] = useState({
    email: "",
    Password: "",
  });
  
  const [isSubmiting, setIsSubmiting] = useState(false);

  const submit = async () => {
    setIsSubmiting(true);
    try {
      const user = await authService.login(form.email, form.Password);
      setUser(user);  

      console.log("User logged in successfully:", user);

      // Navigate to next screen or show success message
      navigation.navigate('(tabs)')

    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setIsSubmiting(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View
          className="w-full justify-cenetr min-h-[85vh] px-4 
        my-40 "
        >
          <Image
            source={""}
            resizeMode="contain"
            className="w-[115px] h-[35px]"
          />
          <Text className="text-2xl text-white text-semibold mt-10 font-psemibold">
            Log in Too good to toss
          </Text>

          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />
          <FormField
            title="Password"
            value={form.Password}
            handleChangeText={(e) => setForm({ ...form, Password: e })}
            otherStyles="mt-7"
          />
          <CustomButton
            title="Sign In"
            handlePress={submit}
            containerStyles="mt-7 "
            isLoading={isSubmiting}
          />
          <View className="justify-center pt-5 flex-row gap-2">
            <Text className=" text-lg text-gray-100 font-pregular">
              Don't have account?
            </Text>
            <Link
              href="/sign-up"
              className="text-lg font-psemibold text-secondary"
            >
              Sign Up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;

