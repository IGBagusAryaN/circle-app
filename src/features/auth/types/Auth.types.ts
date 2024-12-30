export type LoginFormProps = {
  email: string;
  password: string;
};

export type RegisterFormProps = {
  email: string;
  username: string;
  password: string;
};
export type ProfileFormProps = {
  userId: string;
  fullname: string;
  bio: string;
  bannerImage?: File | null;
  profileImage?: File | null;
};
