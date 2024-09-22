import React from 'react';

export const Table: React.FC<React.TableHTMLAttributes<HTMLTableElement>> = (props) => {
  return <table {...props} />;
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

export const TableBody: React.FC<React.HTMLAttributes<HTMLTableSectionElement>> = (props) => {
  return <tbody {...props} />;
};

export const TableCell: React.FC<React.TdHTMLAttributes<HTMLTableCellElement>> = (props) => {
  return <td {...props} />;
};
