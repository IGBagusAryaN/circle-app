import axios, { AxiosResponse } from 'axios';
import { apiURL } from 'utils/baseurl';
import {
  LoginFormProps,
  ProfileFormProps,
  RegisterFormProps,
} from '../types/Auth.types';
import Cookies from 'js-cookie';

export const fetchLogin = async (data: LoginFormProps) => {
  try {
    const res: AxiosResponse = await axios.post(apiURL + 'auth/login', data, {
      headers: {
        'Content-Type': 'application/json',
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

export const fetchRegister = async (data: RegisterFormProps) => {
  try {
    const res: AxiosResponse = await axios.post(
      apiURL + 'auth/register',
      data,
      {
        headers: {
          'Content-Type': 'application/json',
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

export const fetchProfile = async (data: ProfileFormProps) => {
  try {
    const userId = Cookies.get('userId');

    if (!userId) {
      throw new Error('User ID not found in localStorage');
    }

    data.userId = userId;

    const res: AxiosResponse = await axios.post(apiURL + 'profile', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
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
