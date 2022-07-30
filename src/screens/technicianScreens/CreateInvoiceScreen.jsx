import React, { useState, useCallback, useContext } from "react";
import {
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Container, Box, ScrollView, Button, Heading } from "native-base";
import { useForm } from "react-hook-form";

import * as DocumentPicker from "expo-document-picker";
import Ionicons from "react-native-vector-icons/Ionicons";

import {
  CreateServiceInput,
  CreateServiceTextArea,
} from "../../components/CustomerComponents/CustomFieldsCustomer";

import Loading from "../../utils/Loading";
import LoadingContext from "../../Context/LoadingContext";

import { BASE_URL } from "../../utils/apiUrls";
import { AuthContext } from "../../Context/AuthContext";
import { handleError } from "../../utils/LocalStoreCustomFunc";
import { getMediaHeader } from "../../utils/Header";

import axios from "axios";

const CreateInvoiceScreen = ({ route, navigation }) => {
  const { workID } = route.params;
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
    setError,
  } = useForm();

  const { loading, setLoading } = useContext(LoadingContext);
  const { user } = useContext(AuthContext);

  const [fileResponse, setFileResponse] = useState({});
  const [filename, setFilename] = useState("");

  const handleDocumentSelection = useCallback(async () => {
    try {
      const response = await DocumentPicker.getDocumentAsync({});
      // console.log(response);
      setFilename(response.name);
      setFileResponse(response);
    } catch (err) {
      console.warn(err);
    }
  }, []);

  // console.log(workID);

  const handleCreateService = async (data) => {
    setLoading(true);

    const workObjData = new FormData();
    workObjData.append("serviceID", workID);
    workObjData.append("tech_charge", data.tech_charge);
    workObjData.append("equip_charge", data.equip_charge);
    workObjData.append("details", data.details);

    // console.log(workObjData);

    if (fileResponse && Object.entries(fileResponse).length != 0) {
      workObjData.append("files", {
        uri: fileResponse.uri,
        type: fileResponse.mimeType,
        name: fileResponse.name,
      });
      // console.log("The object is not empty!");
    }
    // else {
    //   console.log("The object is empty!");
    // }
    const headers = await getMediaHeader();
    await axios
      .post(`${BASE_URL}/invoice/`, workObjData, {
        headers,
      })
      .then((res) => {
        // console.log(res);
        if (res.status === 201) {
          Alert.alert("Success", "Service create successful!");
          reset({});
          setFilename("");
          setFileResponse({});
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
            <Heading size="md" color="#333" mb="5">
              Create Invoice
            </Heading>

            <CreateServiceInput
              type="text"
              name="tech_charge"
              label="Technician Charge"
              placeholder="Enter Charge"
              control={control}
              rules={{ required: "Field is required", minLength: 1 }}
              errors={errors}
              keyboardType="numeric"
            />

            <CreateServiceInput
              type="text"
              name="equip_charge"
              label="Equipment Charge"
              placeholder="Enter Charge"
              control={control}
              rules={{ required: "Field is required", minLength: 1 }}
              errors={errors}
              keyboardType="numeric"
            />

            <CreateServiceTextArea
              type="text"
              name="details"
              label="Work Details"
              placeholder="Enter Details"
              control={control}
              rules={{ required: "Field is required", minLength: 3 }}
              errors={errors}
            />

            <View style={{ marginTop: 10, marginBottom: 20 }}>
              <Text style={{ color: "#808080" }}>Choose File (Optional)</Text>
              <TouchableOpacity
                style={{
                  marginTop: 5,
                  backgroundColor: "#999696",
                  padding: 10,
                  width: 100,
                  borderRadius: 5,
                  alignItems: "center",
                }}
                onPress={() => handleDocumentSelection()}
              >
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Ionicons name="document" size={20} color="#fff" />
                  <Text
                    style={{ color: "#fff", fontWeight: "700", marginTop: 5 }}
                  >
                    Select File
                  </Text>
                </View>
              </TouchableOpacity>
              <Text style={{ color: "#808080", marginTop: 10, marginLeft: 5 }}>
                File: {filename ? `${filename}` : `No file selected !`}
              </Text>
            </View>

            <Button
              bg="#286fad"
              mt="3"
              onPress={handleSubmit(handleCreateService)}
            >
              Create
            </Button>
          </Box>
        </Container>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreateInvoiceScreen;
