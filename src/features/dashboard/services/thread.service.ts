import axios, { AxiosResponse } from 'axios';
import { apiURL } from 'utils/baseurl';

export const getAllThreads = async (token: string) => {
  try {
    const res: AxiosResponse = await axios.get(apiURL + 'thread', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log('Response Data:', res.data);
    return res.data.threads;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios Error:', error.response?.data || error.message);
      throw new Error(error.response?.data?.message || 'Something went wrong');
    }
    console.error('Unexpected Error:', error);
    throw error;
  }
};

export const getUserThread = async (token: string, userId: number) => {
  try {
    const response = await axios.get(apiURL + 'thread', {
      headers: { Authorization: `Bearer ${token}` },
      params: { filterByUser: true, userId },
    });
    return response.data.threads;
  } catch (error) {
    console.error('Error in getUserThread:', error);
    throw error;
  }
};
