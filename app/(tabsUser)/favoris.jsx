import { View, Text, FlatList, Image, RefreshControl } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import SearchInput from "../../components/SearchInpu";
import Trending from "../../components/Trending";
import EmptyState from "../../components/EmptyState";
import { router } from "expo-router";
import { TouchableOpacity } from "react-native";
import { getAnnoncments } from "../../services/databaseService";
import useDatabaseService from "../../services/useDatabaseService";
import ImageCard from "../../components/ImageCard";

const Favoris = () => {
  const [refreshing, setRefreshing] = useState(false);

  const categories = [
    { $id: '1', imageUri: images.market, title: 'Market' },
    { $id: '2', imageUri: images.bread, title: 'Bakery' },
    { $id: '3', imageUri: images.restaurant, title: 'Restaurant' },
  ];

  const {
    data: posts,
    isLoading,
    refetch,
  } = useDatabaseService(getAnnoncments);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        numColumns={2}
        renderItem={({ item }) => (
          <View style={{ flex: 1, margin: 5 }}>
            <ImageCard image={item.image} title={item.title} />
          </View>
        )}
        ListHeaderComponent={() => (
          <View className="my-6 px-4 space-y-6">
            <View className="justify-between items-start flex-row mb-6">
              <View>
                <Text className="font-psemibold text-2xl text-white">
                  Your Favorites
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
            <SearchInput placeholder="Search for a restaurant" />
           
            <View className="w-full flex-1 pb-1">
              <Text className="text-gray-100 text-lg font-pregular mb-1">
                Announcements
              </Text>
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState title="No favorites found" subtitle="Empty" />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

export default Favoris;
