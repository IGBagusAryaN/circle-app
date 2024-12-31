export type replyTypes = {
    id: number;
    content: string;
    createdAt: Date;
    updatedAt: Date;
    profile: {
      id: number;
      fullname?: string;
      profileImage?: string;
    };
    author: {
      id: number;
      username: string;
    };
  };
  