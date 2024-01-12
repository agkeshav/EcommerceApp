import { View, Text } from "react-native";
import React, { useContext } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Context as CartContext } from "../context/CartContext";

export default function CartIcon(props) {
  const color = props.color;
  const {
    state: { cart },
  } = useContext(CartContext);
  let cartCount = 0;
  if (cart) cartCount = cart.length;
  return (
    <View style={{ alignItems: "center", justifyContent: "center" }}>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Ionicons
          name="cart"
          type="antdesign"
          color={color}
          size={24}
          containerStyle={{
            marginHorizontal: 15,
            position: "relative",
          }}
        />
        {cartCount >= 0 ? (
          <View
            style={{
              position: "absolute",
              backgroundColor: color,
              width: 16,
              height: 16,
              borderRadius: 8,
              left: +10,
              bottom: +15,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                alignItems: "center",
                justifyContent: "center",
                color: "#FFFFFF",
                fontSize: 8,
              }}
            >
              {cartCount}
            </Text>
          </View>
        ) : null}
        <View></View>
      </View>
    </View>
  );
}
