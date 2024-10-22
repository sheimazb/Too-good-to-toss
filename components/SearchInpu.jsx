import { View, Text, TextInput, Image } from "react-native";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import { icons, images } from "../constants";
const SearchInput = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  ...props
}) => {
  return (
   
      <View
        className=" border-2 border-black-200 w-full h-16 px-4 bg-black-100
        rounded-2xl focus:border-secondary items-center flex-row space-x-4
        "
      >
        <TextInput
          className="mt-0.5 flex-1 text-white font-pregular text-base"
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7b7b8b"
          onChangeText={handleChangeText}
        />
          <TouchableOpacity >
            <Image
              source={icons.search}
              className="w-6 h-6"
              resizeMode="contain"
            />
          </TouchableOpacity>
      </View>
  );
};

export default SearchInput;
