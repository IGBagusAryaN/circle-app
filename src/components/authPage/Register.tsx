import { Box, Input, Text } from "@chakra-ui/react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { PasswordInput } from "../ui/password-input";
import ButtonPrimary from "components/button/Button";
import Logo from "components/logo/Logo";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import UseAccountStore from "components/store/UseAccountStore";
import Swal from "sweetalert2";

// Definisi validasi schema menggunakan Zod
const registerSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type RegisterFormInputs = z.infer<typeof registerSchema>;

const Register = () => {
  const navigate = useNavigate();
  const { updateAccountData } = UseAccountStore(); // Akses Zustand Store
  
  // Inisialisasi react-hook-form dengan zodResolver
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormInputs>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: RegisterFormInputs) => {
    // Cek apakah email sudah terdaftar
    const accounts = JSON.parse(localStorage.getItem('accounts') || '[]');
    const isEmailTaken = accounts.some((account: any) => account.email === data.email);

    if (isEmailTaken) {
      Swal.fire({
        title: "Error",
        text: "Email is already registered!",
        icon: "error",
        confirmButtonColor: "#E53E3E",
        background: "#1D1D1D",
        color: "#fff",
        allowOutsideClick: false,
      });
      return;
    }

    // Buat akun baru
    const newAccount = {
      id: Date.now().toString(),
      fullName: data.fullName,
      email: data.email,
      password: data.password, // Jangan lupa enkripsi password jika diperlukan
    };

    // Simpan akun baru ke localStorage dan Zustand Store
    accounts.push(newAccount);
    localStorage.setItem('accounts', JSON.stringify(accounts));

    updateAccountData({
      [newAccount.id]: {
        ...newAccount,
        bio: "",
        profileImage: "",
        bannerImage: "",
      },
    });

    Swal.fire({
      title: "Success!",
      text: "You have successfully registered",
      icon: "success",
      confirmButtonColor: "#04A51E",
      background: "#1D1D1D",
      color: "#fff",
      allowOutsideClick: false,
    })
    navigate("/login"); // Redirect ke halaman login
  };

  return (
    <Box display="flex" justifyContent="center" pt="10">
      <Box width="25%" display="flex" flexDirection="column" alignItems="flex-start">
        <Logo fontsize="36px" />
        <Text fontSize="24px" fontWeight="semibold">Create Account Circle</Text>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <Input
            {...register("fullName")}
            type="text"
            placeholder="Full name"
            marginTop="4"
            width={"full"}
          />
          {errors.fullName && (
            <Text color="red.500" fontSize="xs" textAlign={"left"} marginTop="1.5">
              {errors.fullName.message}
            </Text>
          )}

          <Input
            {...register("email")}
            type="email"
            placeholder="Email"
            marginTop="4"
            width={"full"}
          />
          {errors.email && (
            <Text color="red.500" fontSize="xs" textAlign={"left"} marginTop="1.5">
              {errors.email.message}
            </Text>
          )}

          <PasswordInput {...register("password")} placeholder="Password" mt="4" />
          {errors.password && (
            <Text color="red.500" fontSize="xs" textAlign={"left"} marginTop={1.5}>
              {errors.password.message}
            </Text>
          )}

          <Box marginTop={3}>
            <ButtonPrimary text="Create Account" />
          </Box>
        </form>
        <Text fontSize="12px" marginTop="2">
          Already have account?{" "}
          <Link to="/login" className="text-[#04A51E] hover:text-[#006811]">
            Login
          </Link>
        </Text>
      </Box>
    </Box>
  );
};

export default Register;
