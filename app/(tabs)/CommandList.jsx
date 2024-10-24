import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  Modal,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";

const data = [
  {
    id: "1",
    title: "Pasta",
    userName: "User 1",
    quantity: 2,
    date: "12/2/2024",
    heure: "10:56",
  },
  {
    id: "2",
    title: "Sandwish",
    userName: "User 2",
    quantity: 3,
    date: "12/2/2024",
    heure: "10:56",
  },
  {
    id: "3",
    title: "Makloub",
    userName: "User 3",
    quantity: 1,
    date: "12/2/2024",
    heure: "10:56",
  },
  // Ajoutez d'autres utilisateurs ici
];

const Plan = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const renderItem = ({ item }) => (
    <View className="flex-col ">
      <View className="flex-row justify-between items-center p-4 bg-white rounded-lg mb-1 mt-3">
        <View className="flex-col items-start justify-start">
          <Text className="text-lg font-semibold">{item.title}</Text>
          <Text className="text-xs">{item.userName}</Text>
        </View>
        <View className="flex items-end">
          <Text className="text-lg">Qty: {item.quantity}</Text>
          <Text className="text-xs">
            {" "}
            {item.date}--{item.heure}
          </Text>
        </View>
      </View>
      <View>
        <TouchableOpacity
          className="bg-orange-600 text-white rounded-md w-20 px-4 py-2 mt-3"
          onPress={() => {
            setSelectedOrder(item);
            setModalVisible(true);
          }}
        >
          <Text className="text-center text-white ">Check</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView className="bg-primary h-full">
      <View className="my-6 px-4 space-y-6">
        <View className="justify-between items-start flex-row mb-6">
          <View>
            <Text className="font-psemibold text-2xl mt-3 text-white">
              List Commandes
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

        {/* Liste des commandes */}
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />

        {/* Modal pour afficher les détails de la commande */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(false);
            setSelectedOrder(null);
          }}
        >
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <View style={{ width: 300, backgroundColor: 'white', borderRadius: 10, padding: 20 }}>
              {selectedOrder && (
                <>
                  <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{selectedOrder.title}</Text>
                  <Text style={{ marginTop: 10 }}>Utilisateur: {selectedOrder.userName}</Text>
                  <Text style={{ marginTop: 10 }}>Quantité: {selectedOrder.quantity}</Text>
                  <Text style={{ marginTop: 10 }}>Date: {selectedOrder.date}</Text>
                  <Text style={{ marginTop: 10 }}>Heure: {selectedOrder.heure}</Text>
                </>
              )}
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(false);
                  setSelectedOrder(null);
                }}
                style={{ marginTop: 20, alignItems: 'center' }}
              >
                <Text style={{ color: 'red' }}>Fermer</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

export default Plan;
