import React from 'react';
import { Button } from './ui/button';
import { Upload } from 'lucide-react';

interface FileUploadProps {
  onFileUploaded: (fileName: string) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileUploaded }) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onFileUploaded(file.name);
    }
  };

  return (
    <div>
      <input
        type="file"
        accept=".xlsx, .xls"
        onChange={handleFileChange}
        style={{ display: 'none' }}
        id="file-upload"
      />
      <label htmlFor="file-upload">
        <Button className="bg-monday-purple cursor-pointer">
          <Upload className="mr-2 h-4 w-4" /> Upload Excel File
        </Button>
      </label>
    </div>
  );
};

export default FileUpload;
