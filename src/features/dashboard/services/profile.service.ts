import axios, { AxiosResponse } from 'axios';
import { apiURL } from 'utils/baseurl';
import Cookies from 'js-cookie';

export const getAllProfile = async (token: string) => {
  try {
    const res: AxiosResponse = await axios.get(apiURL + 'profile', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios Error:', error.response?.data || error.message);
      throw new Error(error.response?.data?.message || 'Something went wrong');
    }
    console.error('Unexpected Error:', error);
    throw error;
  }
};

export const updateProfile = async (data: FormData) => {
  try {
    const token = Cookies.get('token');
    if (!token) {
      throw new Error('Token not found');
    }
    const res: AxiosResponse = await axios.put(apiURL + 'profile', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    });

    return res;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios Error:', error.response?.data || error.message);
      throw new Error(error.response?.data?.message || 'Something went wrong');
    }
    console.error('Unexpected Error:', error);
    throw error;
  }
};
