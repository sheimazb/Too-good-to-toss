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

const Home = () => {
  const [refreshing, setRefreshing] = useState(false);

  const categories =[
    { $id: '1', imageUri: images.market, title: 'Market' },
    { $id: '2', imageUri: images.bread, title: 'Bakery' },
    { $id: '3', imageUri: images.restaurant, title: 'Restaurant' },
  ]
  //call the useGetAppData hook
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
        //data={[]}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <ImageCard image={item.image}  title={item.title} price={item.price} />
        )}
        ListHeaderComponent={() => (
          <View className="my-6 px-4 space-y-6">
            <View className=" justify-between items-start flex-row mb-6">
              <View>
                <Text className="font-pmedium text-sm text-gray-100">
                  welcome Back
                </Text>
                <Text className="font-psemibold text-2xl text-white">
                  Too Good To Toss
                </Text>
              </View>
              <View className="mt-1.5">
                <TouchableOpacity onPress={() => router.push("/")}>
                <Image
                  source={images.logoSmall}
                  className="h-10 w-9"
                  resizeMode="contain"
                /></TouchableOpacity>
              </View>
            </View>
            <SearchInput placeholder="Serch for a restaurant" />
            <View className="w-full flex-1 pt-5 pb-4">
              <Text className="text-gray-100 text-lg font-pregular mb-3">
                Categories
              </Text>
                <Trending
                  posts={categories}
                />
            </View>
            <View className="w-full flex-1  pb-8">
              <Text className="text-gray-100 text-lg font-pregular mb-3">
                Announcements
              </Text>
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState title="No restaurants found" subtitle="Empty" />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

export default Home;
