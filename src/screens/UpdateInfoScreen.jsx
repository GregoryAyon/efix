import React, { useContext, useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Container, Box, ScrollView, Button, Heading } from "native-base";
import { useForm } from "react-hook-form";
import {
  CustomInput,
  CustomSelect,
  CustomSelectArea,
  CustomSignupTextArea,
} from "../components/SignupCustomFeilds";

import { BASE_URL } from "../utils/apiUrls";

import Loading from "../utils/Loading";
import LoadingContext from "../Context/LoadingContext";
import { AuthContext } from "../Context/AuthContext";

import axios from "axios";
import { handleError } from "../utils/LocalStoreCustomFunc";
import { getHeader } from "../utils/Header";

const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&’+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/;

const UpdateInfoScreen = ({ navigation }) => {
  const { user } = useContext(AuthContext);

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
    setError,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      name: user?.name,
      phone: user?.phone,
      email: user?.email,
      // role: user?.role,
      house_info: user?.house_info,
    },
  });
  const { loading, setLoading } = useContext(LoadingContext);

  // Handle Update
  const handleSignup = async (data) => {
    setLoading(true);
    const headers = await getHeader();
    await axios
      .patch(`${BASE_URL}/account/${user?.id}/`, data, {
        headers,
      })
      .then((res) => {
        // console.log(res);
        if (res.status === 200) {
          Alert.alert("Success", "Information Updated successful!");
          // reset({});
          if (user?.role === "customer") {
            navigation.replace("Customer Main");
          } else {
            navigation.replace("Technician Main");
          }
        }
      })
      .catch((error) => handleError(error));
    setLoading(false);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#bab9b6" }}>
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
      ></View>
      <ScrollView
        h="100%"
        w="100%"
        bg="blue.50"
        mt="2"
        style={{ borderTopLeftRadius: 15, borderTopRightRadius: 15 }}
      >
        <Container h="100%" w="100%" maxWidth="100%">
          <Box width="100%" padding="5">
            <Heading size="md" color="#333" mb="3">
              Update Profile Information
            </Heading>

            <CustomInput
              type="text"
              name="name"
              label="Username"
              placeholder="Enter Username"
              control={control}
              rules={{ required: "Field is required", minLength: 4 }}
              errors={errors}
            />

            <CustomInput
              type="text"
              name="phone"
              label="Phone Number"
              placeholder="Phone Number"
              keyboardType="numeric"
              control={control}
              rules={{
                required: "Field is required",
                minLength: {
                  value: 11,
                  message: "Phone number should be 11 digits long",
                },
              }}
              errors={errors}
            />

            <CustomInput
              type="email"
              name="email"
              label="Email Address"
              placeholder="Email Address"
              control={control}
              rules={{
                // required: "Field is required",
                minLength: 3,
                pattern: { value: EMAIL_REGEX, message: "Invalid Email" },
              }}
              isRequired={false}
              errors={errors}
            />

            {/* <CustomSelect
              name="role"
              label="Select Role"
              placeholder="Select Role"
              control={control}
              items={["customer", "technician"]}
              rules={{ required: "Field is required", minLength: 4 }}
              errors={errors}
            /> */}

            <CustomSignupTextArea
              type="text"
              name="house_info"
              label="Address"
              placeholder="Enter Address"
              control={control}
              rules={{ required: "Field is required", minLength: 4 }}
              errors={errors}
            />

            <Button
              colorScheme="muted"
              mt="3"
              onPress={handleSubmit(handleSignup)}
            >
              Update Info
            </Button>
          </Box>
        </Container>
      </ScrollView>
    </SafeAreaView>
  );
};

export default UpdateInfoScreen;
