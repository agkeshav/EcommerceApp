import {
  View,
  Text,
  Image,
  StatusBar,
  TextInput,
  ScrollView,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Button,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { FontAwesome, Ionicons, AntDesign } from "@expo/vector-icons";
import ItemsList from "../components/ItemsList";
import Slider from "../components/Slider";
import ProductItem from "../components/ProductItem";
import axios from "axios";
import api from "../api/api";
import  {
  BottomModal,
  ModalContent,
  SlideAnimation,
} from "react-native-modals";
import AddressModalCard from "../components/AddressModalCard";
import { useNavigation } from "@react-navigation/native";
import { Context as UserContext } from "../context/UserContext";

export default function HomeScreen() {
  const { state,updateUserId } = useContext(UserContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [searchProduct, setSearchProduct] = useState();
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const list = [
    {
      id: "0",
      image: "https://m.media-amazon.com/images/I/41EcYoIZhIL._AC_SY400_.jpg",
      name: "Home",
    },
    {
      id: "1",
      image:
        "https://m.media-amazon.com/images/G/31/img20/Events/Jup21dealsgrid/blockbuster.jpg",
      name: "Deals",
    },
    {
      id: "3",
      image:
        "https://images-eu.ssl-images-amazon.com/images/I/31dXEvtxidL._AC_SX368_.jpg",
      name: "Electronics",
    },
    {
      id: "4",
      image:
        "https://m.media-amazon.com/images/G/31/img20/Events/Jup21dealsgrid/All_Icons_Template_1_icons_01.jpg",
      name: "Mobiles",
    },
    {
      id: "5",
      image:
        "https://m.media-amazon.com/images/G/31/img20/Events/Jup21dealsgrid/music.jpg",
      name: "Music",
    },
    {
      id: "6",
      image: "https://m.media-amazon.com/images/I/51dZ19miAbL._AC_SY350_.jpg",
      name: "Fashion",
    },
  ];
  
  const [products, setProducts] = useState([]);
  const getProduct = async () => {
    try {
      const response = await api.get("/products");
      // console.log(response);
      setProducts(response.data.msg);
      // console.log(response.data.msg);
    } catch (err) {
      console.log(err);
    }
  };
  const [addresses, setAddresses] = useState([]);
  const getAllAddress = async () => {
    try {
      setLoading(true);
      const response = await api.get("/");
      const userId = response.data._id;
      updateUserId(userId);
      const addressResponse = await api.get(`/addresses/${userId}`);
      setAddresses(addressResponse.data.msg);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getAllAddress();
  }, []);
  useEffect(() => {
    setLoading(true);
    getProduct();
    setLoading(false);
  }, []);
  // console.log(state);
  
  return (
    <>
      <StatusBar backgroundColor={"#92DEDA"} />

      <View
        style={{
          backgroundColor: "#92DEDA",
          height: 70,
          justifyContent: "center",
          paddingTop: 10,
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            backgroundColor: "white",
            borderRadius: 10,
            marginHorizontal: 15,
            height: 40,
            alignItems: "center",
          }}
        >
          <FontAwesome
            name="search"
            size={24}
            color="black"
            style={{ paddingLeft: 10, marginRight: 10 }}
          />
          <TextInput
            value={searchProduct}
            onChangeText={(text) => setSearchProduct(text)}
            placeholder="Search Amazon.in"
            style={{ fontSize: 16 }}
            placeholderTextColor={"gray"}
          />
        </View>
      </View>
      <ScrollView>
        <View
          style={{
            backgroundColor: "#BBEBEB",
            height: 45,
            paddingHorizontal: 5,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Ionicons
            name="md-location-sharp"
            size={24}
            color="black"
            style={{ paddingRight: 5 }}
          />
          <Text style={{ fontSize: 13, marginRight: 5 }}>
            Delivering to Delhi 110008 - Update Location
          </Text>
          <AntDesign
            name="down"
            size={20}
            color="black"
            onPress={() => {
              setModalVisible(true);
            }}
          />
        </View>
        <View style={{ backgroundColor: "white" }}>
          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            data={list}
            renderItem={({ item }) => <ItemsList items={item} />}
          />
        </View>
        <Slider />
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            flexWrap: "wrap",
            backgroundColor: "white",
            marginTop: 5,
            justifyContent: "center",
          }}
        >
          {loading == true ? (
            <ActivityIndicator size={42} color={"orange"} />
          ) : (
            products.map((item, index) => (
              <TouchableOpacity key={index}>
                <ProductItem item={item} />
              </TouchableOpacity>
            ))
          )}
        </View>
      </ScrollView>
      <BottomModal
        onBackdropPress={() => setModalVisible(!modalVisible)}
        swipeDirection={["up", "down"]}
        modalAnimation={
          new SlideAnimation({
            slideFrom: "bottom",
          })
        }
        onHardwareBackPress={() => setModalVisible(!modalVisible)}
        visible={modalVisible}
        onTouchOutside={() => setModalVisible(!modalVisible)}
      >
        <ModalContent style={{ height: 400, width: "100%" }}>
          <View style={{ marginBottom: 20 }}>
            <Text style={{ fontWeight: "bold", fontSize: 18 }}>
              Choose your Location
            </Text>
            <Text style={{ fontSize: 16, fontWeight: 300 }}>
              Select a delivery location to see product availability and
              delivery options
            </Text>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ flexGrow: 1 }}
          >
            {addresses.map((item,index) => {
              return <AddressModalCard item={item} key={index}/>;
            })}
            <View
              style={{
                width: 130,
                height: 130,
                borderWidth: 1,
                borderColor: "gray",
                margin: 5,
                justifyContent: "center",
                alignItems: "center",
                padding: 10,
              }}
            >
              <Text
                style={{ color: "#0066b2" }}
                onPress={() => {
                  setModalVisible(!modalVisible);
                  navigation.navigate("AddressScreen");
                }}
              >
                Add an address or pick-up point
              </Text>
            </View>
          </ScrollView>
          <View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Ionicons
                name="md-location-sharp"
                size={24}
                color="#0066b2"
                style={{ paddingRight: 5 }}
              />
              <Text style={{ color: "#0066b2" }}>Enter an Indian Pincode</Text>
            </View>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
            >
              <Ionicons name="locate-sharp" size={22} color="#0066b2" />
              <Text style={{ color: "#0066b2", fontWeight: "400" }}>
                Use My Currect location
              </Text>
            </View>

            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
            >
              <AntDesign name="earth" size={22} color="#0066b2" />

              <Text style={{ color: "#0066b2", fontWeight: "400" }}>
                Deliver outside India
              </Text>
            </View>
          </View>
        </ModalContent>
      </BottomModal>
    </>
  );
}
