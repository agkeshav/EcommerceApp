import {
  View,
  Text,
  TextInput,
  StatusBar,
  Pressable,
  ScrollView,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import api from "../api/api";
import { useFocusEffect } from "@react-navigation/native";
import React, { useEffect, useState, useContext } from "react";
import { FontAwesome, AntDesign, Ionicons, Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import LoadingScreen from "./LoadingScreen";
import { Context as UserContext } from "../context/UserContext";
export default function AddressScreen() {
  const {
    state: { userId },
  } = useContext(UserContext);
  const navigation = useNavigation();
  const [searchProduct, setSearchProduct] = useState();
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(false);
  const getAllAddress = async () => {
    try {
      setLoading(true);
      const addressResponse = await api.get(`/addresses/${userId}`);
      setAddresses(addressResponse.data.msg);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
  const handleRemoveAddress = async (item) => {
    setLoading(true);
    try {
      const response = await api.delete(`/addresses/${userId}/${item._id}`);
      setLoading(false);
      ToastAndroid.show("Address Removed Successfully", ToastAndroid.SHORT);
    } catch (err) {
      setLoading(false);
      ToastAndroid.show("Some Error Occurred", ToastAndroid.SHORT);
    }
    getAllAddress();
  };
  useEffect(() => {
    navigation.addListener("focus", () => {
      getAllAddress();
    });
  }, []);
  return loading === true ? (
    <LoadingScreen />
  ) : (
    <ScrollView
      style={{ display: "flex", flex: 1 }}
      showsVerticalScrollIndicator={false}
    >
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
      <View style={{ margin: 10 }}>
        <Text style={{ fontWeight: "bold", fontSize: 18 }}>Your Addresses</Text>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            borderColor: "#D0D0D0",
            borderWidth: 1,
            padding: 5,
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 5,
          }}
          onPress={() => navigation.navigate("AddAddressScreen")}
        >
          <Text>Add New Address</Text>
          <AntDesign name="right" size={24} color="black" />
        </TouchableOpacity>

        {/* all the added adresses */}
        {addresses?.map((item, index) => (
          <Pressable
            key={index}
            style={{
              borderWidth: 1,
              borderColor: "#D0D0D0",
              padding: 10,
              flexDirection: "column",
              gap: 2,
              marginVertical: 5,
            }}
          >
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 3 }}
            >
              <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                {item?.name}
              </Text>
              <Ionicons
                name="md-location-sharp"
                size={24}
                color="#C60C30"
                style={{ paddingRight: 5 }}
              />
            </View>

            <Text numberOfLines={1} style={{ fontSize: 15, color: "#181818" }}>
              {item?.houseNo}, {item?.landMark}
            </Text>

            <Text style={{ fontSize: 15, color: "#181818" }}>
              {item?.street}
            </Text>

            <Text style={{ fontSize: 15, color: "#181818" }}>
              {item?.country}, {item.city}
            </Text>

            <Text style={{ fontSize: 15, color: "#181818" }}>
              phone No : {item?.mobileNo}
            </Text>
            <Text style={{ fontSize: 15, color: "#181818" }}>
              pin code : {item?.postalCode}
            </Text>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
                marginTop: 7,
              }}
            >
              <Pressable
                style={{
                  backgroundColor: "#F5F5F5",
                  paddingHorizontal: 10,
                  paddingVertical: 6,
                  borderRadius: 5,
                  borderWidth: 0.9,
                  borderColor: "#D0D0D0",
                }}
              >
                <Text>Edit</Text>
              </Pressable>

              <Pressable
                style={{
                  backgroundColor: "#F5F5F5",
                  paddingHorizontal: 10,
                  paddingVertical: 6,
                  borderRadius: 5,
                  borderWidth: 0.9,
                  borderColor: "#D0D0D0",
                }}
                onPress={() => handleRemoveAddress(item)}
              >
                <Text>Remove</Text>
              </Pressable>

              <Pressable
                style={{
                  backgroundColor: "#F5F5F5",
                  paddingHorizontal: 10,
                  paddingVertical: 6,
                  borderRadius: 5,
                  borderWidth: 0.9,
                  borderColor: "#D0D0D0",
                }}
              >
                <Text>Set as Default</Text>
              </Pressable>
            </View>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
}
