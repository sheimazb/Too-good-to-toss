import { View, Text, FlatList, Image } from 'react-native';
import React from 'react';

const Trending = ({ posts }) => {
  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => (
        <View className="w-32 h-32 items-center p-5 rounded-lg overflow-hidden border-2 bg-black-100 border-black-200">
          <Image
            source={item.imageUri} 
            className="w-20 h-16"
            resizeMode="cover"
          />
          <Text className="text-white text-center mt-2">{item.title}</Text> 
        </View>
      )}
      horizontal
      ItemSeparatorComponent={() => <View style={{ width: 20 }} />} 
    />
  );
};

export default Trending;