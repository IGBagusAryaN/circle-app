import React from 'react';
import { Box, Button, Image, Input, MenuContent, MenuItem, MenuRoot, MenuTrigger, Spinner, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import FileAddIcon from 'components/icons/FileAddIcon';
import LikeAndReplyButton from 'components/button/LikeAndReplyButton';

interface ThreadItemProps {
  thread: any;
  profile: any;
  editingThreadId: number | null;
  newContent: string;
  imagePreview: string | null;
  loading: boolean;
  setEditingThreadId: (id: number | null) => void;
  setNewContent: (content: string) => void;
  setNewImage: (file: File | null) => void;
  setImagePreview: (preview: string | null) => void;
  handleEdit: (id: number) => void;
  handleDelete: (id: number) => void;
  handleImagePreview: (file: File | null) => void;
}

const ThreadItem: React.FC<ThreadItemProps> = ({
  thread,
  profile,
  editingThreadId,
  newContent,
  imagePreview,
  loading,
  setEditingThreadId,
  setNewContent,
  setNewImage,
  setImagePreview,
  handleEdit,
  handleDelete,
  handleImagePreview,
}) => {
  return (
    <Box borderBottom="1px solid" borderColor="gray.700">
      <Box p="20px">
        <Box display="flex" alignItems="start">
          <Image
            src={thread.profile?.profileImage || '/default-profile.jpg'}
            boxSize="40px"
            borderRadius="full"
            fit="cover"
            alt="Profile Image"
            mr={3}
          />
          <Box display="flex" flexDirection="column" width={'100vw'}>
            <Box display="flex" justifyContent="space-between">
              <Link to={`/profile/${thread.author?.id}`} className="flex gap-2">
                <Text className="font-semibold">
                  {thread.profile?.fullname || 'No Name'}
                </Text>
                <Text color="gray.400">
                  @{thread.author?.username || 'unknown'}{' '}
                  <span>• {dayjs(thread.createdAt).fromNow()}</span>
                </Text>
              </Link>

              {thread.author?.id === profile?.id && (
                <Box style={{ position: 'relative' }}>
                  <MenuRoot>
                    <MenuTrigger asChild>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="size-6 cursor-pointer"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.5 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm0 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm0 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </MenuTrigger>
                    <MenuContent
                      style={{
                        position: 'absolute',
                        top: '120%',
                        left: '-110px',
                        backgroundColor: '#1d1d1d',
                      }}
                    >
                      <MenuItem
                        value="edit"
                        cursor={'pointer'}
                        onClick={() => {
                          setEditingThreadId(thread.id);
                          setNewContent(thread.content || '');
                        }}
                      >
                        Edit
                      </MenuItem>
                      <MenuItem
                        cursor={'pointer'}
                        colorScheme="red"
                        onClick={() => handleDelete(thread.id)}
                        value="delete"
                        color="fg.error"
                        _hover={{ bg: 'bg.error', color: 'fg.error' }}
                      >
                        Delete...
                      </MenuItem>
                    </MenuContent>
                  </MenuRoot>
                </Box>
              )}
            </Box>

            {editingThreadId === thread.id ? (
              <Box mt="2" width={'95.4vh'}>
                <label htmlFor="content">Content</label>
                <Box
                  width={'full'}
                  display={'flex'}
                  justifyContent={'space-between'}
                  mt={2}
                >
                  <Input
                    value={newContent}
                    onChange={(e) => setNewContent(e.target.value)}
                    placeholder="Edit your thread..."
                    id="content"
                  />
                  <Input
                    type="file"
                    display="none"
                    id="file-upload"
                    onChange={(e) => {
                      const file = e.target.files ? e.target.files[0] : null;
                      setNewImage(file);
                      handleImagePreview(file);
                    }}
                  />
                  <label htmlFor="file-upload">
                    <Button
                      as="span"
                      border="none"
                      background="none"
                      size="lg"
                      p={0}
                    >
                      <FileAddIcon />
                    </Button>
                  </label>
                </Box>

                {imagePreview && (
                  <Image
                    src={imagePreview}
                    alt="Preview Image"
                    className="rounded-lg w-6/12 my-2"
                  />
                )}
                <Button
                  mt="2"
                  type="submit"
                  rounded="10px"
                  backgroundColor="#04A51E"
                  color="#FFFF"
                  _hover={{ backgroundColor: '#006811' }}
                  onClick={() => handleEdit(thread.id)}
                  disabled={loading}
                >
                  {loading ? <Spinner size="xs" /> : 'Save'}
                </Button>
                <Button
                  mt="2"
                  ml="2"
                  colorScheme={'gray'}
                  type="submit"
                  rounded="10px"
                  onClick={() => {
                    setEditingThreadId(null);
                    setImagePreview(null);
                  }}
                >
                  Cancel
                </Button>
              </Box>
            ) : (
              <Box>
                <Link to={`/comment/${thread.id}`}>
                  <Text fontSize="14px" marginTop="2">
                    {thread.content || 'No content available.'}
                  </Text>
                </Link>
                <Link to={`/image/${thread.id}`}>
                  {thread.image && (
                    <Image
                      src={thread.image}
                      alt="Thread Image"
                      className="rounded-lg w-6/12 my-2"
                    />
                  )}
                </Link>
                <Box mt={1} display="flex" alignItems="center" gap="3">
                  <LikeAndReplyButton threadId={thread.id} />
                </Box>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ThreadItem;
