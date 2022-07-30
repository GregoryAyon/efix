import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { Image } from "native-base";

import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";

import Loading from "../../utils/Loading";
import { AuthContext } from "../../Context/AuthContext";

import InactiveComponent from "../../components/inactiveComponent";
import {
  getCancelledPost,
  getcompletedPost,
  getincompletedPost,
  getTotalCost,
  getTotalCostAmount,
  getTotalPaidCost,
  getTotalPaidCostAmount,
  getTotalUnpaidCost,
  getTotalUnpaidCostAmount,
} from "../../utils/QuickSummery";

const CustomerHomeScreen = ({ navigation }) => {
  const { user } = useContext(AuthContext);
  const [completedPostData, setCompletedPostData] = useState({});
  const [incompletedPostData, setIncompletedPostData] = useState({});
  const [cancelledPostData, setCancelledPostData] = useState({});
  const [totalCost, setTotalCost] = useState(null);
  const [totalPaidCost, setTotalPaidCost] = useState(null);
  const [totalUnpaidCost, setTotalUnpaidCost] = useState(null);

  useEffect(() => {
    getCancelledPost(user, setCancelledPostData);
    getcompletedPost(user, setCompletedPostData);
    getincompletedPost(user, setIncompletedPostData);
    getTotalCost(user, setTotalCost);
    getTotalPaidCost(user, setTotalPaidCost);
    getTotalUnpaidCost(user, setTotalUnpaidCost);
  }, []);

  return (
    <>
      {user?.active ? (
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
              {/* card row 1 */}
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
                    navigation.navigate("Service List", {
                      completedPosts: completedPostData,
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
                    Completed Post
                  </Text>
                  <Text
                    style={{
                      color: "#fff",
                      fontSize: 22,
                      fontWeight: "700",
                      marginTop: 5,
                    }}
                  >
                    {completedPostData ? completedPostData.length : 0}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("Service List", {
                      incompletedPosts: incompletedPostData,
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
                    Incompleted Post
                  </Text>
                  <Text
                    style={{
                      color: "#fff",
                      fontSize: 22,
                      fontWeight: "700",
                      marginTop: 5,
                    }}
                  >
                    {incompletedPostData ? incompletedPostData.length : 0}
                  </Text>
                </TouchableOpacity>
              </View>

              {/* card row 2 */}
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
                    navigation.navigate("Service List", {
                      cancelledPosts: cancelledPostData,
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
                    Cancelled Post
                  </Text>
                  <Text
                    style={{
                      color: "#fff",
                      fontSize: 22,
                      fontWeight: "700",
                      marginTop: 5,
                    }}
                  >
                    {cancelledPostData ? cancelledPostData.length : 0}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => navigation.navigate("Customer Invoice List")}
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
                    name="pricetag"
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
                    Total Cost
                  </Text>
                  <Text
                    style={{
                      color: "#fff",
                      fontSize: 22,
                      fontWeight: "700",
                      marginTop: 5,
                    }}
                  >
                    <Text>&#x9F3;</Text> {getTotalCostAmount(totalCost)}
                  </Text>
                </TouchableOpacity>
              </View>

              {/* card row 3 */}
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
                    navigation.navigate("Customer Invoice List", {
                      totalPaidPosts: totalPaidCost,
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
                    name="pricetag"
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
                    Total Paid
                  </Text>
                  <Text
                    style={{
                      color: "#fff",
                      fontSize: 22,
                      fontWeight: "700",
                      marginTop: 5,
                    }}
                  >
                    <Text>&#x9F3;</Text> {getTotalPaidCostAmount(totalPaidCost)}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("Customer Invoice List", {
                      totalUnpaidPosts: totalUnpaidCost,
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
                    name="pricetag"
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
                    Total Unpaid
                  </Text>
                  <Text
                    style={{
                      color: "#fff",
                      fontSize: 22,
                      fontWeight: "700",
                      marginTop: 5,
                    }}
                  >
                    <Text>&#x9F3;</Text>{" "}
                    {getTotalUnpaidCostAmount(totalUnpaidCost)}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Function Section */}
            <View
              style={{
                backgroundColor: "#fff",
                padding: 10,
                marginTop: 5,
                marginBottom: 5,

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
                }}
              >
                <TouchableOpacity
                  onPress={() => navigation.navigate("Create Service")}
                >
                  <View
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                      width: 100,
                      padding: 10,
                    }}
                  >
                    <MaterialIcons name="add" size={40} color="#286fad" />
                    <Text style={{ fontSize: 16, fontWeight: "700" }}>
                      Create Service
                    </Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => navigation.navigate("Service List")}
                >
                  <View
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                      width: 100,
                      marginLeft: 20,
                      padding: 10,
                    }}
                  >
                    <Ionicons name="list" size={40} color="#286fad" />
                    <Text style={{ fontSize: 16, fontWeight: "700" }}>
                      Services List
                    </Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => navigation.navigate("Customer Invoice List")}
                >
                  <View
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                      width: 100,
                      marginLeft: 20,
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
                // mt="1"
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

export default CustomerHomeScreen;
