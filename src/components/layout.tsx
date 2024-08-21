import React from 'react';
import { useRouter } from 'next/router';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();

  return (
    <div className="flex flex-col min-h-screen">
      <button onClick={() => router.back()} className="p-2 m-2 bg-blue-500 text-white rounded">
        Go back
      </button>
      <main className="flex-grow">{children}</main>
    </div>
  );
};

export default Layout;