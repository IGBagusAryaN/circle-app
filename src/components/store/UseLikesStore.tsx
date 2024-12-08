import { create } from 'zustand';

interface User {
  id: number;
  profile: string;
  name: string;
  account: string;
  comment: string;
  picture?: string;
  liked?: boolean;
  likesCount: number;
}

interface LikesStore {
  users: User[];
  toggleLike: (id: number) => void;
  setUsers: (users: User[]) => void;
}

const UseLikesStore = create<LikesStore>((set) => {
  const savedUsers = localStorage.getItem('users');
  const initialUsers: User[] = savedUsers ? JSON.parse(savedUsers) : [
    {
      id: 1,
      profile: "https://media.tenor.com/cAGJcxxxeycAAAAe/lindbergh-lindbergh-one-piece.png",
      name: "Lindhberg",
      account: "@lindhbergrevolutioner",
      comment: "ASL trio in their chibi prime: Luffy looking confused, Ace ready to fight, and Sabo pretending he's the brains of the group😂",
      picture: "https://i.pinimg.com/originals/28/09/80/28098079205e97162501ec377292bb48.jpg",
      liked: false,
      likesCount: 0, 
    },
    {
      id: 2,
      profile: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRx0w8Fb0eL5EB7kNviLUOUTxXfFtUxnVNHfA&s",
      name: "Luffy",
      account: "@mugiwaranoluffy",
      comment: "I’m gonna be King of the Pirates! 🌊☠️ The journey is tough, but my dreams are unstoppable!",
      liked: false,
      likesCount: 0, 
    },
    {
      id: 3,
      profile: "https://www.clipartmax.com/png/middle/203-2032723_one-piece-clipart-franky-franky-one-piece-png.png",
      name: "Franky",
      account: "@frankycolala",
      comment: "Wow, this looks stunning! The details and composition are just perfect. 👏✨",
      picture: "https://assets.promediateknologi.id/crop/0x0:0x0/750x500/webp/photo/2023/01/24/2389002419.jpg",
      liked: false,
      likesCount: 0,
    },
    {
      id: 4,
      profile: "https://images.alphacoders.com/138/thumb-1920-1381546.png",
      name: "Brook",
      account: "@brook_",
      comment: "Yohohoho! Let the soul-stirring melody sail through the seas! 🎶☠️ Brook’s music hits the heart, even without one!🎻🎤",
      liked: false,
      likesCount: 0,
    },
    {
      id: 5,
      profile: "https://cdn.idntimes.com/content-images/community/2022/06/roronoza-zoro-statue-in-japan-cropped-56965fbaa68adf470a17cc45ea5d328d-0817f04bc75ff0168ca600323d03770c_600x400.jpg",
      name: "Zoro",
      account: "@roronoazoro",
      comment: "This painting is sharp and precise... almost as sharp as my blades. Impressive work!🗡️🎨",
      picture: "https://jabarupdate.id/wp-content/uploads/2024/01/IMG-20240129-WA0002.jpg",
      liked: false,
      likesCount: 0, 
    },
  ];

  const saveUsersToLocalStorage = (users: User[]) => {
    localStorage.setItem('users', JSON.stringify(users));
  };

  return {
    users: initialUsers,
    toggleLike: (id) =>
      set((state) => {
        const updatedUsers = state.users.map((user) => {
          if (user.id === id) {
            const updatedLikesCount = user.liked ? user.likesCount - 1 : user.likesCount + 1;
            return { ...user, liked: !user.liked, likesCount: updatedLikesCount };
          }
          return user;
        });
        saveUsersToLocalStorage(updatedUsers);
        return { users: updatedUsers };
      }),
    setUsers: (users) => {
      saveUsersToLocalStorage(users);
      set({ users });
    },
  };
});

export default UseLikesStore;
