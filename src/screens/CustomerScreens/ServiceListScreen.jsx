import React, { useEffect, useState, useContext } from "react";
import {
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
  FlatList,
  ImageBackground,
} from "react-native";
import { Searchbar } from "react-native-paper";

import Ionicons from "react-native-vector-icons/Ionicons";
import { Box, Heading, Center } from "native-base";

import { AuthContext } from "../../Context/AuthContext";
import { BASE_URL } from "../../utils/apiUrls";

import axios from "axios";

const ServiceListScreen = ({ navigation }) => {
  const [serviceItems, setServiceItems] = useState("");
  const [search, setSearch] = useState("");

  const { user } = useContext(AuthContext);

  const getCreateServiceList = async () => {
    await axios
      .get(
        `${BASE_URL}/service_request/?customer=${user?.id}&search=${search}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        // console.log(res.data);
        setServiceItems(res.data);
      })
      .catch((err) => {
        for (const [key, value] of Object.entries(err.response.data)) {
          Alert.alert("Error", String(value));
        }
      });
  };

  const getStatusPerfactValue = (item) => {
    // console.log(typeof item.status);
    if (item.status === "new") {
      return "New";
    } else if (item.status === "in_progress") {
      return "In Progress";
    } else if (item.status === "waittingoncustomer") {
      return "Waitting on Customer";
    } else if (item.status === "fixed") {
      return "Fixed";
    } else if (item.status === "closed") {
      return "Closed";
    } else if (item.status === "cancelled") {
      return "Cancelled";
    } else {
      return "None";
    }
  };

  useEffect(() => {
    getCreateServiceList();
  }, [search]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#bab9b6" }}>
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
      ></View>

      <View
        style={{
          backgroundColor: "#dbd9d9",
          marginTop: 10,
          padding: 18,
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
        }}
      >
        <Searchbar
          placeholder="Search Service"
          onChangeText={(value) => setSearch(value)}
          value={search}
        />
      </View>

      <FlatList
        h="100%"
        w="100%"
        style={{
          flex: 1,
          backgroundColor: "#dbd9d9",
          marginTop: 10,
        }}
        ListHeaderComponent={
          <Heading size="md" color="#333" mt="5" ml="5">
            Service List View
          </Heading>
        }
        ListEmptyComponent={
          <Center
            style={{
              paddingVertical: 120,
              paddingHorizontal: 50,
            }}
          >
            <ImageBackground
              source={require("../../../assets/images/no-data.gif")}
              style={{
                width: 250,
                height: 250,
              }}
            />
          </Center>
        }
        data={serviceItems}
        renderItem={({ item }) => (
          <Box
            bg="#fff"
            width="90%"
            alignSelf="center"
            mt="3"
            p="3"
            rounded="lg"
            shadow={2}
            mb="2"
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: "600",
                opacity: 0.5,
              }}
            >
              {item.title}
            </Text>

            <View
              style={{
                marginTop: 5,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                <Ionicons
                  name="list"
                  size={15}
                  style={{ marginRight: 3, marginTop: 5 }}
                  color="#bdbbbb"
                />
                <Text style={{ opacity: 0.5, marginTop: 5 }}>
                  Service Status: {getStatusPerfactValue(item)}
                </Text>
              </View>
              <Text
                style={{
                  backgroundColor: "#71bfe3",
                  padding: 3,
                  width: 120,
                  borderRadius: 5,
                  textAlign: "center",
                  color: "#fff",
                }}
              >
                Service No.{item.servicereq_no}
              </Text>
            </View>

            <View
              style={{
                marginTop: 6,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                style={{
                  backgroundColor: "#286fad",
                  padding: 10,
                  width: 100,
                  borderRadius: 5,
                  alignItems: "center",
                }}
                onPress={() =>
                  navigation.navigate("Details Service", { service: item })
                }
              >
                <Text style={{ color: "#fff", fontWeight: "600" }}>
                  View Details
                </Text>
              </TouchableOpacity>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Ionicons
                  name="calendar"
                  size={15}
                  style={{ marginRight: 3 }}
                  color="#bdbbbb"
                />
                <Text
                  style={{
                    opacity: 0.5,
                  }}
                >
                  Created Date: {item.created_at}
                </Text>
              </View>
            </View>
          </Box>
        )}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};

export default ServiceListScreen;
