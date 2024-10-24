import { View, Text,TouchableOpacity,Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";

const details = () => {
  return (
    <SafeAreaView className="bg-primary h-full">
  <View className="my-6 px-4 space-y-6">
            <View className="justify-between items-start flex-row mb-6">
              <View>
                <Text className="font-psemibold text-2xl text-white">
                  Details
                </Text>
              </View>
              <View className="mt-1.5">
                <TouchableOpacity onPress={() => router.push("/")}>
                  <Image
                    source={images.logoSmall}
                    className="h-10 w-9"
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </View>
            </View>
          
          </View>
    </SafeAreaView>

  )
}

export default details