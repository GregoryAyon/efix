import React from "react";

import CustomerHomeNavigation from "./CustomerHomeNavigation";
import { ProfileScreen } from "../../screens/ProfileScreen";

import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
const Tab = createMaterialBottomTabNavigator();

import Ionicons from "react-native-vector-icons/Ionicons";

const CustomerMainNavigation = () => {
  return (
    <Tab.Navigator
      barStyle={{
        backgroundColor: "#286fad",
        position: "absolute",
        overflow: "hidden",
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
      }}
      labeled={false}
    >
      <Tab.Screen
        name="Home"
        component={CustomerHomeNavigation}
        options={{
          tabBarIcon: () => <Ionicons name="home" size={25} color="white" />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: () => <Ionicons name="person" size={25} color="white" />,
        }}
      />
    </Tab.Navigator>
  );
};

export default CustomerMainNavigation;
