import axios from "axios";

const jsonApi = axios.create({
  baseURL: "http://localhost:5000",
});

const getAuthHeaders = () => ({
  Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
});

export const getTestResults = async () => {
  try {
    const response = await jsonApi.get("/testResults", {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error("error =>", error);
    throw error;
  }
};

export const createTestResult = async (resultData) => {
  try {
    const response = await jsonApi.post("/testResults", resultData, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error("error =>", error);
    throw error;
  }
};

export const deleteTestResult = async (id) => {
  try {
    const response = await jsonApi.delete(`/testResults/${id}`, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error("error =>", error);
    throw error;
  }
};

export const updateTestResultVisibility = async (id, visibility) => {
  try {
    const response = await jsonApi.patch(
      `/testResults/${id}`,
      { visibility },
      {
        headers: getAuthHeaders(),
      }
    );
    return response.data;
  } catch (error) {
    console.error("error =>", error);
    throw error;
  }
};
