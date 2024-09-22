import React from 'react';

interface YourComponentProps {
  onFileUploaded: (file: File) => void;
  // ... other props ...
}

const YourComponent: React.FC<YourComponentProps> = ({ onFileUploaded }) => {
  // ... component code ...
  return (
    <div>
      {/* Your component JSX here */}
    </div>
  );
};

export default YourComponent;