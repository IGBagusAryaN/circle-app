import axios, { AxiosResponse } from 'axios';
import { apiURL } from 'utils/baseurl';

export const getAllUsers = async (token: string) => {
  try {
    const res: AxiosResponse = await axios.get(apiURL + 'users', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios Error:', error.response?.data || error.message);
      throw new Error(error.response?.data?.message || 'Something went wrong');
    }
    console.error('Unexpected Error:', error);
    throw error;
  }
};

// Fungsi untuk mendapatkan pengguna berdasarkan ID
export const getUserById = async (token: string, id: number) => {
  try {
    const res: AxiosResponse = await axios.get(`${apiURL}users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data; // Mengembalikan data pengguna
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios Error:', error.response?.data || error.message);
      throw new Error(error.response?.data?.message || 'Something went wrong');
    }
    console.error('Unexpected Error:', error);
    throw error;
  }
};
