import React, { useEffect, useState, useContext, useCallback } from "react";
import {
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
  FlatList,
  ImageBackground,
} from "react-native";
import { useFocusEffect } from '@react-navigation/native';
import * as Linking from "expo-linking";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Box, Heading, Center, Link, Button } from "native-base";
import { Searchbar } from "react-native-paper";
import { AuthContext } from "../../Context/AuthContext";
import { BASE_URL } from "../../utils/apiUrls";
import { handleError } from "../../utils/LocalStoreCustomFunc";
import { getHeader } from "../../utils/Header";
import Loading from "../../utils/Loading";

import axios from "axios";

const AssignedCustomerListScreen = ({ navigation }) => {
  const [customers, setCustomer] = useState("");
  const [search, setSearch] = useState("");
  const [pageLoading, setPageLoading] = useState(true);
  const { user } = useContext(AuthContext);

  // console.log(user.work_area__area_name);

  const getCreateServiceList = async () => {
    const headers = await getHeader();
    await axios
      .get(`${BASE_URL}/account/?role=customer&work_area=${user?.work_area}&search=${search}`, {
        headers,
      })
      .then((res) => {
        // console.log(res.data);
        setCustomer(res.data);
      })
      .catch((error) => handleError(error));
    // console.log('Clicked!');
    setPageLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      getCreateServiceList();
  }, [search])
  );
 

  if (pageLoading) return <Loading />;

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
          // borderTopLeftRadius: 15,
          // borderTopRightRadius: 15,
        }}
        ListHeaderComponent={
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 5,
            }}
          >
            <Heading size="md" color="#333" mt="5" ml="5">
              Assigned Customer List
            </Heading>
            <Heading size="md" color="#333" mt="5" mr="5">
              All ({customers.length})
            </Heading>
          </View>
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
        data={customers}
        renderItem={({ item }) => (
          <Box
            bg="#fff"
            width="90%"
            alignSelf="center"
            mt="3"
            p="5"
            rounded="lg"
            shadow={2}
            mb="2"
          >
            <View
              style={{
                marginTop: 5,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text
              style={{
                fontSize: 16,
                fontWeight: "600",
                opacity: 0.5,
              }}
            >
              {item.name}
            </Text>
            <Text
                style={{
                  backgroundColor: "#71bfe3",
                  padding: 3,
                  width: 100,
                  borderRadius: 5,
                  textAlign: "center",
                  color: "#fff",
                }}
              >
                Reg No.{item.reg_no}
              </Text>
            </View>
            

            <View
              style={{
                marginTop: 5,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text style={{ opacity: 0.5, marginTop: 5 }}>
                Phone: {item.phone}
              </Text>
              <Button
                  size="xs"
                  ml="4"
                  px="8"
                  py="1"
                  colorScheme="green"
                  variant="outline"
                  onPress={() => {
                    return Linking.openURL(`tel:${item.phone}`);
                  }}
                >
                  Call Now
                </Button>
              
            </View>

            <View
              style={{
                marginTop: 8,
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <Text style={{ opacity: 0.5, marginTop: 5 }}>
                Address: {item.house_info}
              </Text>
            </View>
          </Box>
        )}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};

export default AssignedCustomerListScreen;
