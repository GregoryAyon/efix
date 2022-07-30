import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { Controller } from "react-hook-form";
import { Input, FormControl, Icon } from "native-base";
import { Ionicons } from "@expo/vector-icons";

export const CustomLoginInput = ({
  isdisabled = false,
  type,
  name,
  label,
  control,
  placeholder,
  rules = {},
  errors,
  keyboardType = "default",
}) => {
  return (
    <FormControl isRequired isInvalid={name in errors} mb="1">
      <FormControl.Label>{label}</FormControl.Label>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <Input
              onBlur={onBlur}
              placeholder={placeholder}
              onChangeText={(val) => onChange(val)}
              value={value}
              type={type}
              isDisabled={isdisabled}
              keyboardType={keyboardType}
              InputLeftElement={
                <Icon
                  m="2"
                  ml="3"
                  size="6"
                  color="gray.400"
                  as={<Ionicons name="create-outline" />}
                />
              }
            />
            <FormControl.ErrorMessage>
              {errors[name]?.message}
            </FormControl.ErrorMessage>
          </>
        )}
        name={name}
        rules={rules}
        defaultValue=""
      />
    </FormControl>
  );
};

export const CustomLoginPasswordInput = ({
  isdisabled = false,
  setPassShow,
  passShow,
  type,
  name,
  label,
  control,
  placeholder,
  rules = {},
  errors,
  keyboardType = "default",
}) => {
  return (
    <FormControl isRequired isInvalid={name in errors} mb="1">
      <FormControl.Label>{label}</FormControl.Label>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <Input
              onBlur={onBlur}
              placeholder={placeholder}
              onChangeText={(val) => onChange(val)}
              value={value}
              type={passShow ? "text" : type}
              isDisabled={isdisabled}
              keyboardType={keyboardType}
              InputLeftElement={
                <Icon
                  m="2"
                  ml="3"
                  size="6"
                  color="gray.400"
                  as={<Ionicons name="create-outline" />}
                />
              }
              InputRightElement={
                <TouchableOpacity onPress={() => setPassShow(!passShow)}>
                  <Icon
                    m="2"
                    size="md"
                    mr="5"
                    color="gray.400"
                    as={
                      <Ionicons
                        name={passShow ? "eye-outline" : "eye-off-outline"}
                      />
                    }
                  />
                </TouchableOpacity>
              }
            />
            <FormControl.ErrorMessage>
              {errors[name]?.message}
            </FormControl.ErrorMessage>
          </>
        )}
        name={name}
        rules={rules}
        defaultValue=""
      />
    </FormControl>
  );
};
