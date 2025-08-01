
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useNotificationStore } from './notif-store';

// Helper waktu relatif
const getTimeAgo = (timestamp: number): string => {
  const diff = Date.now() - timestamp;
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days} hari lalu`;
  if (hours > 0) return `${hours} jam lalu`;
  if (minutes > 0) return `${minutes} menit lalu`;
  return 'Baru saja';
};

const NotificationBell = () => {
  const { notifications, clearNotifications } = useNotificationStore();
  const [open, setOpen] = useState(false);

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setOpen(!open)}
        className="relative p-2 rounded-full hover:bg-[#2c2b2b] transition"
      >
        {/* Bell icon */}
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5 text-white">
          <path
            fillRule="evenodd"
            d="M5.25 9a6.75 6.75 0 0 1 13.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 0 1-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 1 1-7.48 0 24.585 24.585 0 0 1-4.831-1.244.75.75 0 0 1-.298-1.205A8.217 8.217 0 0 0 5.25 9.75V9Zm4.502 8.9a2.25 2.25 0 1 0 4.496 0 25.057 25.057 0 0 1-4.496 0Z"
            clipRule="evenodd"
          />
        </svg>

        {/* Badge */}
        {notifications.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
            {notifications.length}
          </span>
        )}
      </button>

      {/* Dropdown Notifikasi */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="absolute right-0 mt-2 w-72 bg-[#1d1d1d] shadow-lg border border-[#2c2b2b] rounded-md z-50"
          >
            <div className="p-2 max-h-60 overflow-y-auto custom-scroll">
              {notifications.length === 0 ? (
                <p className="text-sm text-gray-500 text-center">Tidak ada notifikasi</p>
              ) : (
                notifications.map((notif, i) => (
                  <Link
                    key={i}
                    to={`/thread/${notif.threadId ?? ''}`}
                    className="flex items-start gap-2 px-3 py-2 text-sm text-white hover:bg-[#2c2b2b] rounded"
                  >
                    {/* Avatar */}
                    <img
                      src={notif.avatarUrl || '/default-avatar.png'}
                      alt={notif.username}
                      className="w-8 h-8 rounded-full object-cover"
                    />

                    <div className="flex flex-col">
                      <p>
                        <span className="font-semibold">{notif.username}</span>{' '}
                        {notif.message}
                      </p>
                      <span className="text-xs text-gray-400">{getTimeAgo(notif.createdAt)}</span>
                    </div>
                  </Link>
                ))
              )}
            </div>

            {notifications.length > 0 && (
              <button
                onClick={() => {
                  clearNotifications();
                  setOpen(false);
                }}
                className="w-full text-center text-red-500 py-2 text-sm border-t hover:bg-red-50 rounded-b-md"
              >
                Hapus Semua Notifikasi
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NotificationBell;
