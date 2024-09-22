import React from 'react';

interface TableProps extends React.HTMLAttributes<HTMLTableElement> {
  children: React.ReactNode;
}

export const Table: React.FC<TableProps> = ({ children, ...props }) => {
  return <table {...props}>{children}</table>
};

export const TableBody = ({ children }: { children: React.ReactNode }) => {
  return <tbody>{children}</tbody>
};

export const TableHeader: React.FC<React.HTMLAttributes<HTMLTableSectionElement>> = (props) => {
  return <thead {...props} />;
};

export const TableRow: React.FC<React.HTMLAttributes<HTMLTableRowElement>> = (props) => {
  return <tr {...props} />;
};

export const TableHead: React.FC<React.ThHTMLAttributes<HTMLTableCellElement>> = (props) => {
  return <th {...props} />;
};

export const TableCell: React.FC<React.TdHTMLAttributes<HTMLTableCellElement>> = (props) => {
  return <td {...props} />;
};
