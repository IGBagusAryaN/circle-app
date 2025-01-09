import axios from "axios";
import { apiURL } from "utils/baseurl";
import Cookies from "js-cookie";

export const createReply = async (threadId: number, data: FormData) => {
  const token = Cookies.get("token");
  if (!token) {
    throw new Error("User is not authenticated.");
  }

  try {
    const response = await axios.post(`${apiURL}reply/${threadId}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    if (response.data && response.data.reply) {
      return response.data.reply;
    } else {
      console.error("API response is missing 'reply' field:", response.data);
      throw new Error("Invalid API response structure.");
    }
  } catch (error: any) {
    if (error.response) {
      throw new Error(
        `Failed to create reply. Server responded with status: ${error.response.status} - ${error.response.data.message || "Unknown error"}`
      );
    } else if (error.request) {
      throw new Error("Failed to create reply. No response from the server.");
    } else {
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
    throw new Error(error?.response?.data?.message || "Failed to fetch replies");
  }
};

export const updateReply = async (replyId: number, formData: FormData) => {
  const token = Cookies.get("token");
  if (!token) throw new Error("User belum login.");

  const response = await axios.put(`${apiURL}reply/${replyId}`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const deleteReply = async (replyId: number) => {
  const token = Cookies.get("token");
  if (!token) throw new Error("User belum login.");

  const response = await axios.delete(`${apiURL}reply/${replyId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

