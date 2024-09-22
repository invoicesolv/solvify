import React from 'react';

export default function ProjekttavlaLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="projekttavla-layout">
      {children}
    </div>
  );
}