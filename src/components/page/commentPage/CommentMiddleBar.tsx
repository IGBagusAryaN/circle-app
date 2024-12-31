import { Box, Flex, Image, Input, Text, Button } from "@chakra-ui/react";
import FileAddIcon from "components/icons/FileAddIcon";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getThreadById } from "features/dashboard/services/thread.service";
import Cookies from "js-cookie";
import { useProfileStore } from "store/use.profile.store";
import LikeButton from "components/button/LikeButton";
import { createReply, getReplies } from "features/dashboard/services/reply.services";


export interface Profile {
    profileImage: string;
    fullname: string;
  }
  
  export interface Author {
    username: string;
  }
  
  export interface Reply {
    id: number;
    content: string;
    createdAt: string;
    profile: Profile;
    author: Author;
  }
  
function CommentMiddleBar() {
  const { id } = useParams<{ id: string }>();
  const { profile, retrieveUserProfile } = useProfileStore();
  const [thread, setThread] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [replies, setReplies] = useState<any[]>([]);
  const [newReply, setNewReply] = useState<string>("");

  // Fetch thread details
  useEffect(() => {
    const fetchThread = async () => {
      try {
        setIsLoading(true);
        const token = Cookies.get("token") as string;
        const data = await getThreadById(token, Number(id));
        setThread(data);
      } catch (error) {
        console.error("Error fetching thread:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) fetchThread();
  }, [id]);

  // Fetch replies
  useEffect(() => {
    const fetchReplies = async () => {
      try {
        const token = Cookies.get("token") as string;
        const data = await getReplies(Number(id), token);
        setReplies(data);
      } catch (error) {
        console.error("Error fetching replies:", error);
      }
    };

    if (id) fetchReplies();
  }, [id]);

  // Handle new reply submission
  const handleReplySubmit = async () => {
    if (!newReply.trim()) return;
    try {
      const token = Cookies.get("token") as string;
      const reply = await createReply(Number(id), newReply, token);
      setReplies((prevReplies) => [...prevReplies, reply]); // Add new reply to list
      setNewReply(""); // Clear input field
    } catch (error) {
      console.error("Error creating reply:", error);
    }
  };

  useEffect(() => {
    if (!profile) {
      retrieveUserProfile();
    }
  }, [profile, retrieveUserProfile]);

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (!thread) {
    return <Text>Thread not found</Text>;
  }

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
                <Text fontSize="14px" marginTop="2">
                  {thread.content}
                </Text>
                {thread.image && <img src={thread.image} alt="Thread" className="rounded-lg w-6/12 my-2" />}
                <Text fontSize="12px" marginTop="2" color="gray.400">
                  {new Date(thread.createdAt).toLocaleString()}
                </Text>
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
      <Box>
  {replies.map((reply) => (
    <Box key={reply.id} p="20px" borderBottom="1px solid" borderColor="gray.400">
      <Flex gap="3">
        {/* Menggunakan profil dari profileStore */}
        <Image
          src={profile?.profile?.[0]?.profileImage || "https://via.placeholder.com/40"}
          boxSize="40px"
          borderRadius="full"
          fit="cover"
          alt={profile?.profile?.[0]?.fullname || "User"}
        />
        <Box>
          <Text fontSize="14px" fontWeight="semibold">
            {profile?.profile?.[0]?.fullname || "Anonymous"}
          </Text>
          <Text fontSize="12px" color="gray.400">
            @{profile?.profile?.[0]?.fullname?.toLowerCase().replace(/\s/g, "") || "unknown"}
          </Text>
          {/* Hanya menampilkan konten dari balasan */}
          <Text fontSize="14px" mt="2">{reply.content}</Text>
          <Text fontSize="12px" mt="2" color="gray.400">{new Date(reply.createdAt).toLocaleString()}</Text>
        </Box>
      </Flex>
    </Box>
  ))}
</Box>

      </Box>
    </div>
  );
}

export default CommentMiddleBar;
