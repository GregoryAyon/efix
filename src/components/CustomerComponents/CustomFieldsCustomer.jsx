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

export const CreateServiceInput = ({
  isReadOnly = false,
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
              isReadOnly={isReadOnly}
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

export const CreateServiceSelectPriority = ({
  isDisabled = false,
  name,
  label,
  control,
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
            <Select
              isDisabled={isDisabled}
              selectedValue={value}
              minWidth="200"
              accessibilityLabel="Select Priority"
              placeholder="Select Priority"
              _selectedItem={{
                bg: "teal.600",
                endIcon: <CheckIcon size="5" />,
              }}
              mt={1}
              onValueChange={(val) => onChange(val)}
            >
              <Select.Item label="High" value="High" />
              <Select.Item label="Medium" value="Medium" />
              <Select.Item label="Low" value="Low" />
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

export const CreateServiceSelectStatus = ({
  isDisabled = false,
  name,
  label,
  control,
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
            <Select
              isDisabled={isDisabled}
              selectedValue={value}
              minWidth="200"
              accessibilityLabel={label}
              placeholder="Select Status"
              _selectedItem={{
                bg: "teal.600",
                endIcon: <CheckIcon size="5" />,
              }}
              mt={1}
              onValueChange={(val) => onChange(val)}
            >
              <Select.Item label="New" value="new" />
              <Select.Item label="In Progress" value="in_progress" />
              <Select.Item
                label="Waitting on Customer"
                value="waittingoncustomer"
              />
              <Select.Item label="Fixed" value="fixed" />
              <Select.Item label="Closed" value="closed" />
              <Select.Item label="Cancelled" value="cancelled" />
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

export const CreateServiceTextArea = ({
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
