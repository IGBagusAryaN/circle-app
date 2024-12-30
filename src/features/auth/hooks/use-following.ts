import { useEffect, useState } from 'react';
import axios from 'axios';
import { apiURL } from 'utils/baseurl';

export function useFollowing(userId: number) {
  const [following, setFollowing] = useState([]);

  useEffect(() => {
    const fetchFollowing = async () => {
      try {
        const response = await axios.get(`${apiURL}follow/${userId}/following`);
        setFollowing(response.data);
      } catch (error) {
        console.error('Error fetching following:', error);
      }
    };

    if (userId) {
      fetchFollowing();
    }
  }, [userId]);

  return following;
}
