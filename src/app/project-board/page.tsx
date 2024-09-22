'use client';

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Plus } from 'lucide-react';
import * as XLSX from 'xlsx';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';

export default function ProjectBoardPage() {
  const [projectData, setProjectData] = useState<any[]>([
    { id: 1, name: 'Project A', status: 'In Progress', dueDate: '2023-12-31' },
    { id: 2, name: 'Project B', status: 'Completed', dueDate: '2023-11-30' },
    { id: 3, name: 'Project C', status: 'Not Started', dueDate: '2024-01-31' },
  ]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    // ... same as in HomePage
  };

  return (
    <div className="h-full">
      <h1 className="text-2xl font-bold mb-4 text-monday-purple">Project Board</h1>
      
      <div className="mb-4">
        <input
          type="file"
          accept=".xlsx, .xls"
          onChange={handleFileUpload}
          style={{ display: 'none' }}
          id="file-upload"
        />
        <label htmlFor="file-upload">
          <Button className="bg-monday-purple cursor-pointer">
            <Plus className="mr-2 h-4 w-4" /> Välj fil
          </Button>
        </label>
      </div>

      <Card className="bg-monday-dark">
        <CardHeader>
          <CardTitle className="text-monday-purple">Projects</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-white">Name</TableHead>
                <TableHead className="text-white">Status</TableHead>
                <TableHead className="text-white">Due Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projectData.map((project) => (
                <TableRow key={project.id}>
                  <TableCell className="text-white">{project.name}</TableCell>
                  <TableCell className="text-white">{project.status}</TableCell>
                  <TableCell className="text-white">{project.dueDate}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <Button className="mt-4 bg-monday-purple"><Plus className="mr-2 h-4 w-4" /> Add New Project</Button>
    </div>
  );
}