"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TableWidget from '../../components/TableWidget';
import TotalOrderValue from '../../components/TotalOrderValue';
import Sidebar from '../../components/Sidebar';

interface File {
  name: string;
  size: number;
  type: string;
}

interface Account {
  id: number;
  account: string;
  type: string;
  amount: string;
  accountValue: string;
  priority: string;
  industry: string;
  epost: string;
}

const Dashboard: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [accounts, setAccounts] = useState<Account[]>([]);

  useEffect(() => {
    // Fetch files
    const fetchFiles = async () => {
      try {
        const response = await axios.get('/api/files');
        setFiles(response.data);
      } catch (error) {
        console.error('Error fetching files:', error);
      }
    };

    // Fetch accounts
    const fetchAccounts = async () => {
      try {
        const response = await axios.get<Account[]>('/api/accounts');
        setAccounts(response.data);
      } catch (error) {
        console.error('Error fetching accounts:', error);
      }
    };

    fetchFiles();
    fetchAccounts();
  }, []);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-10">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
        {/* Remove the line with <Dashboard files={files} /> */}
        <div className="mt-6">
          <TableWidget data={accounts} />
        </div>
        <TotalOrderValue accounts={accounts} />
      </div>
    </div>
  );
};

export default Dashboard;