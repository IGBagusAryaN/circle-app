import { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { apiURL } from 'utils/baseurl';
import { Spinner } from '@chakra-ui/react';

interface FollowButtonProps {
  userId: number;
}

const FollowButton = ({ userId }: FollowButtonProps) => {
  const [isFollowing, setIsFollowing] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);
  const token = Cookies.get('token');

  useEffect(() => {
    const checkFollowingStatus = async () => {
      try {
        if (!token) {
          console.error('Token not found');
          return;
        }

        const response = await axios.get(`${apiURL}follow/status/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setIsFollowing(response.data.isFollowing);
      } catch (error) {
        console.error('Error fetching follow status:', error);
      }
    };

    checkFollowingStatus();
  }, [userId, token]);

  const handleFollowToggle = async () => {
    if (!token) {
      console.error('Token not found');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        `${apiURL}follow/${userId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        setIsFollowing((prev) => !prev);
      }
    } catch (error) {
      console.error('Error toggling follow:', error);
    }
    setLoading(false);
  };

  return (
    <button
      onClick={handleFollowToggle}
      className={`border px-3 py-1 cursor-pointer rounded-full text-sm font-semibold transition duration-200 ${
        isFollowing
          ? 'bg-white text-black border-white'
          : 'bg-none text-white border-white hover:bg-white hover:text-black'
      }`}
      disabled={loading}
    >
      {loading ? <Spinner/> : isFollowing ? 'Unfollow' : 'Follow'}
    </button>
  );
};

export default FollowButton;