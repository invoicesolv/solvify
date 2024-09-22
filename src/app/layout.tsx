'use client';

import React from 'react';
import './globals.css';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const handleSearch = (term: string) => {
    console.log('Searching:', term);
    // Implement your search logic here
  };

  return (
    <html lang="en">
      <body className="bg-brand-sidebar text-white">
        <div className="flex h-screen overflow-hidden">
          <Sidebar />
          <div className="flex flex-col flex-1 overflow-hidden">
            <Header onSearch={handleSearch} />
            <main className="flex-1 overflow-auto p-8 bg-brand-sidebar">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
