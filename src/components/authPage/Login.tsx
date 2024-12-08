import { Box, Button, Input, Text } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { PasswordInput } from "../ui/password-input";
import Logo from "../logo/Logo";
import Swal from "sweetalert2";
import UseAccountStore from "components/store/UseAccountStore";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

const Login = () => {
  const login = UseAccountStore((state) => state.login); // Ambil fungsi login dari Zustand
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormInputs) => {
    // Ambil data semua akun dari localStorage
    const accounts = JSON.parse(localStorage.getItem("accounts") || "[]");

    // Cari akun dengan email dan password yang cocok
    const account = accounts.find(
      (u: any) => u.email === data.email && u.password === data.password
    );

    if (account) {
      // Lakukan login menggunakan Zustand
      login({
        id: account.id,
        fullName: account.fullName,
        email: account.email,
        profileImage: account.profileImage || "",
        bannerImage: account.bannerImage || "",
        username: account.username,
        bio: account.bio || "",
        following: account.following || 0,
        followers: account.followers || 0,
      });

      Swal.fire({
        title: "Success!",
        text: "You have successfully logged in.",
        icon: "success",
        confirmButtonColor: "#04A51E",
        background: "#1D1D1D",
        color: "#fff",
        allowOutsideClick: false,
      }).then(() => {
        // Tandai bahwa pengguna berhasil login
        localStorage.setItem("isAuthenticated", "true");
        navigate("/"); // Arahkan ke halaman utama setelah login sukses
      });
    } else {
      Swal.fire({
        title: "Error",
        text: "Invalid email or password",
        icon: "error",
        confirmButtonColor: "#E53E3E",
        background: "#1D1D1D",
        color: "#fff",
        allowOutsideClick: false,
      });
    }
  };

  return (
    <Box display="flex" justifyContent="center" pt="10">
      <Box width="25%" display="flex" flexDirection="column" alignItems="flex-start">
        <Logo fontsize="36px" />
        <Text fontSize="24px" fontWeight="semibold">
          Login to Circle
        </Text>
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="w-full">
          <Input
            {...register("email")}
            type="text"
            placeholder="Email"
            marginTop="4"
          />
          {errors.email && (
            <Text color="red.500" fontSize="xs" textAlign={"left"} marginTop="1.5">
              {errors.email.message}
            </Text>
          )}

          <PasswordInput
            {...register("password")}
            placeholder="Password"
            mt="4"
          />
          {errors.password && (
            <Text color="red.500" fontSize="xs" textAlign={"left"} marginTop={1.5}>
              {errors.password.message}
            </Text>
          )}

          <Link to="/forgotpassword">
            <Text fontSize="12px" marginTop="2" marginBottom="3" textAlign="right">
              Forgot Password?
            </Text>
          </Link>

          <Button
            type="submit"
            rounded="50px"
            backgroundColor="#04A51E"
            width="full"
            color="#FFFF"
            _hover={{ backgroundColor: "#006811" }}
          >
            Login
          </Button>
        </form>
        <Text fontSize="12px" marginTop="2">
          Don't have an account yet?{" "}
          <Link to="/register" className="text-[#04A51E]">
            Create Account
          </Link>
        </Text>
      </Box>
    </Box>
  );
};

export default Login;
