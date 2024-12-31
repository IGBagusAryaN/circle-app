// services/reply.service.ts
import axios from "axios";
import { apiURL } from "utils/baseurl";

export const createReply = async (threadId: number, content: string, token: string) => {
  const response = await axios.post(
    `${apiURL}reply/${threadId}`,
    { content },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const getReplies = async (threadId: number, token: string) => {
  const response = await axios.get(`${apiURL}reply/${threadId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
