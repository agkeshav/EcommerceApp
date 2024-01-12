import {
  View,
  StatusBar,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useContext } from "react";
import { Context as CartContext } from "../context/CartContext";
import CartItem from "../components/CartItem";
import { useNavigation } from "@react-navigation/native";

export default function CartScreen() {
  const { state } = useContext(CartContext);
  const total = state.cart
    ?.map((item) => item.price * item.quantity)
    .reduce((curr, prev) => curr + prev, 0);
  const navigation = useNavigation();
  return (
    <>
      <StatusBar backgroundColor={"#92DEDA"} />
      <View
        style={{
          backgroundColor: "#92DEDA",
          height: 40,
        }}
      >
      </View>
      <View
        style={{
          backgroundColor: "white",
          paddingHorizontal: 10,
          paddingTop: 10,
          paddingBottom: 10,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
        }}
      >
        <Text style={{ fontSize: 20 }}>SubTotal:- ₹{total}</Text>
        <Text style={{ fontSize: 14 }}>EMI Details Available</Text>
        <TouchableOpacity
          style={{
            backgroundColor: "#FFC72C",
            padding: 10,
            borderRadius: 10,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 10,
          }}
          onPress={() => {
            if (state.cart.length >= 1) {
              navigation.navigate("OrderScreen");
            }
          }}
        >
          <Text>Proceed to Buy ({state.cart.length} items)</Text>
        </TouchableOpacity>
      </View>
      <Text style={{ height: 1, borderColor: "#D0D0D0", borderWidth: 1 }} />
      <ScrollView style={{ backgroundColor: "white" }}>
        {state.cart.map((item) => (
          <CartItem item={item} />
        ))}
      </ScrollView>
    </>
  );
}
