import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

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

interface TableWidgetProps {
  data: Account[];
}

const TableWidget: React.FC<TableWidgetProps> = ({ data }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Account</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Account Value</TableHead>
          <TableHead>Priority</TableHead>
          <TableHead>Industry</TableHead>
          <TableHead>Email</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((account) => (
          <TableRow key={account.id}>
            <TableCell>{account.id}</TableCell>
            <TableCell>{account.account}</TableCell>
            <TableCell>{account.type}</TableCell>
            <TableCell>{account.amount}</TableCell>
            <TableCell>{account.accountValue}</TableCell>
            <TableCell>{account.priority}</TableCell>
            <TableCell>{account.industry}</TableCell>
            <TableCell>{account.epost}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TableWidget;