export interface ThreadTypes {
  authorId: number;
  content: string;
  createdAt: Date;
  id: number;
  userId: number;
  image: string;
  profile: {
    id: number;
    fullname?: string;
    profileImage?: string;
  };
  author: {
    id: number;
    username: string;
  };

  updateAt: Date;
};
