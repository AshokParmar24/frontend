import axiosInstance from "./axios";

export const singUpUser = (payload) => {
  console.log("payload", payload);
  return axiosInstance.post("user/signup", payload);
};

export const signInUser = (payload) => {
  return axiosInstance.post("user/singin", payload);
};

export const getAllSessionList = () => {
  return axiosInstance.get("session/get-all");
};

export const updateSessionStatus = (sessionId, payload) => {
  return axiosInstance.patch(`session/update/${sessionId}`, payload);
};
