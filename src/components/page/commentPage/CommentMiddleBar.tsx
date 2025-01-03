import { Box, Flex, Image, Input, Text, Button } from "@chakra-ui/react";
import FileAddIcon from "components/icons/FileAddIcon";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useProfileStore } from "store/use.profile.store";
import LikeButton from "components/button/LikeButton";
import { createReply, getReplies } from "features/dashboard/services/reply.services";
import { getThreadById } from "features/dashboard/services/thread.service";
import Swal from "sweetalert2";

export interface Author {
  username: string;
  profile: {
    fullname?: string;
    bio?: string;
    username?: string;
    bannerImage?: string;
    profileImage?: string;
  }[];
}

export interface Reply {
  id: number;
  content: string;
  createdAt: string;
  author: Author;
}

function CommentMiddleBar() {
  const { id } = useParams<{ id: string }>();
  const { profile, retrieveUserProfile } = useProfileStore();
  const [thread, setThread] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [replies, setReplies] = useState<{ [threadId: number]: Reply[] }>({});
  const [newReply, setNewReply] = useState<string>("");

  // Fetch thread by ID
  useEffect(() => {
    const fetchThread = async () => {
      try {
        const token = Cookies.get("token");
        if (!token) {
          throw new Error("Token tidak tersedia. User mungkin belum login.");
        }

        if (!id || isNaN(Number(id))) {
          throw new Error("Invalid Thread ID");
        }

        setIsLoading(true);
        const data = await getThreadById(token, Number(id));
        console.log("Fetched Thread:", data);
        setThread(data);
      } catch (error: any) {
        console.error("Error fetching thread:", error.message);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Gagal memuat data thread.",
        });
      } finally {
        setIsLoading(false);
      }
    };

    if (id) fetchThread();
  }, [id]);

  // Fetch replies for the specific thread
  useEffect(() => {
    const fetchReplies = async () => {
      try {
        if (!id || isNaN(Number(id))) {
          throw new Error("Invalid Thread ID");
        }

        const data = await getReplies(Number(id));
        console.log("Fetched Replies:", data);

        setReplies((prevReplies) => ({
          ...prevReplies,
          [Number(id)]: data,
        }));
      } catch (error: any) {
        console.error("Error fetching replies:", error.message);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Gagal memuat data replies.",
        });
      }
    };

    if (id) fetchReplies();
  }, [id]);

  const handleReplySubmit = async () => {
    try {
      if (!thread?.id) {
        throw new Error("Thread ID tidak ditemukan.");
      }

      if (!newReply.trim()) {
        Swal.fire({
          icon: "warning",
          title: "Peringatan!",
          text: "Konten reply tidak boleh kosong.",
        });
        return;
      }

      const formData = new FormData();
      formData.append("content", newReply);

      const reply = await createReply(thread.id, formData);
      console.log("Reply successfully created:", reply);

      setReplies((prevReplies) => ({
        ...prevReplies,
        [thread.id]: [reply, ...(prevReplies[thread.id] || [])],
      }));

      setNewReply(""); // Reset input form
      Swal.fire({
        icon: "success",
        title: "Berhasil!",
        text: "Reply berhasil diposting.",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error: any) {
      console.error("Error creating reply:", error.message);
      Swal.fire({
        icon: "error",
        title: "Gagal!",
        text: "Terjadi kesalahan saat memposting reply!",
      });
    }
  };

  useEffect(() => {
    if (!profile) retrieveUserProfile();
  }, [profile, retrieveUserProfile]);

  if (isLoading) return <Text>Loading...</Text>;
  if (!thread) return <Text>Thread not found</Text>;

  return (
    <div>
      <Box borderBottom="1px solid" borderColor="gray.400">
        <Box px="20px">
          <Flex gap="3" align="center">
            <Link to="/">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
              </svg>
            </Link>
            <Text fontSize="18px" fontWeight="semibold">Comments</Text>
          </Flex>
          <Flex py="20px">
            <Image
              src={thread.profile?.profileImage || "https://via.placeholder.com/40"}
              boxSize="40px"
              borderRadius="full"
              fit="cover"
              alt={thread.author?.username || "User"}
            />
            <Box ml="2">
              <Text textAlign="left" fontSize="14px" fontWeight="semibold">{thread.profile?.fullname || "Anonymous"}</Text>
              <Text textAlign="left" fontSize="12px" color="gray.400">@{thread.author?.username || "unknown"}</Text>
              <Box>
                <Text fontSize="14px" marginTop="2">{thread.content}</Text>
                {thread.image && <img src={thread.image} alt="Thread" className="rounded-lg w-6/12 my-2" />}
                <Text fontSize="12px" marginTop="2" color="gray.400">{new Date(thread.createdAt).toLocaleString()}</Text>
              </Box>
              <Box marginTop="2" display="flex" alignItems="center" gap="3">
                <LikeButton threadId={thread.id} />
              </Box>
            </Box>
          </Flex>
        </Box>
      </Box>
      <Box p="20px" display="flex" alignItems="center" borderBottom="1px solid" borderColor="gray.400">
        <Image
          src={profile?.profile?.[0]?.profileImage || "https://via.placeholder.com/40"}
          boxSize="40px"
          borderRadius="full"
          fit="cover"
          alt="User"
        />
        <Input
          placeholder="What is happening?"
          outline="none"
          border="none"
          fontSize="18px"
          marginLeft="10px"
          width="67%"
          p="0"
          value={newReply}
          onChange={(e) => setNewReply(e.target.value)}
        />
        <Box display="flex" alignItems="center" gap="2">
          <Box>
            <FileAddIcon />
          </Box>
          <Button colorScheme="blue" onClick={handleReplySubmit}>
            Reply
          </Button>
        </Box>
      </Box>
      <Box>
        {(replies[thread?.id] || []).map((reply) => (
          <Box key={reply.id} p="20px" borderBottom="1px solid" borderColor="gray.400">
            <Flex gap="3">
              <Image
                src={reply.author.profile?.[0]?.profileImage || "https://via.placeholder.com/40"}
                boxSize="40px"
                borderRadius="full"
                fit="cover"
                alt={reply.author.username || "User"}
              />
              <Box>
                <Text fontSize="14px" fontWeight="semibold">
                  {reply.author.profile?.[0]?.fullname || "Anonymous"}
                </Text>
                <Text fontSize="12px" color="gray.400">@{reply.author?.username || "unknown"}</Text>
                <Text fontSize="14px" mt="2">{reply.content}</Text>
                <Text fontSize="12px" mt="2" color="gray.400">
                  {new Date(reply.createdAt).toLocaleString()}
                </Text>
              </Box>
            </Flex>
          </Box>
        ))}
      </Box>
    </div>
  );
}

export default CommentMiddleBar;
