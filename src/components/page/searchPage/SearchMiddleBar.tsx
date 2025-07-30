import {
  Box,
  Flex,
  HStack,
  Image,
  Input,
  Text,
  Center,
} from '@chakra-ui/react';
import { InputGroup } from 'components/ui/input-group';
import { useState, useEffect } from 'react';
import { LuSearch } from 'react-icons/lu';
import Cookies from 'js-cookie';
import FollowButton from 'components/button/FollowButton';
import { UserTypes } from 'types/users.types';
import { Link } from 'react-router-dom';
import { searchUsers } from 'features/dashboard/services/users.service';
import { LottieAnimation } from 'components/lottie';

function SearchMiddleBar() {
  const [filteredUsers, setFilteredUsers] = useState<UserTypes[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const userId = Cookies.get('userId');
    if (userId) {
      setCurrentUserId(Number(userId));
    }
  }, []); 
  
const handleSearch = async (query: string) => {
  setSearchQuery(query);

  if (query.trim() === '') {
    setFilteredUsers([]);
    return;
  }

  setIsSearching(true); // mulai loading

  try {
    const users = await searchUsers(query);
    const filtered = users.filter((user: UserTypes) => user.id !== currentUserId);
    setFilteredUsers(filtered);
  } catch (error) {
    console.error('Error in searchUsers:', error);
    setFilteredUsers([]);
  } finally {
    setIsSearching(false); // selesai loading
  }
};

  

  return (
    <div className='pb-[77px] md:pb-0'>
      <HStack gap="10" width="full" px="5" pt="2">
        <InputGroup flex="1" startElement={<LuSearch />}>
          <Input
            placeholder="Search contacts"
            background="#3F3F3F"
            borderRadius="20px"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)} 
          />
        </InputGroup>
      </HStack>

{isSearching ? (
  <Center>
    <LottieAnimation />
  </Center>
) : searchQuery === '' && filteredUsers.length === 0 ? (
  <Center mt="5">
    <Text fontSize="sm" color="gray.500">
      Type to searching
    </Text>
  </Center>
) : filteredUsers.length === 0 ? (
  <Center mt="5">
    <Text fontSize="sm" color="gray.500">
      No results found
    </Text>
  </Center>
) : (
  filteredUsers.map((user) => (
    <Flex key={user.id} mt="3" mb="5" justify="space-between" px="5">
      <Flex>
        <Image
          src={
            user.profile?.[0]?.profileImage ||
            'https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.webp'
          }
          boxSize="40px"
          borderRadius="full"
          fit="cover"
          alt={user.profile?.[0]?.fullname || 'User Profile'}
        />
        <Link to={`/profile/${user.id}`}>
          <Box ml="2">
            <Text textAlign="left" fontSize="14px" fontWeight="semibold">
              {user.profile?.[0]?.fullname || 'No Name'}
            </Text>
            <Text textAlign="left" fontSize="12px" color="gray.400">
              @{user.username}
            </Text>
          </Box>
        </Link>
      </Flex>
      <FollowButton userId={user.id} />
    </Flex>
  ))
)}

    </div>
  );
}

export default SearchMiddleBar;
