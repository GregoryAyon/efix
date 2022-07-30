import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import CustomerHomeScreen from "../../screens/CustomerScreens/CustomerHomeScreen";
import CreateServiceScreen from "../../screens/CustomerScreens/CreateServiceScreen";
import ServiceListScreen from "../../screens/CustomerScreens/ServiceListScreen";
import DetailsServiceScreen from "../../screens/CustomerScreens/DetailsServiceScreen";
import CustomerInvoiceListScreen from "../../screens/CustomerScreens/CustomerInvoiceListScreen";
import CustomerInvoiceDetailsScreen from "../../screens/CustomerScreens/CustomerInvoiceDetailsScreen";
import UpdateInfoScreen from "../../screens/UpdateInfoScreen";
import AboutScreen from "../../screens/AboutScreen";

const Stack = createNativeStackNavigator();

const CustomerHomeNavigation = () => {
  return (
    <Stack.Navigator
      // screenOptions={{ headerShown: false }}
      initialRouteName="Customer Home"
    >
      <Stack.Screen
        name="Customer Home"
        component={CustomerHomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Create Service"
        component={CreateServiceScreen}
        options={{
          headerTransparent: true,
          headerTintColor: "white",
        }}
      />

      <Stack.Screen
        name="Service List"
        component={ServiceListScreen}
        options={{
          headerTransparent: true,
          headerTintColor: "white",
        }}
      />

      <Stack.Screen
        name="Details Service"
        component={DetailsServiceScreen}
        options={{
          headerTransparent: true,
          headerTintColor: "white",
        }}
      />

      <Stack.Screen
        name="Customer Invoice List"
        component={CustomerInvoiceListScreen}
        options={{
          headerTransparent: true,
          headerTintColor: "white",
        }}
      />

      <Stack.Screen
        name="Customer Invoice Details"
        component={CustomerInvoiceDetailsScreen}
        options={{
          headerTransparent: true,
          headerTintColor: "white",
        }}
      />

      {/* Profile Update Navigation */}
      <Stack.Screen
        name="Update Info"
        component={UpdateInfoScreen}
        options={{
          headerTransparent: true,
          headerTintColor: "white",
        }}
      />

      <Stack.Screen
        name="About"
        component={AboutScreen}
        options={{
          headerTransparent: true,
          headerTintColor: "white",
        }}
      />
    </Stack.Navigator>
  );
};

export default CustomerHomeNavigation;
