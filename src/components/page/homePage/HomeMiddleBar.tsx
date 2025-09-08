import { Box, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useProfileStore } from 'store/use.profile.store';
import useThreadStore from 'store/use.thread.store';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import Swal from 'sweetalert2';
import PostInputBox from './componentMiddleBar/ThreadInput';
import ThreadItem from './componentMiddleBar/ThreadList';
import axios from 'axios';
import { apiURL } from 'utils/baseurl';
import { ThreadTypes } from 'types/threads.types';
import Cookies from 'js-cookie';
import { LottieAnimation } from 'components/lottie';
import { NotfoundAnimation } from 'components/notfound';

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
  const {
    threads,
    fetchThreads,
    updateThreadContent,
    deleteThreadById,
    loading,
  } = useThreadStore();
  const { profile, retrieveUserProfile } = useProfileStore();

  const { addThread } = useThreadStore();
  const [editingThreadId, setEditingThreadId] = useState<number | null>(null);
  const [newContent, setNewContent] = useState('');
  const [newImage, setNewImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [content, setContent] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  useEffect(() => {
    fetchThreads();
    retrieveUserProfile();
  }, []);

  const handleImagePreview = (file: File | null) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handlePost = async () => {
    if (!content.trim()) {
      Swal.fire({
        title: 'Error',
        text: 'Konten tidak boleh kosong.',
        icon: 'error',
        confirmButtonColor: '#E53E3E',
        background: '#1D1D1D',
        color: '#fff',
      });
      return;
    }

    setIsLoading(true);

    const formData = new FormData();
    formData.append('content', content);
    if (file) {
      formData.append('image', file);
    }

    const token = Cookies.get('token');
    if (!token) {
      Swal.fire({
        title: 'Error',
        text: 'Pengguna tidak terautentikasi.',
        icon: 'error',
        confirmButtonColor: '#E53E3E',
        background: '#1D1D1D',
        color: '#fff',
      });
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post(`${apiURL}thread`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      const threadData = response.data.thread;

      const newThread: ThreadTypes = {
        id: threadData.id,
        content: threadData.content,
        createdAt: new Date(threadData.createdAt),
        updateAt: new Date(threadData.updatedAt),
        userId: threadData.userId || 0,
        authorId: threadData.authorId || 0,
        image: threadData.image || '',
        profile: threadData.profile,
        author: threadData.author,
      };

      if (!threadData.profile || typeof threadData.profile !== 'object') {
        console.error('Data profile tidak valid:', threadData.profile);
      }

      if (!threadData.author || typeof threadData.author !== 'object') {
        console.error('Data author tidak valid:', threadData.author);
      }

      addThread(newThread); // Tambahkan thread baru ke state

      setContent('');
      setFile(null);
      setPreviewImage(null);

      Swal.fire({
        title: 'Success!',
        text: 'Thread Post Successfully.',
        icon: 'success',
        confirmButtonColor: '#04A51E',
        background: '#1D1D1D',
        color: '#fff',
        allowOutsideClick: false,
      });
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: 'Gagal membuat thread.',
        icon: 'error',
        confirmButtonColor: '#E53E3E',
        background: '#1D1D1D',
        color: '#fff',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = async (threadId: number) => {
    if (!newContent.trim()) {
      Swal.fire({
        title: 'Error',
        text: 'Konten tidak boleh kosong.',
        icon: 'error',
        confirmButtonColor: '#E53E3E',
        background: '#1D1D1D',
        color: '#fff',
      });
      return;
    }

    try {
      setIsLoading(true);
      await updateThreadContent(threadId, newContent, newImage);

      setEditingThreadId(null);
      setNewContent('');
      setNewImage(null);
      setImagePreview(null);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (threadId: number) => {
    await deleteThreadById(threadId);
  };
  if (threads.length === 0) {
    return (
      <Box>
        <Box borderBottom="1px solid" borderColor="gray.700">
          <Box px="20px">
            <PostInputBox
              content={content}
              setContent={setContent}
              handlePost={handlePost}
              isLoading={isLoading}
              handleFileChange={(e) => {
                const file = e.target.files?.[0] || null;
                setFile(file);

                handleFileChange(e);
              }}
              previewImage={previewImage}
              profileImage={profile?.profile?.[0]?.profileImage || null}
            />
          </Box>
        </Box>
        <Box
          display={'flex'}
          flexDirection={'column'}
          justifyContent={'center'}
          alignItems={'center'}
          mt={40}
        >
          <NotfoundAnimation />
          <Text>No posts yet, follow people first!!!</Text>
        </Box>
      </Box>
    );
  }

  return (
    <div className="pb-[77px] md:pb-0">
      <Box borderBottom="1px solid" borderColor="gray.700">
        <Box px="20px">
          <PostInputBox
            content={content}
            setContent={setContent}
            handlePost={handlePost}
            isLoading={isLoading}
            handleFileChange={(e) => {
              const file = e.target.files?.[0] || null;
              setFile(file);

              handleFileChange(e);
            }}
            previewImage={previewImage}
            profileImage={profile?.profile?.[0]?.profileImage || null}
          />
        </Box>
      </Box>

      {loading ? (
        <Box
          height="80vh"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          textAlign="center"
          py="20px"
        >
          <LottieAnimation />
        </Box>
      ) : (
        threads.map((thread) => (
          <ThreadItem
            key={thread.id}
            thread={thread}
            profile={profile}
            editingThreadId={editingThreadId}
            newContent={newContent}
            imagePreview={imagePreview}
            loading={loading}
            setEditingThreadId={setEditingThreadId}
            setNewContent={setNewContent}
            setNewImage={setNewImage}
            setImagePreview={setImagePreview}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            handleImagePreview={handleImagePreview}
          />
        ))
      )}
    </div>
  );
}

export default HomeMiddleBar;
