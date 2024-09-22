import React from 'react';
import Link from 'next/link';

const Sidebar: React.FC = () => {
  return (
    <div className="bg-gray-800 text-white w-64 min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-6">Finance App</h1>
      <nav>
        <ul>
          <li className="mb-2">
            <Link href="/dashboard" className="block p-2 hover:bg-gray-700 rounded">
              Dashboard
            </Link>
          </li>
          <li className="mb-2">
            <Link href="/accounts" className="block p-2 hover:bg-gray-700 rounded">
              Accounts
            </Link>
          </li>
          <li className="mb-2">
            <Link href="/transactions" className="block p-2 hover:bg-gray-700 rounded">
              Transactions
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;