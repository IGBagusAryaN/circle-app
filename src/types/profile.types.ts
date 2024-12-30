export type ProfileTypes = {
  fullname?: string;
  bio?: string;
  bannerImage?: string; // File paths as string, not File or null
  profileImage?: string; // File paths as string, not File or null
  userId?: number; // Consistently use lowercase `number`
  username?: string;
};
