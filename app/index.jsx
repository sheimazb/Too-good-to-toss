import { Text, View, Image, ScrollView } from "react-native";
import React from "react";
import { Link,Redirect, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../constants";
import CustomButton from "../components/CustomButton";
const App = () => {
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="w-full min-h-[85vh] justify-center items-center h-full px-4">
          <Image
            source={""}
            className="w-[130px] h-[84px]"
            resizeMode="contain"
          />
          <Image
            source={images.banner}
            className="max-w--[480px] w-full h-[400px]"
            resizeMode="contain"
          />
          <View className="relative mt-5">
          <Text className=" text-3xl text-white font-bold text-center">
            Discover Endless Possibilities with .
            <Text className="text-secondary-200">Too good to toss </Text>
          </Text>
          <Image
          source={images.path}
          className="w-[136px] h-[17px] absolute -bottom-2 right-10"
          resizeMode="contain"
          />
          </View>
          <Text className="text-sm font-pregular text-gray-100 mt-7 text-center"> where creativity meets innovation: Lorem ipsum dolor sit amet with too good to test.</Text>
        <CustomButton
        title="Contenue with Email"
        handlePress={()=>router.push('/sign-in')}
        containerStyles="w-full mt-7"
        />
        </View>
        
      </ScrollView>
      <StatusBar  
      backgroundColor="#161622" style='light'
      />
    </SafeAreaView>
  );
};

export default App;
