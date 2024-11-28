import axios from "axios";

const jsonApi = axios.create({
  baseURL: "https://adventurous-perfect-breakfast.glitch.me",
  headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
});

// const getAuthHeaders = () => ({
//   Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
// });

export const getTestResults = async () => {
  try {
    const response = await jsonApi.get("/testResults");
    return response.data;
  } catch (error) {
    console.error("error =>", error);
    throw error;
  }
};

export const createTestResult = async (resultData) => {
  try {
    const response = await jsonApi.post("/testResults", resultData);
    return response.data;
  } catch (error) {
    console.error("error =>", error);
    throw error;
  }
};

export const deleteTestResult = async (id) => {
  try {
    const response = await jsonApi.delete(`/testResults/${id}`);
    return response.data;
  } catch (error) {
    console.error("error =>", error);
    throw error;
  }
};

export const updateTestResultVisibility = async (id, visibility) => {
  try {
    const response = await jsonApi.patch(`/testResults/${id}`, { visibility });
    return response.data;
  } catch (error) {
    console.error("error =>", error);
    throw error;
  }
};
