import { useState, useEffect, useCallback } from 'react';
import { Box, Button, Spinner } from '@chakra-ui/react';
import HeartIcon from 'components/icons/HeartIcon';
import { LikeAndReplyButtonProps } from 'types/like.types';
import { UserTypes } from 'types/users.types';
import { getLikes, toggleLikeApi } from 'features/dashboard/services/like.services';
import { useAuthStore } from 'store/use.auth.store';
import { Link } from 'react-router-dom';
import CommentIcon from 'components/icons/CommentIcon';
import { getReplies } from 'features/dashboard/services/reply.services';

function LikeAndReplyButton({ threadId, onRepliesCountChange }: LikeAndReplyButtonProps) {
  const [likes, setLikes] = useState<number>(0);
  const [likedUsers, setLikedUsers] = useState<UserTypes[]>([]);
  const [repliesCount, setRepliesCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLikedByUser, setIsLikedByUser] = useState<number>(0); // Gunakan 0/1 untuk status

  const user = useAuthStore((state) => state.user);

  const fetchLikes = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await getLikes(threadId);
      const { totalLikes, likedUsers } = response.data;

      setLikes(totalLikes || 0);
      setLikedUsers(Array.isArray(likedUsers) ? likedUsers : []);

      if (user && user.id) {
        const isLiked = likedUsers.some(
          (likedUser: UserTypes) => likedUser.id === user.id
        );
        setIsLikedByUser(isLiked ? 1 : 0); // Atur 1 jika di-like, 0 jika tidak
      }
    } catch (error) {
      console.error('Error fetching likes:', error);
    } finally {
      setIsLoading(false);
    }
  }, [threadId, user]);

  const fetchRepliesCount = useCallback(async () => {
    try {
      const response = await getReplies(threadId);
      const count = response?.length || 0;
      setRepliesCount(count);

      if (onRepliesCountChange) {
        onRepliesCountChange(count);
      }
    } catch (error) {
      console.error('Error fetching replies count:', error);
    }
  }, [threadId, onRepliesCountChange]);

  const toggleLike = useCallback(async () => {
    try {
      setIsLoading(true);

      const response = await toggleLikeApi(threadId);
      const { totalLikes, likedUsers } = response.data;

      setLikes(totalLikes);
      setLikedUsers(likedUsers);

      if (user && user.id) {
        const isLiked = likedUsers.some(
          (likedUser: UserTypes) => likedUser.id === user.id
        );
        setIsLikedByUser(isLiked ? 1 : 0); // Perbarui 1/0 sesuai status
      }
    } catch (error) {
      console.error('Error toggling like:', error);
    } finally {
      setIsLoading(false);
    }
  }, [threadId, user]);

  useEffect(() => {
    fetchLikes();
    fetchRepliesCount();
  }, [fetchLikes, fetchRepliesCount]);

  return (
    <Box>
      {likedUsers.length > 0 && (
        <Box className="text-[10px] text-gray-400 mt-1 w-46 truncate">
          <span>Liked by: </span>
          {likedUsers.length > 1 ? (
            <>
              <span>{likedUsers[0]?.username}</span>
              <span> and {likedUsers.length - 1} others</span>
            </>
          ) : (
            <span>{likedUsers[0]?.username}</span>
          )}
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
          color={'white'}
        >
          <HeartIcon  />
          {isLoading ? (
            <Spinner size="sm" color={'white'} />
          ) : (
            <span className="text-[12px] text-white">{likes} Likes</span>
          )}
        </Button>
        <Link
          to={`/thread/${threadId}`}
          className="flex items-center gap-1 hover:text-[#817b7b]"
        >
          <CommentIcon />
          <span className="text-[12px] ">{repliesCount} Replies</span>
        </Link>
      </Box>
    </Box>
  );
}

export default LikeAndReplyButton;
