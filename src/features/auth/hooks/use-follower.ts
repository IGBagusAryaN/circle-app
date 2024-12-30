import axios from 'axios';
import { useEffect, useState } from 'react';
import { apiURL } from 'utils/baseurl';

export function useFollowers(userId: number) {
  const [followers, setFollowers] = useState([]);

  useEffect(() => {
    const fetchFollowers = async () => {
      try {
        const response = await axios.get(`${apiURL}follow/${userId}/followers`);
        setFollowers(response.data);
      } catch (error) {
        console.error('Error fetching followers:', error);
      }
    };

    if (userId) {
      fetchFollowers();
    }
  }, [userId]);

  return followers;
}
