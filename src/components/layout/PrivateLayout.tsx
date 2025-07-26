import { Outlet } from 'react-router-dom';
import { ReactNode } from 'react';

interface PrivateLayoutProps {
  children?: ReactNode;
}

function PrivateLayout({ children }: PrivateLayoutProps) {
  return (
    <div>
      <main>
        {children ?? <Outlet />}
      </main>
    </div>
  );
}

export default PrivateLayout;
