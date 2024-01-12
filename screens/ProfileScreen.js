import {
  View,
  Text,
  Button,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import React, { useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import api from "../api/api";
import LoadingScreen from "./LoadingScreen";
import { Context as UserContext } from "../context/UserContext";

export default function ProfileScreen(props) {
  const { state } = useContext(UserContext);
  const userId = state.userId;
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const navigation = useNavigation();
  const handleLogOut = async () => {
    try {
      await AsyncStorage.removeItem("token");
      console.log("Successfully Log Out");
      navigation.navigate("SignUpScreen");
    } catch (err) {
      console.log(err);
    }
  };
  const handleUser = async () => {
    setLoading(true);
    try {
      const response = await api.get("/");
      setUser(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  const getAllOrders = async () => {
    const response = await api.get(`/orders/${userId}`);
    setOrders(response.data.msg);
    setLoading(false);
    // console.log(orders);
  };
  useEffect(() => {
    handleUser();
    getAllOrders();
  }, []);

  return loading === true ? (
    <LoadingScreen />
  ) : (
    <>
      <View
        style={{
          backgroundColor: "#92DEDA",
          height: 55,
          justifyContent: "center",
          paddingTop: 10,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={{ marginLeft: 10, fontSize: 16 }}>Welcome,</Text>
          <Text style={{ fontWeight: "bold", marginLeft: 5, fontSize: 16 }}>
            {user.name}
          </Text>
        </View>
      </View>
      <View style={{ backgroundColor: "white", flex: 1 }}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            marginTop: 10,
            marginHorizontal: 5,
            justifyContent: "space-around",
          }}
        >
          <TouchableOpacity style={styles.btnStyle}>
            <Text>Your Orders</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnStyle}>
            <Text>Your Account</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            marginTop: 5,
            marginHorizontal: 5,
            justifyContent: "space-around",
          }}
        >
          <TouchableOpacity style={styles.btnStyle}>
            <Text>Buy Again</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnStyle}
            onPress={() => handleLogOut()}
          >
            <Text>Log Out</Text>
          </TouchableOpacity>
        </View>
        <View style={{ marginHorizontal: 10, marginTop: 5 }}>
          <Text style={{ fontWeight: "bold", fontSize: 18 }}>Your Orders</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {orders.map((item, index) => (
              <TouchableOpacity key={index}>
                <Image
                  source={{ uri: item.products[0].image }}
                  style={{
                    width: 150,
                    height: 150,
                    resizeMode: "contain",
                    marginHorizontal: 5,
                  }}
                />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  btnStyle: {
    backgroundColor: "#E0E0E0",
    padding: 15,
    borderRadius: 20,
    width: 165,
    alignItems: "center",
  },
});
