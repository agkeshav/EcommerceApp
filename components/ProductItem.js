import {
  View,
  Image,
  Text,
  useWindowDimensions,
  Pressable,
} from "react-native";
import React, { useState,useContext } from "react";
import { StarRatingDisplay } from "react-native-star-rating-widget";
import { Context as CartContext } from "../context/CartContext";
import { useNavigation } from "@react-navigation/native";

export default function ProductItem(props) {
  const { state, addItem } = useContext(CartContext);
  const item = props.item;
  const [addedToCart, setAddedToCart] = useState(false);
  const navigation = useNavigation();
  return (
    <Pressable
      style={{
        marginHorizontal: 10,
        marginVertical: 25,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
      onPress={() => navigation.navigate("ProductInfoScreen", item)}
    >
      <Image
        style={{ width: 150, height: 150, resizeMode: "contain" }}
        source={{ uri: item?.image }}
      />

      <Text numberOfLines={1} style={{ width: 150, marginTop: 10 }}>
        {item?.title}
      </Text>

      <View
        style={{
          marginTop: 5,
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ fontSize: 15, fontWeight: "bold" }}>₹{item?.price}</Text>
        <StarRatingDisplay rating={item.rating.rate} starSize={20} />
      </View>

      <Pressable
        style={{
          backgroundColor: "#FFC72C",
          padding: 10,
          borderRadius: 20,
          justifyContent: "center",
          alignItems: "center",
          marginHorizontal: 10,
          marginTop: 10,
        }}
        onPress={() => {
          // setAddedToCart(true);
          addItem(item);
        }}
      >
        {addedToCart ? (
          <View>
            <Text>Added to Cart</Text>
          </View>
        ) : (
          <Text>Add to Cart</Text>
        )}
      </Pressable>
    </Pressable>
  );
}
