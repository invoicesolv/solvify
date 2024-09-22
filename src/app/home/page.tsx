'use client';

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface TableRow {
  [key: string]: string;
}

export default function HomePage() {
  const [tableData, setTableData] = useState<TableRow[]>([
    { project: 'Project A', status: 'In Progress', dueDate: '2023-12-31' },
    { project: 'Project B', status: 'Completed', dueDate: '2023-11-30' },
    { project: 'Project C', status: 'Not Started', dueDate: '2024-01-31' },
  ]);

  const addNewRow = () => {
    setTableData([...tableData, { project: 'New Project', status: 'Not Started', dueDate: '' }]);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-white">Home</h1>
      <Card className="bg-gray-800 border-gray-700 rounded-lg overflow-hidden">
        <CardHeader>
          <CardTitle className="text-white">Project Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table className="w-full">
              <TableHeader>
                <TableRow className="bg-gray-700">
                  <TableHead className="text-white font-semibold py-3 px-4">Project</TableHead>
                  <TableHead className="text-white font-semibold py-3 px-4">Status</TableHead>
                  <TableHead className="text-white font-semibold py-3 px-4">Due Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tableData.map((row, rowIndex) => (
                  <TableRow key={rowIndex} className="border-b border-gray-700">
                    {Object.entries(row).map(([key, value], cellIndex) => (
                      <TableCell 
                        key={cellIndex} 
                        className="py-3 px-4 text-white border-r border-gray-600 last:border-r-0"
                      >
                        <input
                          type="text"
                          value={value}
                          onChange={(e) => {
                            const newData = [...tableData];
                            newData[rowIndex][key] = e.target.value;
                            setTableData(newData);
                          }}
                          className="w-full bg-transparent text-white border-none focus:outline-none focus:ring-2 focus:ring-monday-purple rounded-md py-1 px-2"
                        />
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <Button 
            onClick={addNewRow}
            className="mt-4 bg-monday-purple text-white rounded-md hover:bg-monday-purple/90 transition-colors"
          >
            <Plus className="mr-2 h-4 w-4" /> Add New Project
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}