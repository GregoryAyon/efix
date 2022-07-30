import axios from "axios";
import { BASE_URL } from "../utils/apiUrls";
import { handleError } from "../utils/LocalStoreCustomFunc";
import { getHeader } from "../utils/Header";

// -----------------------Customer----------------------
export const getCancelledPost = async (user, setValue) => {
  const headers = await getHeader();
  await axios
    .get(`${BASE_URL}/service_request/?customer=${user?.id}&status=cancelled`, {
      headers,
    })
    .then((res) => {
      // console.log(res.data);
      setValue(res.data);
    })
    .catch((error) => handleError(error));
  //   console.log(headers);
};

export const getcompletedPost = async (user, setValue) => {
  const headers = await getHeader();
  await axios
    .get(`${BASE_URL}/service_request/?customer=${user?.id}&status=closed`, {
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
      `${BASE_URL}/service_request/?customer=${user?.id}&exclude_status=closed`,
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

export const getTotalCost = async (user, setValue) => {
  const headers = await getHeader();
  await axios
    .get(`${BASE_URL}/invoice/?service__customer=${user?.id}`, {
      headers,
    })
    .then((res) => {
      // console.log(res.data);
      setValue(res.data);
    })
    .catch((error) => handleError(error));
  //   console.log(headers);
};

export const getTotalCostAmount = (data) => {
  // console.log(data);
  if (data) {
    const total = data.reduce((sum, item) => {
      return sum + (item.tech_charge + item.equip_charge);
    }, 0);
    // console.log(total);
    return total;
  } else {
    return 0;
  }
};

export const getTotalPaidCost = async (user, setValue) => {
  const headers = await getHeader();
  await axios
    .get(`${BASE_URL}/invoice/?service__customer=${user?.id}&search=paid`, {
      headers,
    })
    .then((res) => {
      // console.log(res.data);
      setValue(res.data);
    })
    .catch((error) => handleError(error));
  //   console.log(headers);
};

export const getTotalPaidCostAmount = (data) => {
  // console.log(data);
  if (data) {
    const total = data.reduce((sum, item) => {
      return sum + (item.tech_charge + item.equip_charge);
    }, 0);
    // console.log(total);
    return total;
  } else {
    return 0;
  }
};

export const getTotalUnpaidCost = async (user, setValue) => {
  const headers = await getHeader();
  await axios
    .get(`${BASE_URL}/invoice/?service__customer=${user?.id}&search=unpaid`, {
      headers,
    })
    .then((res) => {
      // console.log(res.data);
      setValue(res.data);
    })
    .catch((error) => handleError(error));
  //   console.log(headers);
};

export const getTotalUnpaidCostAmount = (data) => {
  // console.log(data);
  if (data) {
    const total = data.reduce((sum, item) => {
      return sum + (item.tech_charge + item.equip_charge);
    }, 0);
    // console.log(total);
    return total;
  } else {
    return 0;
  }
};

//  ------------------Technician----------------------
export const getAssignedService = async (user, setValue) => {
  const headers = await getHeader();
  await axios
    .get(`${BASE_URL}/service_request/?technician=${user?.id}`, {
      headers,
    })
    .then((res) => {
      // console.log(res.data);
      setValue(res.data);
    })
    .catch((error) => handleError(error));
  //   console.log(headers);
};

export const getcompletedService = async (user, setValue) => {
  const headers = await getHeader();
  // console.log(headers);
  await axios
    .get(`${BASE_URL}/service_request/?technician=${user?.id}&status=closed`, {
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
      `${BASE_URL}/service_request/?technician=${user?.id}&exclude_status=closed`,
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

export const getTechIncome = async (user, setValue) => {
  const headers = await getHeader();
  await axios
    .get(`${BASE_URL}/invoice/?service__technician=${user?.id}&search=paid`, {
      headers,
    })
    .then((res) => {
      // console.log(res.data);
      setValue(res.data);
    })
    .catch((error) => handleError(error));
  //   console.log(headers);
};

export const getTechIncomeAmount = (data) => {
  // console.log(data);
  if (data) {
    const total = data.reduce((sum = 0, item) => {
      // console.log(item.tech_charge);
      return sum + item.tech_charge;
    }, 0);
    // console.log(total);
    return total;
  } else {
    return 0;
  }
};
