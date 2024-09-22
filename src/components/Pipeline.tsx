import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface PipelineProps {
  files: any[];
}

const Pipeline: React.FC<PipelineProps> = ({ files }) => {
  // Use files instead of crmData
  return (
    <Card>
      <CardHeader>
        <CardTitle>Pipeline</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Total files in pipeline: {files.length}</p>
        {/* Add more pipeline visualization logic here */}
      </CardContent>
    </Card>
  );
};

export default Pipeline;