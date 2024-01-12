import { View, Text, SafeAreaView } from "react-native";
import React,{useEffect} from "react";
import { Video, ResizeMode } from "expo-av";
import { useNavigation } from "@react-navigation/native";

export default function OrderPlacedScreen() {
    const navigation = useNavigation();
    useEffect(() => {
      setTimeout(() => {
        navigation.replace("Main");
      }, 1300);
    }, []);
  return (
    <SafeAreaView style={{ backgroundColor: "white", flex: 1 }}>
      <Video
        source={require("../assets/check.mp4")}
        style={{
          height: 255,
          width: 255,
          alignSelf: "center",
          justifyContent: "center",
          marginTop: 120,
        }}
        rate={2}
        shouldPlay={true}
        resizeMode={ResizeMode.CONTAIN}
      />
      <Text
        style={{
          marginTop: 20,
          fontSize: 19,
          fontWeight: "600",
          textAlign: "center",
        }}
      >
        Your Order Has been Recieved
      </Text>
    </SafeAreaView>
  );
}
