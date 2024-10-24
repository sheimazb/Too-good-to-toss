import { SafeAreaView } from "react-native-safe-area-context";
import { View, Image, FlatList, TouchableOpacity, Text } from "react-native";
import { icons } from "../../constants";
import EmptyState from "../../components/EmptyState";
import InfoBox from "../../components/InfoBox";
import ImageCard from "../../components/ImageCard";
import { getAnnoncments } from "../../services/databaseService";
import useDatabaseService from "../../services/useDatabaseService";
import { useGlobalContext } from "../../context/GlobalProvider";


const Profile = () => {

  const { user } = useGlobalContext();

  const userdata = {
    avatar: require("../../assets/images/profile.png"),
    username: user?.email || "Anonymous",
  };

  const {
    data: posts,
    isLoading,
    refetch,
  } = useDatabaseService(getAnnoncments);

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <ImageCard image={item.image}  title={item.title} price={item.price} />
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="No videos found for this profile"
          />
        )}
        ListHeaderComponent={() => (
          <View className="w-full flex justify-center items-center mt-6 mb-12 px-4">
            <TouchableOpacity
              onPress={() => {}}
              className="flex w-full items-end mb-10"
            >
              <Image
                source={icons.logout}
                resizeMode="contain"
                className="w-6 h-6"
              />
            </TouchableOpacity>

            <View className="w-16 h-16 border border-secondary rounded-lg flex justify-center items-center">
              <Image
                source={userdata.avatar }
                className="w-[90%] h-[90%] rounded-lg"
                resizeMode="cover"
              />
            </View>

            <InfoBox
              title={userdata.username}
              containerStyles="mt-5"
              titleStyles="text-lg"
            />

            <View className="mt-5 flex flex-row">
              <InfoBox
                title={posts.length}
                subtitle="Posts"
                titleStyles="text-xl"
                containerStyles="mr-10"
              />
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default Profile;