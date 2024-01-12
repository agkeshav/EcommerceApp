import React, { useState, useEffect, useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "../screens/LoginScreen";
import LoadingScreen from "../screens/LoadingScreen";
import SignUpScreen from "../screens/SignUpScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ProfileScreen from "../screens/ProfileScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import HomeScreen from "../screens/HomeScreen";
import CartScreen from "../screens/CartScreen";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ProductInfoScreen from "../screens/ProductInfoScreen";
import OrderScreen from "../screens/OrderScreen";
import OrderPlacedScreen from "../screens/OrderPlacedScreen";
import AddressScreen from "../screens/AddressScreen";
import AddAddressScreen from "../screens/AddAddressScreen";
import { View, TouchableOpacity, Text } from "react-native";
import { Context as CartContext } from "../context/CartContext";
import CartIcon from "../components/CartIcon";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function Navigation() {
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(true);
  const tryLocalSignIn = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      // console.log(token);
      if (token) {
        setToken(token);
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    tryLocalSignIn();
  });
 
  function Main() {
    return (
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            paddingBottom: 5,
            height: 50,
          },
        }}
      >
        <Tab.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Entypo name="home" size={24} color="black" />
              ) : (
                <Entypo name="home" size={24} color="#008E97" />
              ),
            tabBarLabel: "Home",
            tabBarLabelStyle: {
              color: "black",
              fontWeight: "bold",
            },
            tabBarHideOnKeyboard: true,
          }}
        />
        <Tab.Screen
          name="ProfileScreen"
          component={ProfileScreen}
          options={{
            tabBarIcon: ({ focused }) =>
              focused ? (
                <MaterialCommunityIcons
                  name="account"
                  size={24}
                  color="black"
                />
              ) : (
                <MaterialCommunityIcons
                  name="account"
                  size={24}
                  color="#008E97"
                />
              ),
            tabBarLabel: "You",
            tabBarLabelStyle: {
              color: "black",
              fontWeight: "bold",
            },
          }}
        />
        <Tab.Screen
          name="CartScreen"
          component={CartScreen}
          options={{
            tabBarIcon: ({ focused }) =>
              focused ? (
                <CartIcon color="black" />
              ) : (
                <CartIcon color="#008E97" />
              ),
            tabBarLabel: "Cart",
            tabBarLabelStyle: {
              color: "black",
              fontWeight: "bold",
            },
          }}
        />
      </Tab.Navigator>
    );
  }
  return loading === true ? (
    <LoadingScreen />
  ) : (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {!token ? (
          <>
            <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="Main" component={Main} />
            <Stack.Screen
              name="ProductInfoScreen"
              component={ProductInfoScreen}
            />
            <Stack.Screen name="OrderScreen" component={OrderScreen} />
            <Stack.Screen
              component={OrderPlacedScreen}
              name="OrderPlacedScreen"
            />
            <Stack.Screen component={AddressScreen} name="AddressScreen" />
            <Stack.Screen
              component={AddAddressScreen}
              name="AddAddressScreen"
            />
          </>
        ) : (
          <>
            <Stack.Screen name="Main" component={Main} />
            <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen
              name="ProductInfoScreen"
              component={ProductInfoScreen}
            />
            <Stack.Screen name="OrderScreen" component={OrderScreen} />
            <Stack.Screen
              component={OrderPlacedScreen}
              name="OrderPlacedScreen"
            />
            <Stack.Screen component={AddressScreen} name="AddressScreen" />
            <Stack.Screen
              component={AddAddressScreen}
              name="AddAddressScreen"
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
