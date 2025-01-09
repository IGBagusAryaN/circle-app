import { Box, Image, Text, Spinner, Button, Input, MenuRoot, MenuTrigger, MenuContent, MenuItem} from '@chakra-ui/react';
import ButtonPrimary from 'components/button/Button';
import LikeButton from 'components/button/LikeAndReplyButton';
import PopoverCreatePost from 'components/button/PopOverCreatePost';
import FileAddIcon from 'components/icons/FileAddIcon';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useProfileStore } from 'store/use.profile.store';
import useThreadStore from 'store/use.thread.store';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import Swal from 'sweetalert2';
import { deleteThread, updateThread } from 'features/dashboard/services/thread.service';


dayjs.extend(relativeTime);

dayjs.locale('en', {
  relativeTime: {
    future: 'in %s',
    past: '%s ago',
    s: 'A few seconds',
    m: 'A minute',
    mm: '%d minutes',
    h: 'An hour',
    hh: '%d hours',
    d: '1 day',
    dd: '%d days',
    M: 'A month',
    MM: '%d months',
    y: 'A year',
    yy: '%d years',
  },
});

function HomeMiddleBar() {
  const { fetchThreads } = useThreadStore();
  const { profile, retrieveUserProfile } = useProfileStore();
  const [editingThreadId, setEditingThreadId] = useState<number | null>(null);
  const [newContent, setNewContent] = useState('');
  const [newImage, setNewImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null); // Untuk preview gambar
  const threads = useThreadStore((state) => state.threads);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    fetchThreads();
    retrieveUserProfile();
  }, [fetchThreads, retrieveUserProfile]);

  const handleImagePreview = (file: File | null) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };
  
  const handleEdit = async (threadId: number) => {
    setLoading(true); 
    try {
      const formData = new FormData();
      formData.append('content', newContent);
      if (newImage) {
        formData.append('image', newImage);
      }
  
      const updatedThread = await updateThread(threadId, formData);
      useThreadStore.getState().updateThread(updatedThread);
  
      setEditingThreadId(null);
      setNewContent('');
      setNewImage(null);
      setImagePreview(null);
  
      Swal.fire({
        title: 'Success!',
        text: 'Thread updated successfully.',
        icon: 'success',
        confirmButtonText: 'OK',
        confirmButtonColor: '#04A51E',
        background: '#1D1D1D',
        color: '#fff',
        allowOutsideClick: false,
      });
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: 'Failed to update the thread. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK',
        confirmButtonColor: '#E53E3E',
        background: '#1D1D1D',
        color: '#fff',
      });
    } finally {
      setLoading(false); // Akhiri spinner
    }
  };
  
  const handleDelete = async (threadId: number) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This thread will be permanently deleted.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#e53e3e',
      cancelButtonColor: '#4A5568', 
      confirmButtonText: 'Yes, delete it!',
      background: '#1D1D1D',
      color: '#fff',
      customClass: {
        popup: 'dark-popup',
        confirmButton: 'custom-confirm',
        cancelButton: 'custom-cancel',
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteThread(threadId);
  
          fetchThreads();
  
          Swal.fire({
            title: 'Deleted!',
            text: 'Your thread has been deleted.',
            icon: 'success',
            background: '#1D1D1D',
            color: '#fff',
            confirmButtonColor: '#4A5568',
          });
        } catch (error) {
          console.error('Error deleting thread:', error);
  
          Swal.fire({
            title: 'Error!',
            text: 'Failed to delete the thread. Please try again.',
            icon: 'error',
            background: '#1D1D1D',
            color: '#fff',
            confirmButtonColor: '#4A5568',
          });
        }
      }
    });
  };
  
  
  return (
    <div>
      <Box borderBottom="1px solid" borderColor="gray.400">
        <Box px="20px">
          <Text fontSize="18px" fontWeight="semibold">Home</Text>
          <Box py="20px" display="flex" alignItems="center" gap="4">
            {profile?.profile?.[0]?.profileImage ? (
              <Image
                src={profile.profile[0].profileImage}
                boxSize="40px"
                borderRadius="full"
                fit="cover"
                alt="User Profile"
              />
            ) : (
              <Image
                src="/default-profile.jpg"
                boxSize="40px"
                borderRadius="full"
                fit="cover"
                alt="Default Profile"
              />
            )}
            <PopoverCreatePost transform="translate(-42%, 0%)"  trigger={
          <Box textAlign="left" width="64%">
          <Button
            textAlign="left"
            background="none"
            borderRadius="20px"
            cursor="text"
            color="gray.300"
            fontWeight="normal"
            fontSize="18px"
            justifyContent="flex-start"
            width={'full'}
            px={0}
          >
            What is happening?
          </Button>
        </Box>
        } />
            <Box display="flex" alignItems="center" gap="3">
              <Box cursor="pointer">
                <FileAddIcon />
              </Box>
              <ButtonPrimary text="Post" />
            </Box>
          </Box>
        </Box>
      </Box>

      {threads.length === 0 ? (
        <Box textAlign="center" py="20px">
          <Spinner size="lg" />
          <Text mt="2">Loading threads...</Text>
        </Box>
      ) : (
        threads.map((thread) => (
          <Box key={thread.id} borderBottom="1px solid" borderColor="#FFF">
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
                <Link to={`/profile/${thread.author?.id}`} className='flex gap-2'>
                    <Text className="font-semibold">
                      {thread.profile?.fullname || 'Unknown User'}
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
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 cursor-pointer">
                      <path fillRule="evenodd" d="M10.5 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm0 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm0 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" clipRule="evenodd" />
                    </svg>

                    </MenuTrigger>
                    <MenuContent style={{ position: 'absolute', top: '120%', left: '-110px', backgroundColor:'#1d1d1d' }}>
                      <MenuItem 
                        value="edit"
                        cursor={'pointer'}
                        onClick={() => {
                          setEditingThreadId(thread.id);
                          setNewContent(thread.content || '');
                        }}>Edit</MenuItem>
                      <MenuItem
                      cursor={'pointer'}
                      colorScheme="red"
                      onClick={() => handleDelete(thread.id)}
                        value="delete"
                        color="fg.error"
                        _hover={{ bg: "bg.error", color: "fg.error" }}
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
                  <Box width={'full'} display={'flex'} justifyContent={'space-between'} mt={2}>
                    
                  <Input
                    value={newContent}
                    onChange={(e) => setNewContent(e.target.value)}
                    placeholder="Edit your thread..."
                    id='content'
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
              <label htmlFor="file-upload" >
                <Button as="span" border="none" background="none" size="lg" p={0}>
                  <FileAddIcon />
                </Button>
              </label>
                      </Box>
                      
                      {/* <Input
                        type="file"
                        mt="2"
                        onChange={(e) => {
                          const file = e.target.files ? e.target.files[0] : null;
                          setNewImage(file);
                          handleImagePreview(file);
                        }}
                      /> */}
                      {imagePreview && (
                        <Image
                          src={imagePreview}
                          alt="Preview Image"
                          className="rounded-lg w-6/12 my-2"
                        />
                      )}
                      <Button
                        mt="2"
                        type="submit" rounded="10px" backgroundColor="#04A51E" color="#FFFF" _hover={{
    backgroundColor: "#006811"}}
                        onClick={() => handleEdit(thread.id)}
                        disabled={loading} // Nonaktifkan tombol saat loading
                      >
                        {loading ? <Spinner size="xs" /> : 'Save'}
                      </Button>
                      <Button
                        mt="2"
                        ml="2"
                        colorScheme={'gray'}
                        type="submit" rounded="10px" 
                        onClick={() => {
                          setEditingThreadId(null);
                          setImagePreview(null); // Reset preview jika batal edit
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
                        <LikeButton threadId={thread.id} />
                     
                      </Box>
                    </Box>
                  )}
                </Box>
              </Box>
            </Box>
          </Box>
        ))
      )}
    </div>
  );
}

export default HomeMiddleBar;
