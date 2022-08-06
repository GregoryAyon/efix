import React, { useEffect, useState, useContext, useCallback } from "react";
import { View, SafeAreaView, FlatList, ImageBackground } from "react-native";
import { Searchbar } from "react-native-paper";

import Ionicons from "react-native-vector-icons/Ionicons";
import {
  Text,
  Heading,
  Center,
  Badge,
  Box,
  Flex,
  HStack,
  Spacer,
  Pressable,
  Button,
  Icon,
} from "native-base";
import { useFocusEffect } from '@react-navigation/native';

import { AuthContext } from "../../Context/AuthContext";
import { BASE_URL } from "../../utils/apiUrls";
import { handleError } from "../../utils/LocalStoreCustomFunc";
import { getHeader } from "../../utils/Header";
import Loading from "../../utils/Loading";

import axios from "axios";

const WorkListScreen = ({ route, navigation }) => {
  const [serviceItems, setServiceItems] = useState("");
  const [search, setSearch] = useState("");
  const [pageLoading, setPageLoading] = useState(true);

  const { user } = useContext(AuthContext);

  const getCreateServiceList = async () => {
    const headers = await getHeader();
    await axios
      .get(
        `${BASE_URL}/service_request/?technician=${user?.id}&search=${search}`,
        {
          headers,
        }
      )
      .then((res) => {
        // console.log(res.data);
        setServiceItems(res.data);
      })
      .catch((error) => handleError(error));
    setPageLoading(false);
  };

  //   console.log(serviceItems);

  useFocusEffect(
    useCallback(() => {
      if (route.params) {
        if ("completedServices" in route.params) {
          setServiceItems(route.params.completedServices);
        } else if ("pendingServices" in route.params) {
          setServiceItems(route.params.pendingServices);
        }
        setPageLoading(false);
      } else {
        getCreateServiceList();
      }
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

      {route.params ? (
        <></>
      ) : (
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
      )}

      <FlatList
        h="100%"
        w="100%"
        style={{
          flex: 1,
          backgroundColor: "#dbd9d9",
          marginTop: 10,
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
              Work List View
            </Heading>
            <Heading size="md" color="#333" mt="5" mr="5">
              Total List: {serviceItems.length}
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
        data={serviceItems}
        renderItem={({ item }) => (
          // navigation.navigate("Details Service", { service: item })
          <Box shadow={2} bg="lightBlue.50" p="3" mb="3" mx="4" rounded="10">
            <HStack alignItems="center">
              <Badge
                colorScheme={"info"}
                _text={{
                  textTransform: "capitalize",
                }}
                variant="solid"
                rounded="4"
              >
                {item.servicereq_no}
              </Badge>
              <Spacer />
              <HStack color="coolGray.800" alignItems="center">
                <Icon as={Ionicons} name="calendar-outline" size="xs" mr="1" />
                <Text fontSize="xs">{item.created_at}</Text>
              </HStack>
            </HStack>
            <Text color="coolGray.800" mt="1" fontWeight="medium" fontSize="xl">
              {item.title}
            </Text>
            <HStack color="warning.600" alignItems="center">
              <Icon
                color="warning.600"
                as={Ionicons}
                name="list-circle-outline"
                size="sm"
                mr="1"
              />
              <Text
                color="warning.600"
                fontSize="sm"
                style={{ textTransform: "capitalize" }}
              >
                {item.status}
              </Text>

              {item ? (
                item.status === "Completed" ? (
                  <Button
                    size="xs"
                    ml="4"
                    px="1"
                    py="1"
                    colorScheme="green"
                    variant="outline"
                    onPress={() =>
                      navigation.replace("Create Invoice", { workID: item.id })
                    }
                  >
                    Create Invoice
                  </Button>
                ) : (
                  <></>
                )
              ) : (
                <></>
              )}
            </HStack>
            <Flex direction="row" justify="flex-end" align="center" mt="1">
              <Pressable
                onPress={() =>
                  navigation.navigate("Details Work", { service: item })
                }
              >
                {({ isHovered, isFocused, isPressed }) => {
                  return (
                    <>
                      {isPressed ? (
                        <Text
                          mt="2"
                          fontSize={16}
                          fontWeight="medium"
                          textDecorationLine="underline"
                          color="darkBlue.600"
                          alignSelf="flex-start"
                        >
                          View Details
                        </Text>
                      ) : (
                        <Text
                          mt="2"
                          fontSize={16}
                          fontWeight="medium"
                          color="darkBlue.600"
                        >
                          View Details
                        </Text>
                      )}
                    </>
                  );
                }}
              </Pressable>
            </Flex>
          </Box>
        )}
        keyExtractor={(item) => item.id}
      />
      <View
        style={{
          margin: 23,
        }}
      ></View>
    </SafeAreaView>
  );
};

export default WorkListScreen;
