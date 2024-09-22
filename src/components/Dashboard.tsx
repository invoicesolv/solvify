import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';

interface DashboardProps {
  files: any[];
}

const Dashboard: React.FC<DashboardProps> = ({ files }) => {
  return (
    <Card className="bg-[#6161FF]">
      <CardHeader>
        <CardTitle className="text-white">Uploaded Files</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-white">File Name</TableHead>
              <TableHead className="text-white">Size</TableHead>
              <TableHead className="text-white">Upload Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {files.map((file) => (
              <TableRow key={file.id}>
                <TableCell className="text-white">{file.name}</TableCell>
                <TableCell className="text-white">{file.size} bytes</TableCell>
                <TableCell className="text-white">{new Date(file.last_modified).toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default Dashboard;