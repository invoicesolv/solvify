import React from 'react';

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

interface TotalOrderValueProps {
  accounts: Account[];
}

const TotalOrderValue: React.FC<TotalOrderValueProps> = ({ accounts }) => {
  const totalBalance = accounts.reduce((sum, account) => {
    const value = parseFloat(account.accountValue.replace(/[^\d.-]/g, '')) || 0;
    return sum + value;
  }, 0);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-6">
      <h2 className="text-xl font-semibold mb-2">Total Balance</h2>
      <p className="text-3xl font-bold text-green-600">${totalBalance.toFixed(2)}</p>
    </div>
  );
};

export default TotalOrderValue;