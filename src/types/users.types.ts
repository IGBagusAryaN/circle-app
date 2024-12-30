export interface UserTypes {
  id: number;
  username: string;
  profile: {
    fullname?: string;
    bio?: string;
    username?: string;
    bannerImage?: string;
    profileImage?: string;
  }[];
  following?: [];
  followers?: [];
}
