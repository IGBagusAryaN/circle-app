import axios from 'axios';
import { apiURL } from 'utils/baseurl';

export async function getFollowers(userId: number) {
  try {
    const response = await axios.get(`${apiURL}follow/follower/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching followers:', error);
    throw error;
  }
}

export async function getFollowing(userId: number) {
  try {
    const response = await axios.get(`${apiURL}follow/following/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching following:', error);
    throw error;
  }
}
