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
import { useState } from 'react';
import { LuSearch } from 'react-icons/lu';
import Cookies from 'js-cookie';
import { apiURL } from 'utils/baseurl';
import FollowButton from 'components/button/FollowButton';
import { UserTypes } from 'types/users.types';

function SearchMiddleBar() {
  const [filteredUsers, setFilteredUsers] = useState<UserTypes[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleSearch = async (query: string) => {
    setSearchQuery(query);

    if (query.trim() === '') {
      setFilteredUsers([]); // Kosongkan daftar user jika query kosong
      return;
    }

    const token = Cookies.get('token');
    if (!token) {
      console.error('Token not found');
      return;
    }

    try {
      const response = await fetch(`${apiURL}users/search?query=${query}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const users = await response.json();
      setFilteredUsers(users); // Perbarui hasil pencarian
    } catch (error) {
      console.error('Error in searchUsers:', error);
      setFilteredUsers([]);
    }
  };

  return (
    <div>
      <HStack gap="10" width="full" px="5" pt="2">
        <InputGroup flex="1" startElement={<LuSearch />}>
          <Input
            placeholder="Search contacts"
            background="#3F3F3F"
            borderRadius="20px"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)} // Panggil handleSearch saat input berubah
          />
        </InputGroup>
      </HStack>

      {searchQuery === '' && filteredUsers.length === 0 ? (
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
                src={user.profile?.[0]?.profileImage}
                boxSize="40px"
                borderRadius="full"
                fit="cover"
                alt={user.profile?.[0]?.fullname || 'User Profile'}
              />
              <Box ml="2">
                <Text textAlign="left" fontSize="14px" fontWeight="semibold">
                  {user.profile?.[0]?.fullname}
                </Text>
                <Text textAlign="left" fontSize="12px" color="gray.400">
                  @{user.username}
                </Text>
              </Box>
            </Flex>
            <FollowButton userId={user.id} />
          </Flex>
        ))
      )}
    </div>
  );
}

export default SearchMiddleBar;
