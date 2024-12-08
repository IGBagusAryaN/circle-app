import React, { useState, useEffect } from "react";
import { Box, Button, Image, Input, Text, Textarea } from "@chakra-ui/react";
import Swal from "sweetalert2";
import {
  PopoverBody,
  PopoverCloseTrigger,
  PopoverContent,
  PopoverRoot,
  PopoverTrigger,
} from "components/ui/popover";
import UseAccountStore from "components/store/UseAccountStore";

interface Transform {
  transform: string;
}

const PopoverEditProfile: React.FC<Transform> = ({ transform }) => {
  // Ambil data akun dan fungsi update dari store
  const { account, updateAccountData, login } = UseAccountStore();

  // State sementara untuk input
  const [tempName, setTempName] = useState("");
  const [tempProfileImage, setTempProfileImage] = useState("");
  const [tempBannerImage, setTempBannerImage] = useState("");
  const [tempBio, setTempBio] = useState("");
  const [tempUsername, setTempUsername] = useState("");

  // Sinkronisasi data awal saat account berubah
  useEffect(() => {
    if (account) {
      setTempName(account.fullName || "");
      setTempProfileImage(account.profileImage || "");
      setTempBannerImage(account.bannerImage || "");
      setTempBio(account.bio || "");
      setTempUsername(account.username || "");
    }
  }, [account]);

  const handleSave = () => {
    if (!account) {
      Swal.fire({
        title: "Error",
        text: "No account data found!",
        icon: "error",
        confirmButtonColor: "#E53E3E",
        background: "#1D1D1D",
        color: "#fff",
      });
      return;
    }

    const updatedData = {
      fullName: tempName,
      profileImage: tempProfileImage,
      bannerImage: tempBannerImage,
      bio: tempBio,
      username: tempUsername,
    };

    // Update data di Zustand
    updateAccountData(updatedData);

    // Perbarui akun aktif
    login({ ...account, ...updatedData });

    Swal.fire({
      title: "Profile Updated!",
      text: "Your profile has been successfully updated.",
      icon: "success",
      confirmButtonColor: "#38a169",
      background: "#1D1D1D",
      color: "#fff",
    }).then(() => {
      document.body.click(); // Menutup Popover
    });
  };

  return (
    <PopoverRoot>
      <PopoverTrigger asChild>
        <Button
          right="0"
          mt="3"
          border="1px solid"
          borderColor="#FFFF"
          background="none"
          color="#FFFF"
          borderRadius="20px"
          _hover={{ background: "#FFFF", color: "black" }}
        >
          Edit Profile
        </Button>
      </PopoverTrigger>
      <PopoverContent
        overflowY="auto"
        width="80vh"
        maxHeight="90vh"
        position="fixed"
        top="50%"
        left="50%"
        transform={transform}
        zIndex="1000"
        borderRadius="10px"
        boxShadow="lg"
        background="#1D1D1D"
      >
        <PopoverBody>
          <Text fontSize="18px">Edit Profile</Text>
          <Box my="20px">
            {/* Form untuk edit profile */}
            <Box mt="70px">
              <Text fontSize="14px" mb="1">
                Name
              </Text>
              <Input
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
                placeholder="Change your name"
              />
            </Box>
            <Box mt="10px">
              <Text fontSize="14px" mb="1">
                Username
              </Text>
              <Input
                value={tempUsername}
                onChange={(e) => setTempUsername(e.target.value)}
                placeholder="Change your username"
              />
            </Box>
            <Box mt="10px">
              <Text fontSize="14px" mb="1">
                Bio
              </Text>
              <Textarea
                value={tempBio}
                onChange={(e) => setTempBio(e.target.value)}
                placeholder="Change your bio"
              />
            </Box>
            <Box mt="10px">
              <Text fontSize="14px" mb="1">
                Profile Image URL
              </Text>
              <Input
                value={tempProfileImage}
                onChange={(e) => setTempProfileImage(e.target.value)}
                placeholder="Change your profile image URL"
              />
            </Box>
            <Box mt="10px">
              <Text fontSize="14px" mb="1">
                Banner Image URL
              </Text>
              <Input
                value={tempBannerImage}
                onChange={(e) => setTempBannerImage(e.target.value)}
                placeholder="Change your banner image URL"
              />
            </Box>
          </Box>
          <Box textAlign="right">
            <Button
              rounded="50px"
              backgroundColor="#04A51E"
              color="#FFFF"
              _hover={{ backgroundColor: "#006811" }}
              onClick={handleSave}
            >
              Save
            </Button>
          </Box>
        </PopoverBody>
        <PopoverCloseTrigger />
      </PopoverContent>
    </PopoverRoot>
  );
};

export default PopoverEditProfile;
