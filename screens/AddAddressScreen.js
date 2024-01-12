import {
  View,
  Text,
  StatusBar,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import Toast from "react-native-simple-toast";
import React, { useState } from "react";
import api from "../api/api";
import LoadingScreen from "./LoadingScreen";
import { useNavigation } from "@react-navigation/native";
export default function AddAddressScreen() {
  const [name, setName] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [houseNo, setHouseNo] = useState("");
  const [street, setStreet] = useState("");
  const [landMark, setLandMark] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [pincode, setPincode] = useState("");
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const handleAddress = async () => {
    try {
      setLoading(true);
      const response = await api.get("/");
      const userId = response.data._id;
      await api.post("/addresses", {
        userId: userId,
        address: {
          name: name,
          mobileNo: mobileNo,
          houseNo,
          street,
          landMark,
          city,
          country,
          postalCode: pincode,
        },
      });
      setName("");
      setMobileNo("");
      setHouseNo("");
      setStreet("");
      setLandMark("");
      setCity("");
      setCountry("");
      setPincode("");
      setLoading(false);
      Toast.show("Address Successfully Added");
      navigation.pop();
    } catch (err) {
      console.log(err);
    }
  };
  return loading === true ? (
    <LoadingScreen />
  ) : (
    <>
      <StatusBar backgroundColor={"#92DEDA"} />
      <View
        style={{
          backgroundColor: "#92DEDA",
          height: 60,
          justifyContent: "center",
          paddingTop: 10,
        }}
      >
        <Text style={{ fontWeight: "bold", fontSize: 18, paddingLeft: 10 }}>
          Add New Address
        </Text>
      </View>
      <View style={{ margin: 5, gap: 5, marginHorizontal: 10 }}>
        <Text style={styles.textStyle}>Full Name (First and Last Name)</Text>
        <TextInput
          value={name}
          onChangeText={(text) => setName(text)}
          placeholder="Enter Your Name"
          style={styles.textInputStyle}
          placeholderTextColor={"black"}
        />
        <Text style={styles.textStyle}>Mobile Number</Text>
        <TextInput
          value={mobileNo}
          onChangeText={(text) => setMobileNo(text)}
          placeholder="Enter Your Mobile Number"
          style={styles.textInputStyle}
          placeholderTextColor={"black"}
        />
        <Text style={styles.textStyle}>Flat, House No, Building, Company</Text>
        <TextInput
          value={houseNo}
          onChangeText={(text) => setHouseNo(text)}
          placeholder="Enter Your House Number"
          style={styles.textInputStyle}
          placeholderTextColor={"black"}
        />
        <Text style={styles.textStyle}>Area, Street, Sector, Village</Text>
        <TextInput
          value={street}
          onChangeText={(text) => setStreet(text)}
          placeholder="Enter Your Street"
          style={styles.textInputStyle}
          placeholderTextColor={"black"}
        />
        <Text style={styles.textStyle}>LandMark</Text>
        <TextInput
          value={landMark}
          onChangeText={(text) => setLandMark(text)}
          placeholder="Eg. Near Apollo Hospital"
          style={styles.textInputStyle}
          placeholderTextColor={"black"}
        />
        <Text style={styles.textStyle}>City</Text>
        <TextInput
          value={city}
          onChangeText={(text) => setCity(text)}
          placeholder="Enter Your City"
          style={styles.textInputStyle}
          placeholderTextColor={"black"}
        />
        <Text style={styles.textStyle}>Country</Text>
        <TextInput
          value={country}
          onChangeText={(text) => setCountry(text)}
          placeholder="Enter Your Country"
          style={styles.textInputStyle}
          placeholderTextColor={"black"}
        />
        <Text style={styles.textStyle}>PinCode</Text>
        <TextInput
          value={pincode}
          onChangeText={(text) => setPincode(text)}
          placeholder="Enter PinCode"
          style={styles.textInputStyle}
          placeholderTextColor={"black"}
        />
        <TouchableOpacity
          style={{
            backgroundColor: "#FFC72C",
            marginTop: 5,
            borderRadius: 8,
            padding: 10,
            alignItems: "center",
          }}
          onPress={() => handleAddress()}
        >
          <Text>Add Address</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 17,
    fontWeight: "bold",
  },
  textInputStyle: {
    borderColor: "#D0D0D0",
    borderWidth: 1,
    height: 40,
    borderRadius: 8,
    padding: 5,
  },
});
