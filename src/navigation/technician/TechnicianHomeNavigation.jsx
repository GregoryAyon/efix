import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import TechnicianHomeScreen from "../../screens/technicianScreens/TechnicianHomeScreen";
import WorkListScreen from "../../screens/technicianScreens/WorkListScreen";
import DetailsWorkScreen from "../../screens/technicianScreens/DetailsWorkScreen";
import CreateInvoice from "../../screens/technicianScreens/CreateInvoice";

const Stack = createNativeStackNavigator();

const TechnicianHomeNavigation = () => {
  return (
    <Stack.Navigator
      // screenOptions={{ headerShown: false }}
      initialRouteName="Technician Home"
    >
      <Stack.Screen
        name="Customer Home"
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
        component={CreateInvoice}
        options={{
          headerTransparent: true,
          headerTintColor: "white",
        }}
      />
    </Stack.Navigator>
  );
};

export default TechnicianHomeNavigation;
