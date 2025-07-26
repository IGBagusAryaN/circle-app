import { Box, Text, Spinner } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useProfileStore } from 'store/use.profile.store';
import useThreadStore from 'store/use.thread.store';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import Swal from 'sweetalert2';
import PostInputBox from './componentMiddleBar/ThreadInput';
import ThreadItem from './componentMiddleBar/ThreadList';

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
    postThread,
    updateThreadContent,
    deleteThreadById,
    loading,
  } = useThreadStore();
  const { profile, retrieveUserProfile } = useProfileStore();

  const [editingThreadId, setEditingThreadId] = useState<number | null>(null);
  const [newContent, setNewContent] = useState('');
  const [newImage, setNewImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [content, setContent] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

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
    try {
      await postThread(content, file); 
      setContent('');
      setFile(null);
      setImagePreview(null);
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: 'Gagal memposting thread.',
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

    await updateThreadContent(threadId, newContent, newImage);
    setEditingThreadId(null);
    setNewContent('');
    setNewImage(null);
    setImagePreview(null);
  };

  const handleDelete = async (threadId: number) => {
    await deleteThreadById(threadId);
  };

  return (
    <div>
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
              handleImagePreview(file);
            }}
            previewImage={imagePreview}
            profileImage={profile?.profile?.[0]?.profileImage || null}
          />
        </Box>
      </Box>

      {loading ? (
        <Box height="80vh" display="flex" flexDirection="column" justifyContent="center" textAlign="center" py="20px">
          <Box>

          <Text >Loading threads...</Text>
          <Spinner size="lg" mt="2" />
          </Box>
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
