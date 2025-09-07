import axios from 'axios';
import { apiURL } from 'utils/baseurl';
import Cookies from 'js-cookie';

const token = Cookies.get('token')

export async function getFollowers(userId: number) {
  try {
    const res = await axios.get(`${apiURL}follow/follower/${userId}`);
    return res.data;
  } catch (error) {
    console.error('Error fetching followers:', error);
    throw error;
  }
}

export async function getFollowing(userId: number) {
  try {
    const res = await axios.get(`${apiURL}follow/following/${userId}`);
    return res.data;
  } catch (error) {
    console.error('Error fetching following:', error);
    throw error;
  }
}

export async function getFollowStatus(userId: number) {
  try {
    const res = await axios.get(`${apiURL}follow/status/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data
  } catch (error) {
    console.error('Error fetching following:', error);
    throw error;
  }
}

export async function toggleFollow(userId: number) {
  try {
    const res = await axios.post(`${apiURL}follow/${userId}`,{},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data
  } catch (error) {
    console.error('Error fetching following:', error);
    throw error;
  }
}
