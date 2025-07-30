import axios, { AxiosResponse } from 'axios';
import { apiURL } from 'utils/baseurl';
import Cookies from 'js-cookie';

export const getAllThreads = async (token: string) => {
  try {
    const res: AxiosResponse = await axios.get(apiURL + 'thread', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // console.log('Response Data:', res.data);
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

export const getThreadById = async (token: string, threadId: number) => {
  try {
    const response: AxiosResponse = await axios.get(
      `${apiURL}thread/${threadId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // console.log('Thread Detail Response:', response.data);
    return response.data.thread;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios Error:', error.response?.data || error.message);
      throw new Error(error.response?.data?.message || 'Something went wrong');
    }
    console.error('Unexpected Error:', error);
    throw error;
  }
};
const token = Cookies.get('token');
export const createThread = async (data: FormData) => {
  if (!token) {
    throw new Error('User is not authenticated.');
  }

  try {
    const response = await axios.post(`${apiURL}thread`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    });

    response.data.thread;
  } catch (error: any) {
    if (error.response) {
      throw new Error(
        `Failed to create reply. Server responded with status: ${error.response.status} - ${error.response.data.message || 'Unknown error'}`
      );
    } else if (error.request) {
      throw new Error('Failed to create reply. No response from the server.');
    } else {
      throw new Error(`Failed to create reply. Error: ${error.message}`);
    }
  }
};

export const updateThread = async (threadId: number, data: FormData) => {
  try {
    const response = await axios.put(`${apiURL}thread/${threadId}`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.thread;
  } catch (error) {
    throw error;
  }
};

export const deleteThread = async (threadId: number) => {
  try {
    await axios.delete(`${apiURL}thread/${threadId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    throw error;
  }
};
