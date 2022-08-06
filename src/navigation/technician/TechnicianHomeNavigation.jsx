import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import TechnicianHomeScreen from "../../screens/technicianScreens/TechnicianHomeScreen";
import WorkListScreen from "../../screens/technicianScreens/WorkListScreen";
import DetailsWorkScreen from "../../screens/technicianScreens/DetailsWorkScreen";
import CreateInvoiceScreen from "../../screens/technicianScreens/CreateInvoiceScreen";
import TechnicianInvoiceListScreen from "../../screens/technicianScreens/TechnicianInvoiceListScreen";
import TechnicianInvoiceDetailsScreen from "../../screens/technicianScreens/TechnicianInvoiceDetailsScreen";
import AssignedCustomerListScreen from "../../screens/technicianScreens/AssignedCustomerListScreen";
import UpdateInfoScreen from "../../screens/UpdateInfoScreen";
import AboutScreen from "../../screens/AboutScreen";

const Stack = createNativeStackNavigator();

const TechnicianHomeNavigation = () => {
  return (
    <Stack.Navigator
      // screenOptions={{ headerShown: false }}
      initialRouteName="Technician Home"
    >
      <Stack.Screen
        name="Technician Home"
        component={TechnicianHomeScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Work List"
        component={WorkListScreen}
        options={{
          headerTransparent: true,
          headerTintColor: "white",
        }}
      />

      <Stack.Screen
        name="Details Work"
        component={DetailsWorkScreen}
        options={{
          headerTransparent: true,
          headerTintColor: "white",
        }}
      />

      <Stack.Screen
        name="Create Invoice"
        component={CreateInvoiceScreen}
        options={{
          headerTransparent: true,
          headerTintColor: "white",
        }}
      />

      <Stack.Screen
        name="Technician Invoice List"
        component={TechnicianInvoiceListScreen}
        options={{
          headerTransparent: true,
          headerTintColor: "white",
        }}
      />

      <Stack.Screen
        name="Technician Invoice Details"
        component={TechnicianInvoiceDetailsScreen}
        options={{
          headerTransparent: true,
          headerTintColor: "white",
        }}
      />

      <Stack.Screen
        name="Assigned Customer List"
        component={AssignedCustomerListScreen}
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

export default TechnicianHomeNavigation;
