import { View, Text } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

export default function AddressModalCard(props) {
  const item = props.item;
  return (
    <View
      style={{
        width: 130,
        height: 130,
        borderWidth: 1,
        borderColor: "gray",
        margin: 5,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding:5
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ fontWeight: "bold", fontSize: 14 }}>
          {item.name.slice(0, 6)}...
        </Text>
        <Ionicons
          name="md-location-sharp"
          size={24}
          color="#C60C30"
          style={{ paddingRight: 5 }}
        />
      </View>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          display: "flex",
        }}
      >
        <Text style={{ fontSize: 13 }} numberOfLines={1}>
          {item.houseNo}
        </Text>
        <Text style={{ fontSize: 13 }} numberOfLines={1}>
          {item.street}
        </Text>
        <Text style={{ fontSize: 13 }}>{item.landMark}</Text>
        <Text>
          {item.city}, {item.country}
        </Text>
      </View>
    </View>
  );
}
