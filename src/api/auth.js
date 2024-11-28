import axios from "axios";

const authApi = axios.create({
  baseURL: "https://moneyfulpublicpolicy.co.kr",
});

export const register = async (userData) => {
  try {
    const response = await authApi.post("/register", userData);
    return response.data;
  } catch (error) {
    console.error("error =>", error);
    throw error;
  }
};

export const login = async (userData) => {
  try {
    const response = await authApi.post("/login", userData);
    return response.data;
  } catch (error) {
    console.error("error =>", error);
    throw error;
  }
};

export const getUserProfile = async (token) => {
  try {
    const response = await authApi.get("/user", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("error =>", error);
    throw error;
  }
};

export const updateProfile = async (formData) => {
  const token = localStorage.getItem("accessToken");
  try {
    const response = await authApi.patch("/profile", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("error =>", error);
    throw error;
  }
};
