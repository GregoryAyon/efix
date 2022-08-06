import React, { useState, useCallback, useContext } from "react";
import {
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Container, Box, ScrollView, Button, Heading, Link } from "native-base";
import { useForm } from "react-hook-form";

import {
  CreateServiceInput,
  CreateServiceTextArea,
} from "../../components/CustomerComponents/CustomFieldsCustomer";
import Ionicons from "react-native-vector-icons/Ionicons";

import { BASE_URL } from "../../utils/apiUrls";
import { AuthContext } from "../../Context/AuthContext";

const TechnicianInvoiceDetailsScreen = ({ route, navigation }) => {
  const { invoice } = route.params;
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
    setError,
  } = useForm({
    defaultValues: {
      tech_charge: String(invoice.tech_charge),
      equip_charge: String(invoice.equip_charge),
      details: invoice.details,
    },
  });

  const { user } = useContext(AuthContext);

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
            <Heading size="md" color="#333" mb="1">
              #{invoice.id} - Invoice Details
            </Heading>

            <Heading size="sm" color="#919090" mb="3">
              Title: {invoice.service.title}
            </Heading>

            <CreateServiceInput
              isReadOnly={true}
              type="text"
              name="tech_charge"
              label="Technician Charge"
              placeholder="Enter Charge"
              control={control}
              rules={{ required: "Field is required", minLength: 1 }}
              errors={errors}
            />

            <CreateServiceInput
              isReadOnly={true}
              type="text"
              name="equip_charge"
              label="Equipment Charge"
              placeholder="Enter Charge"
              control={control}
              rules={{ required: "Field is required", minLength: 1 }}
              errors={errors}
            />

            <CreateServiceTextArea
              isReadOnly={true}
              type="text"
              name="details"
              label="Work Details"
              placeholder="Enter Details"
              control={control}
              rules={{ required: "Field is required", minLength: 3 }}
              errors={errors}
            />

            <View
              style={{
                marginTop: 10,
                marginBottom: 10,
                flexDirection: "row",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                <Ionicons
                  name="calendar"
                  size={15}
                  style={{ marginRight: 3 }}
                  color="#bdbbbb"
                />
                <Text
                  style={{ color: "#808080", marginTop: 5, fontWeight: "700" }}
                >
                  Issued: {invoice.created_at}
                </Text>
              </View>
            </View>

            <View style={{ marginTop: 5, marginBottom: 20 }}>
              <Text style={{ color: "#808080" }}>
                Download File (If you need.)
              </Text>
              {invoice.files ? (
                <Link
                  style={{
                    marginTop: 5,
                    backgroundColor: "#999696",
                    padding: 10,
                    width: 100,
                    borderRadius: 5,
                    alignItems: "center",
                  }}
                  href={invoice.files}
                >
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Ionicons name="download" size={20} color="#fff" />
                    <Text
                      style={{
                        color: "#fff",
                        fontWeight: "700",
                        marginTop: 5,
                        marginLeft: 5,
                      }}
                    >
                      Download
                    </Text>
                  </View>
                </Link>
              ) : (
                <Text
                  style={{ color: "#808080", marginTop: 5, fontWeight: "700" }}
                >
                  N.B: No file aviable !
                </Text>
              )}
            </View>
          </Box>
        </Container>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TechnicianInvoiceDetailsScreen;
