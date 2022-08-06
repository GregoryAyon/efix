import React, { useContext, useEffect, useState, useCallback } from "react";
import {
  View,
  SafeAreaView,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import {
  Button,
  Container,
  Heading,
  Icon,
  Box,
  StatusBar,
  ScrollView,
  VStack,
  Text,
  HStack,
  Divider,
  Image,
} from "native-base";
import { useFocusEffect } from '@react-navigation/native';
import { Feather, Ionicons } from "@expo/vector-icons";

import Loading from "../../utils/Loading";
import { AuthContext } from "../../Context/AuthContext";

import InactiveComponent from "../../components/inactiveComponent";
import {
  getcompletedPost,
  getincompletedPost,
} from "../../utils/QuickSummery";

const CustomerHomeScreen = ({ navigation }) => {
  const { user } = useContext(AuthContext);
  const [completedPostData, setCompletedPostData] = useState({});
  const [incompletedPostData, setIncompletedPostData] = useState({});
 
  useFocusEffect(
    useCallback(() => {
      // console.log("Screen Loaded!");
      getcompletedPost(user, setCompletedPostData);
      getincompletedPost(user, setIncompletedPostData);
    }, [])
  );

  return (
    <>
      {user?.active ? (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
          <View
            style={{
              backgroundColor: "#286fad",
              width: "100%",
              height: 100,
              borderBottomLeftRadius: 15,
              borderBottomRightRadius: 15,
              shadowColor: "#333",
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.8,
              shadowRadius: 2,
              elevation: 5,
            }}
          >
            <View
              style={{
                marginTop: 50,
                paddingHorizontal: 25,
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 10,
              }}
            >
              <View style={{
                flexDirection: "column",
              }}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "700",
                  color: "#fff",
                }}
              >
                Hello, {user?.name} !
              </Text>
              <Text style={{fontSize: 14, color: "#fff", fontWeight: "600",}}>ID: #{user?.reg_no}</Text>
              </View>
              
              <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
                <ImageBackground
                  source={require("../../../assets/images/user-profile.jpg")}
                  style={{
                    width: 25,
                    height: 25,
                  }}
                  imageStyle={{ borderRadius: 25 }}
                />
              </TouchableOpacity>
            </View>
          </View>

          <ScrollView>
            <Container h="100%" w="100%" maxWidth="100%">
              <Box width="100%" padding="5">
                <Heading size="sm" mb="2" color="#333">
                  Information Summary
                </Heading>
                {/* Row One */}
                <HStack
                  mb="5"
                  justifyContent="space-evenly"
                  alignItems="center"
                  width="100%"
                  bg="#286fad"
                  shadow={2}
                  borderRadius="5"
                  padding="2"
                >
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("Service List", {
                        completedPosts: completedPostData,
                      })
                    }
                  >
                    <VStack space={2} alignItems="center">
                      <Text color="#fff">Completed Service</Text>
                      <Icon as={Feather} name="file" size="lg" color="#fff" />
                      <Heading size="md" color="#fff">
                        {completedPostData ? completedPostData.length : 0}
                      </Heading>
                    </VStack>
                  </TouchableOpacity>

                  <Divider bg="blue.400" height="50%" orientation="vertical" />

                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("Service List", {
                        incompletedPosts: incompletedPostData,
                      })
                    }
                  >
                    <VStack space={2} alignItems="center">
                      <Text color="#fff">Pending Service</Text>
                      <Icon as={Feather} name="file" size="lg" color="#fff" />
                      <Heading size="md" color="#fff">
                        {incompletedPostData ? incompletedPostData.length : 0}
                      </Heading>
                    </VStack>
                  </TouchableOpacity>
                </HStack>

                {/* Functions Section */}
                <Heading size="sm" mb="2" color="#333">
                  Customer Actions
                </Heading>
                <HStack
                  mb="5"
                  justifyContent="space-evenly"
                  alignItems="center"
                  width="100%"
                  bg="#ffffff"
                  shadow={2}
                  borderWidth="2"
                  borderColor="#286fad"
                  borderRadius="5"
                  padding="5"
                >
                  <TouchableOpacity
                    onPress={() => navigation.navigate("Create Service")}
                  >
                    <VStack space={3} alignItems="center">
                      <Icon as={Feather} name="plus" size="lg" color="#333" />
                      <Text color="#333">Create Service</Text>
                    </VStack>
                  </TouchableOpacity>

                  <Divider bg="blue.400" height="50%" orientation="vertical" />

                  <TouchableOpacity
                    onPress={() => navigation.navigate("Service List")}
                  >
                    <VStack space={3} alignItems="center">
                      <Icon as={Feather} name="list" size="lg" color="#333" />
                      <Text color="#333">Service List</Text>
                    </VStack>
                  </TouchableOpacity>

                  <Divider bg="blue.400" height="50%" orientation="vertical" />

                  <TouchableOpacity
                    onPress={() => navigation.navigate("Customer Invoice List")}
                  >
                    <VStack space={3} alignItems="center">
                      <Icon
                        as={Feather}
                        name="file-text"
                        size="lg"
                        color="#333"
                      />
                      <Text color="#333">Invoice List</Text>
                    </VStack>
                  </TouchableOpacity>
                </HStack>

                  
                {/* Payment Section */}
                {/* <Heading size="sm" mb="2" color="#333">
                  Payment Information
                </Heading>
                <HStack
                  mb="3"
                  flexDirection="column"
                  width="100%"
                  bg="#ffffff"
                  shadow={2}
                  borderWidth="2"
                  borderColor="#286fad"
                  borderRadius="5"
                  px="5"
                  py="3"
                >
                  <View style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center"
                  }}>
                    <Image
                      resizeMode="contain"
                      w="80px"
                      h="40px"
                      source={require("../../../assets/images/bkash.png")}
                      alt="bkash"
                      mr="5"
                    />
                    <Text color="#333" fontSize="20">01700000000</Text>
                  </View>
                  <View style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center"
                  }}>
                    <Image
                      resizeMode="contain"
                      w="80px"
                      h="35px"
                      source={require("../../../assets/images/nagad.png")}
                      alt="nagad"
                      mr="5"
                    />
                    <Text color="#333" fontSize="20">01700000000</Text>
                  </View>
                  <View style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center"
                  }}>
                    <Image
                      resizeMode="contain"
                      w="80px"
                      h="35px"
                      source={require("../../../assets/images/rocket.png")}
                      alt="rocket"
                      mr="5"
                    />
                    <Text color="#333" fontSize="20" mt="1">01700000000</Text>
                  </View>
                </HStack> */}

                <Image
                  mt="10"
                  size="xl"
                  resizeMode="contain"
                  rounded={5}
                  w="100%"
                  source={require("../../../assets/images/technicianHome.png")}
                  alt="profile_bg"
                />
              </Box>
            </Container>
          </ScrollView>
        </SafeAreaView>
      ) : (
        <InactiveComponent />
      )}
    </>
  );
};

export default CustomerHomeScreen;
