import * as SecureStore from "expo-secure-store";

export const getHeader = async () => {
  let token = await SecureStore.getItemAsync("token");

  return {
    "Content-Type": "application/json",
    Authorization: `JWT ${token}`,
  };
};

export const getMediaHeader = async () => {
  let token = await SecureStore.getItemAsync("token");

  return {
    "Content-Type": "multipart/form-data",
    Authorization: `JWT ${token}`,
  };
};

// return {
//   headers: {
//     "Content-Type": "application/json",
//     Authorization: `JWT ${token}`,
//   },
// };
