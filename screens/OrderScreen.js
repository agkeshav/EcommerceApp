import { View, Text, TouchableOpacity } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import api from "../api/api";
import DeliveryAddressScreen from "./DeliveryAddressScreen";
import DeliveryOptionScreen from "./DeliveryOptionScreen";
import PaymentMethodScreen from "./PaymentMethodScreen";
import { Context as CartContext } from "../context/CartContext";
import { useNavigation } from "@react-navigation/native";
import LoadingScreen from "./LoadingScreen";
export default function OrderScreen() {
  const [selectedAddress, setSelectedAddress] = useState();
  const [deliveryOption, setDeliveryOption] = useState(false);
  const screens = [
    { id: 1, heading: "Address" },
    { id: 2, heading: "Delivery" },
    { id: 3, heading: "Payment" },
    { id: 4, heading: "Place Order" },
  ];
  const [screenId, setScreenId] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState();
  const { state, clearCart } = useContext(CartContext);
  const cart = state.cart;
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const total = cart
    ?.map((item) => item.price * item.quantity)
    .reduce((curr, prev) => curr + prev, 0);

  const handlePlaceOrder = async () => {
    try {
      setLoading(true);
      const response = await api.get("/");
      const user = response.data;
      await api.post("/orders", {
        userId: user._id,
        totalPrice: total,
        shippingAddress: selectedAddress,
        paymentMethod: paymentMethod,
        products: cart,
      });
      setScreenId(1);
      setDeliveryOption(false);
      setSelectedAddress();
      setPaymentMethod();
      clearCart();
      navigation.navigate("OrderPlacedScreen");
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
  return loading === true ? (
    <LoadingScreen />
  ) : (
    <View style={{ display: "flex", flex: 1 }}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          paddingTop: 15,
        }}
      >
        {screens.map((item) => (
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <View
              style={{
                backgroundColor: item.id >= screenId ? "#ccc" : "green",
                width: 35,
                height: 35,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 20,
              }}
            >
              <Text style={{ fontWeight: "bold", color: "white" }}>
                {item.id}
              </Text>
            </View>
            <Text>{item.heading}</Text>
          </View>
        ))}
      </View>
      <Text
        style={{
          height: 1,
          borderColor: "#D0D0D0",
          borderWidth: 1,
          marginTop: 5,
        }}
      />

      {screenId === 1 && (
        <DeliveryAddressScreen
          updateScreenId={() => setScreenId(2)}
          updateSelectedAddress={(item) => {
            setSelectedAddress(item);
          }}
          selectedAddress={selectedAddress}
        />
      )}

      {screenId === 2 && (
        <DeliveryOptionScreen
          updateScreenId={() => setScreenId(3)}
          deliveryOption={deliveryOption}
          updateDeliveryOption={(deliveryOption) => {
            setDeliveryOption(!deliveryOption);
          }}
        />
      )}

      {screenId === 3 && (
        <PaymentMethodScreen
          updateScreenId={() => setScreenId(4)}
          paymentMethod={paymentMethod}
          updatePaymentMethod={(id) => {
            if (id == 1) setPaymentMethod(1);
            if (id == 2) setPaymentMethod(2);
          }}
        />
      )}
      {screenId === 4 && (
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
            Order Now
          </Text>
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              backgroundColor: "white",
              elevation: 4,
              marginHorizontal: 10,
              padding: 5,
              paddingHorizontal: 10,
              marginVertical: 5,
            }}
          >
            <Text style={{ fontWeight: "bold", fontSize: 16 }}>
              Shiping to {selectedAddress?.name}
            </Text>
            <Text style={{ fontWeight: 500, fontSize: 15 }}>Items</Text>
            {cart.map((item) => (
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginVertical: 5,
                  alignItems: "center",
                }}
              >
                <Text numberOfLines={1} style={{ width: 200 }}>
                  {item.title}
                </Text>
                <Text style={{ fontWeight: 500 }}>₹{item.price}</Text>
              </View>
            ))}
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                marginVertical: 5,
                alignItems: "center",
              }}
            >
              <Text>Delivery</Text>
              <Text>₹0</Text>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                marginVertical: 5,
                alignItems: "center",
              }}
            >
              <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                Order Total
              </Text>
              <Text
                style={{ fontWeight: "bold", color: "#C60C30", fontSize: 18 }}
              >
                ₹{total}
              </Text>
            </View>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              backgroundColor: "white",
              elevation: 4,
              marginHorizontal: 10,
              padding: 5,
              paddingHorizontal: 10,
              marginVertical: 5,
            }}
          >
            <Text style={{ fontWeight: "700", fontSize: 16 }}>Pay With</Text>
            {paymentMethod === 1 ? (
              <Text style={{ fontWeight: "500", fontSize: 15 }}>
                Cash On Delivery
              </Text>
            ) : null}
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: "#FFC72C",
              marginTop: 10,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 8,
              marginBottom: 5,
              marginHorizontal: 10,
            }}
            onPress={() => {
              handlePlaceOrder();
            }}
          >
            <Text style={{ color: "white", padding: 9, fontWeight: 500 }}>
              Place Your Order
            </Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}
