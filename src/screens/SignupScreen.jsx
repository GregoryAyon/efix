import React, { useContext, useState, useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useForm } from "react-hook-form";

import { BASE_URL } from "../utils/apiUrls";
import {
  CustomInput,
  CustomSelect,
  CustomSelectArea,
} from "../components/SignupCustomFeilds";

import Loading from "../utils/Loading";
import SignupSVG from "../../assets/images/registration.svg";
import LoadingContext from "../Context/LoadingContext";

import axios from "axios";
import { handleError } from "../utils/LocalStoreCustomFunc";

const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&’+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/;

const SignupScreen = ({ navigation }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
    setError,
  } = useForm({ mode: "onChange" });
  const pwd = watch("password");

  const { loading, setLoading } = useContext(LoadingContext);
  const [division, setDivision] = useState([]);
  const [district, setDistrict] = useState([]);
  const [upazila, setUpazila] = useState([]);

  // Handle Signup
  const handleSignup = async (data) => {
    setLoading(true);
    await axios
      .post(`${BASE_URL}/account/`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        // console.log(res);
        if (res.status === 201) {
          Alert.alert("Success", "Account Created successful!");
          reset({});
          navigation.navigate("Login");
        }
      })
      .catch((error) => handleError(error));
    setLoading(false);
  };

  // Handle Division Api
  const getDivisions = async () => {
    await axios
      .get(`${BASE_URL}/division/`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        // console.log(res.data);
        setDivision(res.data);
      })
      .catch((error) => handleError(error));
  };

  // Handle District Api
  const getDistrict = async (divisionName) => {
    // console.log("Get Data: ", divisionID);
    await axios
      .get(`${BASE_URL}/district/?search=${divisionName}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        // console.log(res.data);
        setDistrict(res.data);
      })
      .catch((error) => handleError(error));
  };

  // Handle Upazila Api
  const getUpazila = async (districtName) => {
    // console.log("Get Data: ", districtID);
    await axios
      .get(`${BASE_URL}/upazila/?search=${districtName}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        // console.log(res.data);
        setUpazila(res.data);
      })
      .catch((error) => handleError(error));
  };

  useEffect(() => {
    getDivisions();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ paddingHorizontal: 25 }}
      >
        <View style={{ alignItems: "center" }}>
          <SignupSVG
            source={require("../../assets/images/login.svg")}
            height={300}
            width={300}
            style={{ transform: [{ rotate: "-5deg" }], marginTop: 10 }}
          />
        </View>
        <Text
          style={{
            // fontFamily: "Roboto",
            fontSize: 28,
            fontWeight: "700",
            color: "#333",
            marginBottom: 30,
          }}
        >
          E-Fix Signup
        </Text>

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
          type="email"
          name="email"
          label="Email Address"
          placeholder="Email Address"
          control={control}
          rules={{
            required: "Field is required",
            minLength: 3,
            pattern: { value: EMAIL_REGEX, message: "Invalid Email" },
          }}
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

        <CustomSelect
          name="role"
          label="Select Role"
          placeholder="Select Role"
          control={control}
          items={["customer", "technician"]}
          rules={{ required: "Field is required", minLength: 4 }}
          errors={errors}
        />

        <CustomSelect
          name="registration_type"
          label="Registration Type"
          placeholder="Select Type"
          control={control}
          items={["Residential", "Commercial", "Other"]}
          rules={{ required: "Field is required", minLength: 4 }}
          errors={errors}
        />

        <CustomSelect
          name="country"
          label="Country"
          placeholder="Select Country"
          control={control}
          items={["Bangladesh"]}
          rules={{ required: "Field is required", minLength: 4 }}
          errors={errors}
        />

        <CustomSelectArea
          name="division"
          label="Division"
          placeholder="Select Division"
          control={control}
          items={division}
          // items={["Dhaka"]}
          rules={{ required: "Field is required", minLength: 4 }}
          errors={errors}
          getData={getDistrict}
        />

        <CustomSelectArea
          name="district"
          label="District"
          placeholder="Select District"
          control={control}
          items={district}
          rules={{ required: "Field is required", minLength: 4 }}
          errors={errors}
          getData={getUpazila}
        />

        <CustomSelectArea
          name="upazila"
          label="Upazila"
          placeholder="Select Upazila"
          control={control}
          items={upazila}
          rules={{ required: "Field is required", minLength: 4 }}
          errors={errors}
        />

        <CustomInput
          type="text"
          name="post_office_or_union"
          label="Post Office / Union"
          placeholder="Enter Post Office / Union"
          control={control}
          rules={{ required: "Field is required", minLength: 4 }}
          errors={errors}
        />

        <CustomInput
          type="text"
          name="house_info"
          label="House Info / Village"
          placeholder="Enter Info"
          control={control}
          rules={{ required: "Field is required", minLength: 4 }}
          errors={errors}
        />

        <CustomInput
          type="text"
          name="nid"
          label="N-ID"
          placeholder="Enter NID"
          keyboardType="numeric"
          control={control}
          rules={{ required: "Field is required", minLength: 4 }}
          errors={errors}
        />

        <CustomInput
          type="password"
          name="password"
          label="Password"
          placeholder="Password"
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
        <Text
          style={{
            marginBottom: 5,
            color: "#c8ccc9",
            marginLeft: 5,
          }}
        >
          N.B: Your password can not be too similar to your other personal
          information.Your password must contain at least 8 characters.Your
          password can not be a commonly used password.Your password can not be
          entirely numeric.
        </Text>

        <CustomInput
          type="password"
          name="cpassword"
          label="Confirm Password"
          placeholder="Confirm Password"
          control={control}
          rules={{
            required: "Field is required",
            minLength: {
              value: 6,
              message: "Password should be at least 6 characters long",
            },
            validate: (value) => value === pwd || "Password do no match",
          }}
          errors={errors}
        />

        <TouchableOpacity
          onPress={handleSubmit(handleSignup)}
          style={{
            backgroundColor: "#AD40AF",
            padding: 20,
            borderRadius: 10,
            marginBottom: 30,
            marginTop: 10,
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
            Signup
          </Text>
        </TouchableOpacity>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginBottom: 30,
          }}
        >
          <Text>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={{ color: "#AD40AF", fontWeight: "700" }}>Login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignupScreen;
