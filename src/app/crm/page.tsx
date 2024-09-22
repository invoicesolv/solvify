'use client';

import React, { useState, useEffect } from 'react';
import Pipeline from '@/components/Pipeline';

export default function CRMPage() {
  const [files, setFiles] = useState<any[]>([]);

  useEffect(() => {
    const fetchFiles = async () => {
      const response = await fetch('/api/files');
      const data = await response.json();
      setFiles(data as any[]);
    };
    fetchFiles();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">CRM</h1>
      <Pipeline files={files} />
    </div>
  );
}