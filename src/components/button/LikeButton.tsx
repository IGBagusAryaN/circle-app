import { useState, useEffect, useCallback } from 'react';
import { Box, Button, Spinner } from '@chakra-ui/react';
import HeartIcon from 'components/icons/HeartIcon';
import { LikeButtonProps } from 'types/like.types';
import { UserTypes } from 'types/users.types';
import {
  getLikes,
  toggleLikeApi,
} from 'features/dashboard/services/like.services';

import { useAuthStore } from 'store/use.auth.store';
import { Link } from 'react-router-dom';
import CommentIcon from 'components/icons/CommentIcon';

function LikeButton({ threadId }: LikeButtonProps) {
  const [likes, setLikes] = useState<number>(0);
  const [likedUsers, setLikedUsers] = useState<UserTypes[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [, setIsLikedByUser] = useState<boolean>(false);

  const user = useAuthStore((state) => state.user);

  const fetchLikes = useCallback(async () => {
    try {
      setIsLoading(true);

      const response = await getLikes(threadId);
      const { totalLikes, likedUsers } = response.data;

      setLikes(totalLikes || 0);
      setLikedUsers(Array.isArray(likedUsers) ? likedUsers : []);

      if (user && user.id) {
        setIsLikedByUser(
          likedUsers.some((likedUser: UserTypes) => likedUser.id === user.id)
        );
      }
    } catch (error) {
      console.error('Error fetching likes:', error);
    } finally {
      setIsLoading(false);
    }
  }, [threadId, user]);

  const toggleLike = useCallback(async () => {
    try {
      setIsLoading(true);

      const response = await toggleLikeApi(threadId);
      const { totalLikes, likedUsers } = response.data;

      setLikes(totalLikes);
      setLikedUsers(likedUsers);

      if (user && user.id) {
        setIsLikedByUser(
          likedUsers.some((likedUser: UserTypes) => likedUser.id === user.id)
        );
      }
    } catch (error) {
      console.error('Error toggling like:', error);
    } finally {
      setIsLoading(false);
    }
  }, [threadId, user]);

  useEffect(() => {
    fetchLikes();
  }, [fetchLikes]);

  return (
    <Box>
      {likedUsers.length > 0 && (
        <Box className="text-[10px] text-gray-400 mt-1 w-32 truncate">
          <span>Liked by: </span>
          {likedUsers.map((user, index) => (
            <span key={user.id}>
              {user.username}
              {index < likedUsers.length - 1 && ', '}
            </span>
          ))}
        </Box>
      )}
      <Box display={'flex'} gap={4} mt={2}>
        <Button
          background={'none'}
          p={0}
          onClick={toggleLike}
          aria-label="Like Button"
          height={3}
          mt={1}
        >
          <HeartIcon />
          {isLoading ? (
            <Spinner size="sm" color={'white'} />
          ) : (
            <span className="text-[12px] text-white">{likes} Likes</span>
          )}
        </Button>
        <Link to="/" className="flex items-center gap-1 hover:text-[#817b7b]">
          <CommentIcon />
          <span className="text-[12px] ">10 Replies</span>
        </Link>
      </Box>
    </Box>
  );
}

export default LikeButton;
