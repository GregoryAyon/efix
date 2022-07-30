import React, { useState } from "react";
import { SafeAreaView, View, ImageBackground, Text } from "react-native";
import { Container, Box, ScrollView, Button, Heading } from "native-base";

const AboutScreen = () => {
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
              About ITSOURCE
            </Heading>

            <ImageBackground
              source={require("../../assets/images/itsource-logo.png")}
              style={{
                marginTop: 45,
                width: 300,
                height: 50,
                marginLeft: 10,
              }}
            />
            <View style={{ marginTop: 25, marginLeft: 30 }}>
              <Text style={{ fontSize: 16 }}>BANGLADESH OFFICE</Text>
              <Text style={{ fontSize: 14, marginTop: 5 }}>
                House# 10, Road# 18, Sector# 14, Uttara Model Town, Dhaka 1230{" "}
              </Text>
              <Text style={{ fontSize: 14 }}>Phone: (+88) 01873-666673</Text>
              <Text style={{ fontSize: 14 }}>Mail: sales@itsourcebd.com</Text>
            </View>
          </Box>
        </Container>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AboutScreen;
