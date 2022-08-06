import axios from "axios";
import { BASE_URL } from "../utils/apiUrls";
import { handleError } from "../utils/LocalStoreCustomFunc";
import { getHeader } from "../utils/Header";

// -----------------------Customer----------------------
export const getcompletedPost = async (user, setValue) => {
  const headers = await getHeader();
  await axios
    .get(`${BASE_URL}/service_request/?customer=${user?.id}&status=Completed`, {
      headers,
    })
    .then((res) => {
      // console.log(res.data);
      setValue(res.data);
    })
    .catch((error) => handleError(error));
  //   console.log(headers);
};

export const getincompletedPost = async (user, setValue) => {
  const headers = await getHeader();
  await axios
    .get(
      `${BASE_URL}/service_request/?customer=${user?.id}&exclude_status=Completed`,
      {
        headers,
      }
    )
    .then((res) => {
      // console.log(res.data);
      setValue(res.data);
    })
    .catch((error) => handleError(error));
  //   console.log(headers);
};



//  ------------------Technician----------------------

export const getcompletedService = async (user, setValue) => {
  const headers = await getHeader();
  // console.log(headers);
  await axios
    .get(`${BASE_URL}/service_request/?technician=${user?.id}&status=Completed`, {
      headers,
    })
    .then((res) => {
      // console.log(res.data);
      setValue(res.data);
    })
    .catch((error) => handleError(error));
  //   console.log(headers);
};

export const getPendingService = async (user, setValue) => {
  const headers = await getHeader();
  await axios
    .get(
      `${BASE_URL}/service_request/?technician=${user?.id}&exclude_status=Completed`,
      {
        headers,
      }
    )
    .then((res) => {
      // console.log(res.data);
      setValue(res.data);
    })
    .catch((error) => handleError(error));
  //   console.log(headers);
};


