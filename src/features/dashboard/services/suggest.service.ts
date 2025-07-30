import { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { apiURL } from 'utils/baseurl';

interface UserTypesSuggest {
  id: number;
  username: string;
  profileImage:string;
  fullname:string;
}


const useSuggestedUsers = () => {
  const [suggestedUsers, setSuggestedUsers] = useState<UserTypesSuggest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchSuggestedUsers = async () => {
      try {
        const token = Cookies.get('token');
        if (!token) throw new Error('Token not found');
  
        const response = await axios.get(`${apiURL}suggest`, {
          headers: { Authorization: `Bearer ${token}` },
        });
  
        // console.log('Suggested Users Response:', response.data);
  
        if (Array.isArray(response.data)) {
          setSuggestedUsers(response.data);
        } else {
          console.error('Unexpected response format:', response.data);
        }
      } catch (error) {
        console.error('Error fetching suggested users:', error);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchSuggestedUsers();
  }, []);
  
  return { suggestedUsers, isLoading };
};

export default useSuggestedUsers;

export const getRepliesCountByThreadApi = async (threadId: number) => {
  const response = await axios.get(`${apiURL}/reply/count`, {
    params: { threadId }, // 
  });
  return response.data;
};

