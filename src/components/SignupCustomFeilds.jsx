import React from "react";
import { Controller } from "react-hook-form";
import {
  Input,
  FormControl,
  Icon,
  Select,
  CheckIcon,
  TextArea,
} from "native-base";

export const CustomInput = ({
  isdisabled = false,
  isRequired = true,
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
    <FormControl isRequired={isRequired} isInvalid={name in errors} mb="1">
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

export const CustomSelect = ({
  isdisabled = false,
  name,
  label,
  control,
  placeholder,
  rules = {},
  items = [],
  errors,
}) => {
  return (
    <FormControl isRequired isInvalid={name in errors} mb="1">
      <FormControl.Label>{label}</FormControl.Label>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <Select
              isDisabled={isdisabled}
              selectedValue={value}
              minWidth="200"
              accessibilityLabel="Select Priority"
              placeholder={placeholder}
              _selectedItem={{
                bg: "teal.600",
                endIcon: <CheckIcon size="5" />,
              }}
              mt={1}
              onValueChange={(val) => onChange(val)}
            >
              {items.map((item, index) => {
                return <Select.Item key={index} label={item} value={item} />;
              })}
            </Select>
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

export const CustomSelectArea = ({
  isdisabled = false,
  name,
  label,
  control,
  placeholder,
  rules = {},
  items = [],
  errors,
  getData = () => {},
}) => {
  return (
    <FormControl isRequired isInvalid={name in errors} mb="1">
      <FormControl.Label>{label}</FormControl.Label>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <Select
              isDisabled={isdisabled}
              selectedValue={value}
              minWidth="200"
              accessibilityLabel="Select Priority"
              placeholder={placeholder}
              _selectedItem={{
                bg: "teal.600",
                endIcon: <CheckIcon size="5" />,
              }}
              mt={1}
              onValueChange={(val) => {
                onChange(val), getData(val);
              }}
            >
              {items.map((item) => {
                return (
                  <Select.Item
                    key={item.id}
                    label={item.name}
                    value={item.name}
                  />
                );
              })}
            </Select>
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

export const CustomSignupTextArea = ({
  isReadOnly = false,
  type,
  name,
  label,
  control,
  placeholder,
  rules = {},
  errors,
}) => {
  return (
    <FormControl isRequired isInvalid={name in errors} mb="1">
      <FormControl.Label>{label}</FormControl.Label>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <TextArea
              h={20}
              type={type}
              onBlur={onBlur}
              placeholder={placeholder}
              onChangeText={(val) => onChange(val)}
              value={value}
              isReadOnly={isReadOnly}
              w="100%"
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
