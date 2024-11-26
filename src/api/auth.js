import axios from "axios";

const authApi = axios.create({
  baseURL: "https://moneyfulpublicpolicy.co.kr"
})

export const register = async (userData) => {
  const response = await authApi.post("/register", userData);
  return response.data;
};

export const login = async (userData) => {
  const response = await authApi.post("/login", userData);
  console.log("response", response);
  return response.data;
};

export const getUserProfile = async (token) => {
  const response = await authApi.get("/user", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const updateProfile = async (formData) => {
  const token = localStorage.getItem("accessToken");
  const response = await authApi.patch("/profile", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};
