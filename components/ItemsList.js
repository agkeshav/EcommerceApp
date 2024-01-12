import { View, Image, Text } from "react-native";
import React from "react";

export default function ItemsList(props) {
  const data = props.items;
  // console.log(data.image);
  return (
    <View
      style={{
        marginTop: 10,
        marginBottom: 5,
        marginHorizontal: 5,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Image
        source={{ uri: data.image }}
        height={50}
        width={50}
        resizeMode="contain"
      />
      <Text style={{ fontSize: 12, fontWeight: 500 }}>{data.name}</Text>
    </View>
  );
}
