'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TableWidget from '../src/components/TableWidget';
import TotalOrderValue from '../src/components/TotalOrderValue';
import Sidebar from '../src/components/Sidebar';

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
  const [accounts, setAccounts] = useState<Account[]>([]);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await axios.get<Account[]>('/api/accounts');
        setAccounts(response.data);
      } catch (error) {
        console.error('Error fetching accounts:', error);
      }
    };

    fetchAccounts();
  }, []);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-10">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
        <TableWidget data={accounts} />
        <TotalOrderValue accounts={accounts} />
      </div>
    </div>
  );
};

export default Dashboard;