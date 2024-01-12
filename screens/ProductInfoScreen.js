import {
  View,
  Text,
  TextInput,
  StatusBar,
  Image,
  Pressable,
  ScrollView,
  ImageBackground,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import {
  AntDesign,
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import axios from "axios";
import { Context as CartContext } from "../context/CartContext";
import { useNavigation } from "@react-navigation/native";

export default function ProductInfoScreen(props) {
  const { state, addItem } = useContext(CartContext);
  const { width } = useWindowDimensions();
  const height = (width * 120) / 100;
  const [searchProduct, setSearchProduct] = useState();
  const productInfo = props.route.params;
  const navigation = useNavigation();
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
      <ScrollView
        style={{ flex: 1, backgroundColor: "white" }}
        showsVerticalScrollIndicator={false}
      >
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {productInfo.carouselImages.map((item, index) => (
            <ImageBackground
              style={{ width, height, marginTop: 15, resizeMode: "contain" }}
              source={{ uri: item.image }}
              key={item._id}
            >
              <View
                style={{
                  padding: 20,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <View
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    backgroundColor: "#C60C30",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "row",
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      textAlign: "center",
                      fontWeight: "600",
                      fontSize: 12,
                    }}
                  >
                    {productInfo.offer}% off
                  </Text>
                </View>

                <View
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    backgroundColor: "#E0E0E0",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "row",
                  }}
                >
                  <MaterialCommunityIcons
                    name="share-variant"
                    size={24}
                    color="black"
                  />
                </View>
              </View>

              <View
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: "#E0E0E0",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "row",
                  marginTop: "auto",
                  marginLeft: 20,
                  marginBottom: 20,
                }}
              >
                <AntDesign name="hearto" size={24} color="black" />
              </View>
            </ImageBackground>
          ))}
        </ScrollView>
        <Text
          style={{
            marginHorizontal: 10,
            fontWeight: "500",
            fontSize: 15,
            marginTop: 10,
          }}
        >
          {productInfo.title}
        </Text>
        <Text
          style={{
            marginHorizontal: 10,
            fontSize: 18,
            marginTop: 5,
            marginBottom: 2,
          }}
        >
          ₹{productInfo.price}
        </Text>
        <Text style={{ height: 1, borderColor: "#D0D0D0", borderWidth: 1 }} />
        <Text
          style={{
            marginHorizontal: 10,
            fontSize: 18,
            marginTop: 5,
            marginBottom: 2,
          }}
        >
          Color: {productInfo.color}
        </Text>
        <Text
          style={{
            marginHorizontal: 10,
            fontSize: 18,
            marginTop: 5,
            marginBottom: 2,
          }}
        >
          Size: {productInfo.size}
        </Text>
        <Text style={{ height: 1, borderColor: "#D0D0D0", borderWidth: 1 }} />
        <Text
          style={{
            marginHorizontal: 10,
            fontSize: 18,
            marginTop: 5,
            marginBottom: 2,
          }}
        >
          Total: ₹{productInfo.price}
        </Text>
        <Text
          style={{
            marginHorizontal: 10,
            fontWeight: "500",
            fontSize: 15,
            color: "#00CED1",
          }}
        >
          FREE delivery Tomorrow By 3PM. Order Within 10hrs 30 mins
        </Text>
        <View
          style={{
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
          <Text style={{ fontSize: 16 }}>
            Delivering to Sujan - Bangalore 110008
          </Text>
        </View>
        <Text
          style={{
            marginHorizontal: 10,
            fontWeight: "500",
            fontSize: 17,
            color: "green",
          }}
        >
          In Stock
        </Text>
        <TouchableOpacity
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
            addItem(productInfo);
            navigation.navigate("CartScreen");
          }}
        >
          <Text>Add to Cart</Text>
        </TouchableOpacity>
      </ScrollView>
    </>
  );
}
