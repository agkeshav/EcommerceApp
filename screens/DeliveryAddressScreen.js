import { View, Text, Pressable, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { Entypo, FontAwesome5, Ionicons } from "@expo/vector-icons";
import LoadingScreen from "./LoadingScreen";
import api from "../api/api";
export default function DeliveryAddressScreen(props) {
  const selectedAddress = props.selectedAddress;
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(false);
  const getAllAddress = async () => {
    try {
      setLoading(true);
      const response = await api.get("/");
      const userId = response.data._id;
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
  return loading === true ? (
    <LoadingScreen />
  ) : (
    <>
      <Text
        style={{
          fontWeight: "bold",
          marginTop: 10,
          marginHorizontal: 10,
          fontSize: 18,
          marginBottom: 10,
        }}
      >
        Select Delivery Address
      </Text>
      {addresses.map((item, index) => (
        <View
          key={index}
          style={{
            marginHorizontal: 10,
            backgroundColor: "white",
            elevation: 4,
            borderRadius: 5,
            padding: 5,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 5,
          }}
        >
          <Pressable
            style={{ marginHorizontal: 10 }}
            onPress={() => props.updateSelectedAddress(item)}
          >
            {selectedAddress && selectedAddress.id === item.id ? (
              <FontAwesome5 name="dot-circle" size={24} color="#008397" />
            ) : (
              <Entypo name="circle" size={24} color="black" />
            )}
          </Pressable>
          <View style={{ display: "flex", flexDirection: "column" }}>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text style={{ fontWeight: "bold" }}>{item.name}</Text>
              <Ionicons
                name="md-location-sharp"
                size={24}
                color="#C60C30"
                style={{ paddingRight: 5 }}
              />
            </View>
            <Text>
              {item.houseNo} {item.street}
            </Text>
            <Text>{item.landMark}</Text>
            <Text>
              {item.city}, {item.country}
            </Text>
            <Text>Mobile No:- {item.mobileNo}</Text>
            <Text>Postal Code:- {item.postalCode}</Text>
            {selectedAddress && selectedAddress.id === item.id ? (
              <TouchableOpacity
                style={{
                  backgroundColor: "#008397",
                  marginTop: 10,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 8,
                  width: 220,
                  marginBottom: 5,
                }}
                onPress={() => props.updateScreenId()}
              >
                <Text style={{ color: "white", padding: 9, fontWeight: 500 }}>
                  Deliver to This Address
                </Text>
              </TouchableOpacity>
            ) : null}
          </View>
        </View>
      ))}
    </>
  );
}
