'use client';

import React from 'react';
import Button from './Button'; // Ensure this path correctly points to your Button component
import { Input } from "@/components/ui/input";
import { Search, Bell, HelpCircle, ChevronDown } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BellIcon, HelpCircleIcon } from 'lucide-react';
// import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@radix-ui/react-select';

interface HeaderProps {
  onSearch: (term: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onSearch }) => {
  return (
    <header className="bg-[#202A44] text-white p-4 flex items-center justify-between rounded-lg">
      <div className="flex items-center space-x-4">
        <h1 className="text-xl font-bold">Solvify Work Management</h1>
        <Button variant="ghost" className="rounded-md text-white hover:bg-[#34A798]">
          Workspace <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </div>
      <div className="flex items-center space-x-4">
        <div className="relative">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="text"
            placeholder="Search..."
            onChange={(e) => onSearch(e.target.value)}
            className="pl-8 bg-[#212322] text-white rounded-md focus:ring-[#48A9C5] focus:border-[#48A9C5]"
          />
        </div>
        <Button variant="ghost" className="rounded-md text-white hover:bg-[#34A798]"><BellIcon className="h-5 w-5" /></Button>
        <Button variant="ghost" className="rounded-md text-white hover:bg-[#34A798]"><HelpCircleIcon className="h-5 w-5" /></Button>
        <Avatar className="rounded-md">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" className="rounded-md" />
          <AvatarFallback className="rounded-md bg-[#48A9C5]">CN</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
};

export default Header;