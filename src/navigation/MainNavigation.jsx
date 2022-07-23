import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import CustomerMainNavigation from "./customer/CustomerMainNavigation";

const Stack = createNativeStackNavigator();

const MainNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Customer Main"
        component={CustomerMainNavigation}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default MainNavigation;
