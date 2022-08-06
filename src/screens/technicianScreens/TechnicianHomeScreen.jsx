import React, { useContext, useState, useEffect, useCallback } from "react";
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
  getcompletedService,
  getPendingService,
} from "../../utils/QuickSummery";

const TechnicianHomeScreen = ({ navigation }) => {
  const { user } = useContext(AuthContext);
  const [completedServiceData, setCompletedServiceData] = useState({});
  const [pendingServiceData, setPendingServiceData] = useState({});

  // console.log(user);
  useFocusEffect(
    useCallback(() => {
      getcompletedService(user, setCompletedServiceData);
      getPendingService(user, setPendingServiceData);
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
              shadowColor: "#4a4848",
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
                  mb="8"
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
                      navigation.navigate("Work List", {
                        pendingServices: pendingServiceData,
                      })
                    }
                  >
                    <VStack space={2} alignItems="center">
                      <Text color="#fff">Pending Services</Text>
                      <Icon as={Feather} name="file" size="lg" color="#fff" />
                      <Heading size="md" color="#fff">
                        {pendingServiceData ? pendingServiceData.length : 0}
                      </Heading>
                    </VStack>
                  </TouchableOpacity>

                  <Divider bg="blue.400" height="50%" orientation="vertical" />

                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("Work List", {
                        completedServices: completedServiceData,
                      })
                    }
                  >
                    <VStack space={2} alignItems="center">
                      <Text color="#fff">Completed Services</Text>
                      <Icon as={Feather} name="file" size="lg" color="#fff" />
                      <Heading size="md" color="#fff">
                        {completedServiceData ? completedServiceData.length : 0}
                      </Heading>
                    </VStack>
                  </TouchableOpacity>
                </HStack>

                {/* Functions Section */}
                <Heading size="sm" mb="2" color="#333">
                  Technician Actions
                </Heading>
                <HStack
                  mb="3"
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
                    onPress={() => navigation.navigate("Work List")}
                  >
                    <VStack space={3} alignItems="center">
                      <Icon as={Feather} name="list" size="lg" color="#333" />
                      <Text color="#333">Work List</Text>
                    </VStack>
                  </TouchableOpacity>

                  <Divider bg="blue.400" height="50%" orientation="vertical" />

                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("Technician Invoice List")
                    }
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

                  <Divider bg="blue.400" height="50%" orientation="vertical" />

                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("Assigned Customer List")
                    }
                  >
                    <VStack space={3} alignItems="center">
                      <Icon
                        as={Feather}
                        name="user"
                        size="lg"
                        color="#333"
                      />
                      <Text color="#333">Customer List</Text>
                    </VStack>
                  </TouchableOpacity>
                </HStack>

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

export default TechnicianHomeScreen;
