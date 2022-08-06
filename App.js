import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  setStatusBarBackgroundColor,
  setStatusBarTranslucent,
  setStatusBarStyle,
} from "expo-status-bar";

import { NativeBaseProvider } from "native-base";
import { LoadingProvidor } from "./src/Context/LoadingContext";
import { AuthProvider } from "./src/Context/AuthContext";

// import MainNavigation from "./src/navigation/MainNavigation";
import CustomerMainNavigation from "./src/navigation/customer/CustomerMainNavigation";
import TechnicianMainNavigation from "./src/navigation/technician/TechnicianMainNavigation";
import LoginScreen from "./src/screens/LoginScreen";
import SignupScreen from "./src/screens/SignupScreen";

import { registerForPushNotificationsAsync } from "./src/utils/DeviceToken";

const Stack = createNativeStackNavigator();

export default function App() {
  useEffect(() => {
    setStatusBarTranslucent(true);
    setStatusBarBackgroundColor("transparent");
    setStatusBarStyle("dark");

    registerForPushNotificationsAsync();
  }, []);

  return (
    <AuthProvider>
      <LoadingProvidor>
        <NativeBaseProvider>
          <NavigationContainer>
            <Stack.Navigator
              // screenOptions={{ headerShown: false }}
              initialRouteName="Login"
            >
              <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Signup"
                component={SignupScreen}
                options={{ headerShown: false }}
              />

              <Stack.Screen
                name="Customer Main"
                component={CustomerMainNavigation}
                options={{ headerShown: false }}
              />

              <Stack.Screen
                name="Technician Main"
                component={TechnicianMainNavigation}
                options={{ headerShown: false }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </NativeBaseProvider>
      </LoadingProvidor>
    </AuthProvider>
  );
}
