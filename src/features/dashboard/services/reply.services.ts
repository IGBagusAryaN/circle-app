import axios from "axios";
import { apiURL } from "utils/baseurl";
import Cookies from "js-cookie";

export const createReply = async (threadId: number, data: FormData) => {
  const token = Cookies.get("token");
  if (!token) {
    console.error("Authentication token is missing. User may not be authenticated.");
    throw new Error("User is not authenticated.");
  }

  console.log("Sending request with token:", token);

  try {
    const response = await axios.post(`${apiURL}reply/${threadId}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    // Logging response for debugging
    console.log("Reply creation response:", response.data);

    if (response.data && response.data.reply) {
      return response.data.reply;
    } else {
      console.error("API response is missing 'reply' field:", response.data);
      throw new Error("Invalid API response structure.");
    }
  } catch (error: any) {
    if (error.response) {
      // Server responded with a status code out of the range of 2xx
      console.error("Server error response:", error.response.data);
      throw new Error(
        `Failed to create reply. Server responded with status: ${error.response.status} - ${error.response.data.message || "Unknown error"}`
      );
    } else if (error.request) {
      // Request was made but no response received
      console.error("No response received:", error.request);
      throw new Error("Failed to create reply. No response from the server.");
    } else {
      // Something else happened
      console.error("Error creating reply:", error.message);
      throw new Error(`Failed to create reply. Error: ${error.message}`);
    }
  }
};


export const getReplies = async (threadId: number) => {
  try {
    console.log("Fetching replies for threadId:", threadId);

    if (!threadId || isNaN(threadId)) {
      throw new Error("Invalid thread ID provided");
    }

    const token = Cookies.get("token");
    if (!token) {
      throw new Error("User is not authenticated. Please log in.");
    }

    console.log("Token:", token);
    const response = await axios.get(`${apiURL}reply/${threadId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("API Response:", response.data);
    return response.data;

  } catch (error: any) {
    console.error("Error fetching replies:", error?.response?.data || error.message);
    throw new Error(error?.response?.data?.message || "Failed to fetch replies");
  }
};


export const getReplyCountApi = async (threadId: number) => {
  const response = await axios.get(`${apiURL}reply/count/${threadId}`);
  return response.data;
};
