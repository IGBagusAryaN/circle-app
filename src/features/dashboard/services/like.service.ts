import axios, { AxiosResponse } from 'axios';
import { apiURL } from 'utils/baseurl';
import Cookies from 'js-cookie';

export const getLikes = async (threadId: number) => {
  const token = Cookies.get('token');
  try {
    const res: AxiosResponse = await axios.get(
      apiURL + 'like/' + `${threadId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
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
export const toggleLikeApi = async (threadId: number) => {
  const token = Cookies.get('token');

  try {
    const res: AxiosResponse = await axios.post(
      apiURL + 'like/' + `${threadId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
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
