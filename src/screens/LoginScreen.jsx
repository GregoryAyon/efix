import React, { useContext, useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useForm } from "react-hook-form";

import axios from "axios";

import {
  CustomLoginInput,
  CustomLoginPasswordInput,
} from "../components/LoginCustomFeilds";
import Loading from "../utils/Loading";
import LoginSVG from "../../assets/images/login.svg";
import { BASE_URL } from "../utils/apiUrls";
import { AuthContext } from "../Context/AuthContext";
import LoadingContext from "../Context/LoadingContext";
import { setSSValueFor, getSSValueFor } from "../utils/LocalStoreCustomFunc";

import jwt_decode from "jwt-decode";
import * as SecureStore from "expo-secure-store";

import { handleError } from "../utils/LocalStoreCustomFunc";

const LoginScreen = ({ navigation }) => {
  const { loading, setLoading } = useContext(LoadingContext);
  const { user, setUser, authToken, setAuthToken } = useContext(AuthContext);

  const [initLoading, setInitLoading] = useState(true);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const navigateByRole = () => {
    // console.log(user);
    if (user) {
      // console.log(user.role);
      if (user.role === "customer") {
        // console.log("Customer");
        navigation.replace("Customer Main");
      } else {
        // console.log("Technician");
        navigation.replace("Technician Main");
      }
      setInitLoading(false);
    }
  };

  const getUser = async (token, userId) => {
    // console.log("get in to getUser!");

    await axios
      .get(`${BASE_URL}/account/?search=${userId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${token}`,
        },
      })
      .then(async (response) => {
        // console.log(response.data);
        if (response.status == 200) {
          setUser(response.data[0]);
          setAuthToken(token);

          const deviceToken = await SecureStore.getItemAsync("devicetoken");
          // console.log(deviceToken);
          await axios
            .post(
              `${BASE_URL}/userdevicetoken/`,
              { user_id: parseInt(userId), device_token: deviceToken },
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `JWT ${token}`,
                },
              }
            )
            .catch((error) => handleError(error));
        }
      })
      .catch((error) => handleError(error));
  };

  const authenticate = async () => {
    let token = await SecureStore.getItemAsync("token");
    let expiryDate = await SecureStore.getItemAsync("expiry_date");
    let userId = await SecureStore.getItemAsync("user_id");

    if (token && new Date() < new Date(expiryDate * 1000)) {
      getUser(token, userId);
    } else {
      setAuthToken(null);
      setInitLoading(false);
    }
  };

  useEffect(() => {
    authenticate();
  }, []);

  useEffect(() => {
    navigateByRole();
  }, [user]);

  const handleLogin = async (data) => {
    // console.log("Login Test!");
    setLoading(true);
    await axios
      .post(`${BASE_URL}/token`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        if (res.status == 200) {
          // console.log(res.data);
          const token = res.data.access;
          const decoded = jwt_decode(token);
          // console.log(decoded);
          setSSValueFor("token", token);
          setSSValueFor("expiry_date", String(decoded.exp));
          setSSValueFor("user_id", String(decoded.user_id));
          getUser(token, decoded.user_id);
          Alert.alert("Success", "Logged in successfully");
        }
      })
      .catch((error) => handleError(error));
    setLoading(false);
  };

  if (initLoading) return <Loading />;
  else if (loading) return <Loading />;

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
      <View style={{ paddingHorizontal: 25 }}>
        <View style={{ alignItems: "center" }}>
          <LoginSVG
            source={require("../../assets/images/login.svg")}
            height={300}
            width={300}
            style={{ transform: [{ rotate: "-5deg" }] }}
          />
        </View>
        <Text
          style={{
            fontSize: 28,
            fontWeight: "700",
            color: "#333",
            marginBottom: 30,
          }}
        >
          E-Fix Login
        </Text>

        <CustomLoginInput
          type="text"
          name="username"
          label="Phone / Email"
          placeholder="Enter Phone or Email"
          control={control}
          rules={{ required: "Field is required", minLength: 4 }}
          errors={errors}
        />

        <CustomLoginPasswordInput
          type="password"
          name="password"
          label="Password"
          placeholder="Enter Password"
          control={control}
          rules={{
            required: "Field is required",
            minLength: {
              value: 6,
              message: "Password should be at least 6 characters long",
            },
          }}
          errors={errors}
        />

        <TouchableOpacity
          onPress={handleSubmit(handleLogin)}
          // onPress={() => navigation.replace("Technician Main")}
          style={{
            backgroundColor: "#AD40AF",
            padding: 20,
            borderRadius: 10,
            marginTop: 15,
            marginBottom: 30,
          }}
        >
          <Text
            style={{
              color: "#fff",
              fontSize: 18,
              fontWeight: "700",
              textAlign: "center",
            }}
          >
            Login
          </Text>
        </TouchableOpacity>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginBottom: 25,
          }}
        >
          <Text>Don't have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
            <Text style={{ color: "#AD40AF", fontWeight: "700" }}>Signup</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
