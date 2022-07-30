import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { Image } from "native-base";

import Ionicons from "react-native-vector-icons/Ionicons";

import Loading from "../../utils/Loading";
import { AuthContext } from "../../Context/AuthContext";

import InactiveComponent from "../../components/inactiveComponent";
import {
  getAssignedService,
  getcompletedService,
  getPendingService,
  getTechIncome,
  getTechIncomeAmount,
} from "../../utils/QuickSummery";

const TechnicianHomeScreen = ({ navigation }) => {
  const { user } = useContext(AuthContext);
  const [assignedServiceData, setAssignedServiceData] = useState({});
  const [completedServiceData, setCompletedServiceData] = useState({});
  const [pendingServiceData, setPendingServiceData] = useState({});
  const [techIncome, setTechIncome] = useState(null);

  // console.log(completedServiceData.length);

  useEffect(() => {
    getAssignedService(user, setAssignedServiceData);
    getcompletedService(user, setCompletedServiceData);
    getPendingService(user, setPendingServiceData);
    getTechIncome(user, setTechIncome);
  }, []);

  return (
    <>
      {user?.active ? (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#edeef5" }}>
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
            {/* Info Section */}
            <View
              style={{
                backgroundColor: "#fff",
                padding: 10,
                marginTop: 10,
                marginBottom: 10,
                borderTopLeftRadius: 15,
                borderTopRightRadius: 15,

                shadowColor: "#4a4848",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.8,
                shadowRadius: 8,
                elevation: 3,
              }}
            >
              {/* card row 1 start */}
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: 12,
                }}
              >
                <TouchableOpacity
                  onPress={() => navigation.navigate("Work List")}
                  style={{
                    backgroundColor: "#286fad",
                    padding: 10,
                    borderRadius: 5,
                    width: 150,
                    alignItems: "center",
                    margin: 1,

                    shadowColor: "#000",
                    shadowOffset: {
                      width: 0,
                      height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 5,
                  }}
                >
                  <Ionicons
                    name="copy"
                    size={32}
                    style={{ marginTop: 4 }}
                    color="#fff"
                  />
                  <Text
                    style={{
                      color: "#fff",
                      fontSize: 16,
                      fontWeight: "700",
                      borderBottomWidth: 2,
                      borderBottomColor: "#fff",
                    }}
                  >
                    Assigned Services
                  </Text>
                  <Text
                    style={{
                      color: "#fff",
                      fontSize: 22,
                      fontWeight: "700",
                      marginTop: 5,
                    }}
                  >
                    {assignedServiceData ? assignedServiceData.length : 0}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("Work List", {
                      completedServices: completedServiceData,
                    })
                  }
                  style={{
                    backgroundColor: "#286fad",
                    padding: 10,
                    borderRadius: 5,
                    width: 150,
                    alignItems: "center",
                    margin: 1,

                    shadowColor: "#000",
                    shadowOffset: {
                      width: 0,
                      height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 5,
                  }}
                >
                  <Ionicons
                    name="copy"
                    size={32}
                    style={{ marginTop: 4 }}
                    color="#fff"
                  />
                  <Text
                    style={{
                      color: "#fff",
                      fontSize: 16,
                      fontWeight: "700",
                      borderBottomWidth: 2,
                      borderBottomColor: "#fff",
                    }}
                  >
                    Completed Services
                  </Text>
                  <Text
                    style={{
                      color: "#fff",
                      fontSize: 22,
                      fontWeight: "700",
                      marginTop: 5,
                    }}
                  >
                    {completedServiceData ? completedServiceData.length : 0}
                  </Text>
                </TouchableOpacity>
              </View>
              {/* card row 1 end */}

              {/* card row 2 start */}
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: 12,
                }}
              >
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("Work List", {
                      pendingServices: pendingServiceData,
                    })
                  }
                  style={{
                    backgroundColor: "#286fad",
                    padding: 10,
                    borderRadius: 5,
                    width: 150,
                    alignItems: "center",
                    margin: 1,

                    shadowColor: "#000",
                    shadowOffset: {
                      width: 0,
                      height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 5,
                  }}
                >
                  <Ionicons
                    name="copy"
                    size={32}
                    style={{ marginTop: 4 }}
                    color="#fff"
                  />
                  <Text
                    style={{
                      color: "#fff",
                      fontSize: 16,
                      fontWeight: "700",
                      borderBottomWidth: 2,
                      borderBottomColor: "#fff",
                    }}
                  >
                    Pending Services
                  </Text>
                  <Text
                    style={{
                      color: "#fff",
                      fontSize: 22,
                      fontWeight: "700",
                      marginTop: 5,
                    }}
                  >
                    {pendingServiceData ? pendingServiceData.length : 0}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("Technician Invoice List", {
                      techIncomeList: techIncome,
                    })
                  }
                  style={{
                    backgroundColor: "#286fad",
                    padding: 10,
                    borderRadius: 5,
                    width: 150,
                    alignItems: "center",
                    margin: 1,

                    shadowColor: "#000",
                    shadowOffset: {
                      width: 0,
                      height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 5,
                  }}
                >
                  <Ionicons
                    name="copy"
                    size={32}
                    style={{ marginTop: 4 }}
                    color="#fff"
                  />
                  <Text
                    style={{
                      color: "#fff",
                      fontSize: 16,
                      fontWeight: "700",
                      borderBottomWidth: 2,
                      borderBottomColor: "#fff",
                    }}
                  >
                    Total Income
                  </Text>
                  <Text
                    style={{
                      color: "#fff",
                      fontSize: 22,
                      fontWeight: "700",
                      marginTop: 5,
                    }}
                  >
                    <Text>&#x9F3;</Text> {getTechIncomeAmount(techIncome)}
                  </Text>
                </TouchableOpacity>
              </View>
              {/* card row 2 end */}
            </View>

            {/* Function Section */}
            <View
              style={{
                backgroundColor: "#fff",
                padding: 10,
                marginTop: 5,
                marginBottom: 10,
                paddingHorizontal: 25,

                shadowColor: "#4a4848",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.8,
                shadowRadius: 8,
                elevation: 3,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <TouchableOpacity
                  onPress={() => navigation.navigate("Work List")}
                >
                  <View
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                      width: 100,
                      padding: 10,
                    }}
                  >
                    <Ionicons name="list" size={40} color="#286fad" />
                    <Text style={{ fontSize: 16, fontWeight: "700" }}>
                      Work List
                    </Text>
                  </View>
                </TouchableOpacity>

                <View
                  style={{
                    borderLeftColor: "#286fad",
                    borderLeftWidth: 4,
                    height: 78,
                  }}
                ></View>

                <TouchableOpacity
                  onPress={() => navigation.navigate("Technician Invoice List")}
                >
                  <View
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                      width: 100,
                      padding: 10,
                    }}
                  >
                    <Ionicons name="document" size={40} color="#286fad" />
                    <Text style={{ fontSize: 16, fontWeight: "700" }}>
                      Invoices
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
              <Image
                mt="6"
                mb="4"
                size="xl"
                resizeMode="contain"
                rounded={5}
                w="100%"
                source={require("../../../assets/images/customer-home.jpg")}
                alt="profile_bg"
              />
            </View>
          </ScrollView>
        </SafeAreaView>
      ) : (
        <InactiveComponent />
      )}
    </>
  );
};

export default TechnicianHomeScreen;
