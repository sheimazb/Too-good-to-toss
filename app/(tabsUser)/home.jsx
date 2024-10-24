import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Image, RefreshControl, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import SearchInput from "../../components/SearchInpu";
import Trending from "../../components/Trending";
import EmptyState from "../../components/EmptyState";
import { router } from "expo-router";
import { TouchableOpacity } from "react-native";
import { getAnnoncments } from "../../services/databaseService";
import ImageCard from "../../components/ImageCard";

const Home = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', mageUri: images.market,title: 'All' },
    { id: 'market', imageUri: images.market, title: 'Market' },
    { id: 'bakery', imageUri: images.bread, title: 'Bakery' },
    { id: 'restaurants', imageUri: images.restaurant, title: 'Restaurant' },
  ];

  useEffect(() => {
    fetchPosts();
    console.log('selectedCategory',selectedCategory)
  }, [selectedCategory]);

  const fetchPosts = async () => {
    setIsLoading(true);
    try {
      const allPosts = await getAnnoncments();
      const filteredPosts = selectedCategory === 'all' ? allPosts : allPosts.filter(post => post.category === selectedCategory);
      setPosts(filteredPosts);
    } catch (error) {
      console.error("Failed to fetch posts:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchPosts();
    setRefreshing(false);
  };

  return (
    <SafeAreaView style={{ backgroundColor: '#0d1117', flex: 1 }}>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ImageCard image={item.image} title={item.title} price={item.price} />
        )}
        ListHeaderComponent={() => (
          <View style={{ margin: 16 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 }}>
              <Text style={{ color: '#ffffff', fontSize: 24 }}>
                Too Good To Toss
              </Text>
              <TouchableOpacity onPress={() => router.push("/")}>
                <Image
                  source={images.logoSmall}
                  style={{ width: 36, height: 36 }}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
            <SearchInput placeholder="Search for a restaurant" />
            <View style={{ paddingTop: 20, paddingBottom: 16 }}>
              <Text style={{ color: '#ffffff', fontSize: 18, marginBottom: 8 }}>
                Categories
              </Text>
              <FlatList
                data={categories}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                <TouchableOpacity onPress={() => setSelectedCategory(item.id)}>

                <View className="w-32 h-32 items-center p-5 rounded-lg overflow-hidden border-2 bg-black-100 border-black-200">
                  <Image
                    source={item.imageUri} 
                    className="w-20 h-16"
                    resizeMode="cover"
                  />
                  <Text className="text-white text-center mt-2">{item.title}</Text> 
                </View>
              </TouchableOpacity>
              )}
              horizontal
              ItemSeparatorComponent={() => <View style={{ width: 20 }} />} 
            />
            </View>
            <Text style={{ color: '#ffffff', fontSize: 18, marginBottom: 8 }}>
              Announcements
            </Text>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState title="No announcements found" subtitle="Try adjusting your filters or search query." />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
      {isLoading && (
        <View style={{ position: 'absolute', top: '50%', left: '50%', marginTop: -25, marginLeft: -25 }}>
          <ActivityIndicator size="large" color="#00ff00" />
        </View>
      )}
    </SafeAreaView>
  );
};

export default Home;
