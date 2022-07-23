import React from "react";

import TechnicianHomeNavigation from "./TechnicianHomeNavigation";
import { ProfileScreen } from "../../screens/ProfileScreen";

import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
const Tab = createMaterialBottomTabNavigator();

import Ionicons from "react-native-vector-icons/Ionicons";

const TechnicianMainNavigation = () => {
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
        component={TechnicianHomeNavigation}
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

export default TechnicianMainNavigation;
