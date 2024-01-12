import { View, Text, Image, Pressable } from "react-native";
import React, { useContext } from "react";
import { AntDesign, Feather, MaterialIcons } from "@expo/vector-icons";
import { Context as CartContext } from "../context/CartContext";
export default function CartItem({ item }) {
  console.log(item);
  const {
    state,
    incrementQuantity,
    decrementQuantity,
    removeItem,
  } = useContext(CartContext);
  return (
    <View style={{ display: "flex", flexDirection: "column" }}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          paddingTop: 10,
          paddingHorizontal: 10,
        }}
      >
        <Image
          source={{ uri: item.image }}
          width={150}
          height={150}
          resizeMode="contain"
        />
        <View style={{ display: "flex", flexDirection: "column" }}>
          <Text numberOfLines={3} style={{ width: 150 }}>
            {item.title}
          </Text>
          <Text style={{ fontWeight: "bold", fontSize: 18 }}>
            ₹{item.price}
          </Text>
          <Text
            style={{
              fontWeight: "500",
              fontSize: 17,
              color: "green",
            }}
          >
            In Stock
          </Text>
        </View>
      </View>

      <View style={{ display: "flex", flexDirection: "row" }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 10,
            paddingVertical: 5,
            borderRadius: 7,
          }}
        >
          {item.quantity > 1 ? (
            <Pressable
              onPress={() => {
                decrementQuantity(item);
                console.log(state);
              }}
              style={{
                backgroundColor: "#D8D8D8",
                padding: 7,
                borderTopLeftRadius: 6,
                borderBottomLeftRadius: 6,
              }}
            >
              <AntDesign name="minus" size={24} color="black" />
            </Pressable>
          ) : (
            <Pressable
              onPress={() => {
                console.log(state);
                removeItem(item);
              }}
              style={{
                backgroundColor: "#D8D8D8",
                padding: 7,
                borderTopLeftRadius: 6,
                borderBottomLeftRadius: 6,
              }}
            >
              <AntDesign name="delete" size={24} color="black" />
            </Pressable>
          )}

          <Pressable
            style={{
              backgroundColor: "white",
              paddingHorizontal: 18,
              paddingVertical: 6,
            }}
          >
            <Text>{item.quantity}</Text>
          </Pressable>

          <Pressable
            onPress={() => {
              console.log(state);
              incrementQuantity(item);
            }}
            style={{
              backgroundColor: "#D8D8D8",
              padding: 7,
              borderTopLeftRadius: 6,
              borderBottomLeftRadius: 6,
            }}
          >
            <Feather name="plus" size={24} color="black" />
          </Pressable>
        </View>
        <Pressable
          onPress={() => removeItem(item)}
          style={{
            marginLeft: 30,
            backgroundColor: "white",
            paddingHorizontal: 8,
            marginTop: 4,
            paddingVertical: 10,
            height: 40,
            borderRadius: 5,
            borderColor: "#C0C0C0",
            borderWidth: 0.6,
          }}
        >
          <Text>Delete</Text>
        </Pressable>
      </View>
      <Text
        style={{
          height: 1,
          borderColor: "#D0D0D0",
          borderWidth: 1,
          marginTop: 5,
        }}
      />
    </View>
  );
}
