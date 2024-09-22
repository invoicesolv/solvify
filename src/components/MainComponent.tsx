import React, { useState } from 'react';
import FileUpload from './FileUpload';
// Import other necessary components or styles

const MainComponent: React.FC = () => {
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);

  const handleFileUploaded = (fileName: string) => {
    setUploadedFiles(prevFiles => [...prevFiles, fileName]);
  };

  return (
    <div>
      <h1>All Projects</h1>
      <FileUpload onFileUploaded={handleFileUploaded} />
      <ul>
        {uploadedFiles.map((file, index) => (
          <li key={index}>{file}</li>
        ))}
      </ul>
    </div>
  );
};

export default MainComponent;