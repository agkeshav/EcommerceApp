import { View, Text, TouchableOpacity,Pressable } from 'react-native'
import React from 'react'
import { Entypo, FontAwesome5 } from '@expo/vector-icons';

export default function PaymentMethodScreen(props) {
    const paymentMethod = props.paymentMethod;
  return (
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
        Select Your Payment Method
      </Text>
      <View>
        <View
          style={{
            marginHorizontal: 10,
            backgroundColor: "white",
            elevation: 4,
            borderRadius: 5,
            padding: 5,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 5,
          }}
        >
          <Pressable
            style={{ marginHorizontal: 10 }}
            onPress={() => props.updatePaymentMethod(1)}
          >
            {paymentMethod && paymentMethod == 1 ? (
              <FontAwesome5 name="dot-circle" size={24} color="#008397" />
            ) : (
              <Entypo name="circle" size={24} color="black" />
            )}
          </Pressable>
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              padding: 5,
              marginRight: 10,
            }}
          >
            <Text numberOfLines={2}>Cash On Delivery</Text>
          </View>
        </View>
        <View
          style={{
            marginHorizontal: 10,
            backgroundColor: "white",
            elevation: 4,
            borderRadius: 5,
            padding: 5,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 5,
          }}
        >
          <Pressable
            style={{ marginHorizontal: 10 }}
            onPress={() => props.updatePaymentMethod(2)}
          >
            {paymentMethod && paymentMethod == 2 ? (
              <FontAwesome5 name="dot-circle" size={24} color="#008397" />
            ) : (
              <Entypo name="circle" size={24} color="black" />
            )}
          </Pressable>
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              padding: 5,
              marginRight: 10,
            }}
          >
            <Text numberOfLines={2}>UPI / Credit or Debit Card</Text>
          </View>
        </View>
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
          if (paymentMethod) {
            props.updateScreenId()
          }
        }}
      >
        <Text style={{ color: "white", padding: 9, fontWeight: 500 }}>
          Continue
        </Text>
      </TouchableOpacity>
    </>
  );
}