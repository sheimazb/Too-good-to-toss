import { useState } from "react";
import { View, Text, TouchableOpacity, Image, Modal, TextInput } from "react-native";
import { icons } from "../constants";
import { createCommande } from "../services/databaseService"; // Importer la fonction pour créer une commande
import { useGlobalContext } from "../context/GlobalProvider";
import { useRouter,useNavigation } from "expo-router"; // Importer useRouter

const ImageCard = ({ title, creator, price, image }) => {
  const navigation =useNavigation();

  const [selectedItem, setSelectedItem] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false); // État pour le menu
  const [detailsVisible, setDetailsVisible] = useState(false); // État pour les détails
  const [paymentMethod, setPaymentMethod] = useState('carte');
  const [quantity, setQuantity] = useState(''); // État pour la quantité
  const [address, setAddress] = useState(''); // État pour l'adresse
  const { user } = useGlobalContext();
  const router = useRouter(); // Initialiser le router

  const handleCommanderPress = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const handleConfirmOrder = async () => {
    const commande = {
      title: selectedItem.title, // Titre de l'élément sélectionné
      address: address || " ", // Adresse, avec une valeur par défaut
      carte: paymentMethod === 'carte', // Booléen pour la méthode de paiement
      espece: paymentMethod === 'espece', // Booléen pour la méthode de paiement
      idResto: user.uid, // ID du restaurant, valeur statique
      idUser: user.uid, // ID de l'utilisateur, valeur statique
      quantity: parseInt(quantity) || 4, // Quantité, avec une valeur par défaut
    };

    try {
      const id = await createCommande(commande); // Créer la commande dans Firestore
      console.log("Commande créée avec ID:", id);
      setModalVisible(false); // Fermer le modal après la création
    } catch (error) {
      console.error("Erreur lors de la création de la commande:", error);
    }
  };

  // Fonction pour gérer les actions du menu
  const handleMenuOption = (option) => {
    setMenuVisible(false); // Fermer le menu
    console.log(`Option sélectionnée: ${option}`);
    switch (option) {
      case 'Settings':
        console.log("Navigating to Settings");
        break;
      case 'Details':
        console.log("Navigating to details");
        navigation.navigate('pages/details'); // Directly call navigation.navigate
        break;
      case 'Hide':
        console.log("Element caché");
        break;
      default:
        break;
    }
  };

  return (
    <View className="flex flex-col items-center px-4 mb-14">
      <View className="flex flex-row gap-3 items-start">
        <View className="flex justify-center items-center flex-row flex-1">
          <View className="w-[46px] h-[46px] rounded-lg border border-secondary flex justify-center items-center p-0.5">
            <Image
              source={require("../assets/images/profile.png")}
              className="w-full h-full rounded-lg"
              resizeMode="cover"
            />
          </View>

          <View className="flex justify-center flex-1 ml-3 gap-y-1">
            <Text className="font-psemibold text-sm text-white" numberOfLines={1}>
              {title}
            </Text>
            <Text className="text-xs text-gray-100 font-pregular" numberOfLines={1}>
              Zbidi Chaima
            </Text>
          </View>
        </View>

        <View className="pt-1">
          <TouchableOpacity onPress={() => setMenuVisible(true)}>
            <Image source={icons.menu} className="w-5 h-5" resizeMode="contain" />
          </TouchableOpacity>
        </View>
      </View>

      <View className="w-full h-60 rounded-xl mt-3">
        <Image
          source={{ uri: image }}
          className="w-full h-full rounded-xl"
          resizeMode="cover"
        />
      </View>
      <View className="flex flex-row justify-center items-center gap-40 p-3">
        <TouchableOpacity 
          className="bg-purple-600 text-white rounded-md px-4 py-2 mt-3" 
          onPress={() => handleCommanderPress({ title })} // Passer l'objet avec le titre
        >
          <Text className="text-center text-white ">Commander</Text>
        </TouchableOpacity>
        <Text className="text-white">{price} DT</Text>
      </View>
      
      {/* Modal pour le menu */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={menuVisible}
        onRequestClose={() => setMenuVisible(false)}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <View style={{ width: 200, backgroundColor: 'white', borderRadius: 10, padding: 20 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Menu</Text>
            <TouchableOpacity onPress={() => handleMenuOption('Settings')}>
              <Text style={{ marginTop: 10 }}>Settings</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleMenuOption('Details')}>
              <Text style={{ marginTop: 10 }}>Details</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleMenuOption('Hide')}>
              <Text style={{ marginTop: 10 }}>Hide</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setMenuVisible(false)}>
              <Text style={{ marginTop: 20, color: 'red' }}>Fermer</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal pour les détails */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={detailsVisible}
        onRequestClose={() => setDetailsVisible(false)}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <View style={{ width: 300, backgroundColor: 'white', borderRadius: 10, padding: 20 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Détails</Text>
            <Text style={{ marginTop: 20 }}>Titre : {selectedItem?.title}</Text>
            <Text style={{ marginTop: 10 }}>Créateur : {creator}</Text>
            <Text style={{ marginTop: 10 }}>Prix : {price} DT</Text>
            <TouchableOpacity onPress={() => setDetailsVisible(false)}>
              <Text style={{ marginTop: 20, color: 'red' }}>Fermer</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <View style={{ width: 300, backgroundColor: 'white', borderRadius: 10, padding: 20 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Commander</Text>
            <Text style={{ marginTop: 20 }}>Vous avez sélectionné : {selectedItem?.title}</Text>
            
            {/* Champ pour la quantité */}
            <Text style={{ marginTop: 20 }}>Quantité :</Text>
            <TextInput
              style={{ borderWidth: 1, borderColor: 'gray', borderRadius: 5, padding: 5, marginTop: 5 }}
              keyboardType="numeric"
              placeholder="Entrez la quantité"
              value={quantity}
              onChangeText={setQuantity} // Mettre à jour l'état de la quantité
            />
            
            {/* Champ pour l'adresse */}
            <Text style={{ marginTop: 20 }}>Adresse :</Text>
            <TextInput
              style={{ borderWidth: 1, borderColor: 'gray', borderRadius: 5, padding: 5, marginTop: 5 }}
              placeholder="Entrez votre adresse"
              value={address}
              onChangeText={setAddress} // Mettre à jour l'état de l'adresse
            />
            
            {/* Choix du moyen de paiement */}
            <Text style={{ marginTop: 20 }}>Moyen de paiement :</Text>
            <View style={{ flexDirection: 'row', marginTop: 5 }}>
              <TouchableOpacity 
                style={{ flexDirection: 'row', alignItems: 'center', marginRight: 20 }} 
                onPress={() => setPaymentMethod('carte')}
              >
                <View style={{
                  width: 20,
                  height: 20,
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: 'gray',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: paymentMethod === 'carte' ? 'blue' : 'white'
                }}>
                  {paymentMethod === 'carte' && <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: 'white' }} />}
                </View>
                <Text style={{ marginLeft: 5 }}>Carte</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={{ flexDirection: 'row', alignItems: 'center' }} 
                onPress={() => setPaymentMethod('espece')}
              >
                <View style={{
                  width: 20,
                  height: 20,
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: 'gray',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: paymentMethod === 'espece' ? 'blue' : 'white'
                }}>
                  {paymentMethod === 'espece' && <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: 'white' }} />}
                </View>
                <Text style={{ marginLeft: 5 }}>Espèces</Text>
              </TouchableOpacity>
            </View>
            
            <TouchableOpacity onPress={handleConfirmOrder}>
              <Text style={{ marginTop: 20, color: 'blue' }}>Confirmer la commande</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={{ marginTop: 20, color: 'red' }}>Fermer</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ImageCard;
