import React, { useContext } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { AuthContext } from "../Context/AuthContext";

const inactiveComponent = () => {
  const { user } = useContext(AuthContext);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#e4e3e6" }}>
      <View
        style={{
          backgroundColor: "#286fad",
          width: "100%",
          height: 100,
          borderBottomLeftRadius: 15,
          borderBottomRightRadius: 15,
          shadowColor: "#4a4848",
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.8,
          shadowRadius: 2,
          elevation: 5,
        }}
      >
        <View
          style={{
            marginTop: 60,
            paddingHorizontal: 25,
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 10,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: "700",
              color: "#fff",
            }}
          >
            Hello, {user?.name} !
          </Text>
          <TouchableOpacity onPress={() => {}}>
            <ImageBackground
              source={require("../../assets/images/user-profile.jpg")}
              style={{
                width: 25,
                height: 25,
              }}
              imageStyle={{ borderRadius: 25 }}
            />
          </TouchableOpacity>
        </View>

        <View>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "700",
              textAlign: "center",
              paddingTop: 150,
            }}
          >
            Welcome to E-Fix, {user?.name}.
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "500",
              textAlign: "center",
              padding: 12,
            }}
          >
            We recieved your registretion. But you can't access your deshborad
            yet. Please get your membership first. Now please close your app and
            wait for acount activation notification then login again. Thank you.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default inactiveComponent;
