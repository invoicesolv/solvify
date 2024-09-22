'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export default function ProjectProposalPage() {
  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold mb-4">Project Proposal</h1>
      <Card className="bg-[#313450]">
        <CardHeader>
          <CardTitle className="text-white">Project Proposal</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-white">This is where you can create and manage project proposals.</p>
        </CardContent>
      </Card>
    </div>
  );
}