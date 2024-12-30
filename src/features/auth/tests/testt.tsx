import React, { useEffect, useState } from 'react';

import Cookies from 'js-cookie';

const ProfilePagetest: React.FC = () => {
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    const retrieveUserProfile = async () => {
      const token = Cookies.get('token');
      if (!token) return;

      try {
        const decoded: { id: number } = JSON.parse(atob(token.split('.')[1]));
        setUserId(decoded.id);
      } catch (error) {
        console.error('Error retrieving user ID:', error);
      }
    };

    retrieveUserProfile();
  }, []);

  if (userId === null) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Halaman Profil</h1>
      {/* <UserConnections userId={userId} /> */}
    </div>
  );
};

export default ProfilePagetest;
