import React from 'react';
import Button from './Button';

interface ProjectListProps {
  projects: string[];
  currentProject: string;
  onProjectSelect: (project: string) => void;
}

const ProjectList: React.FC<ProjectListProps> = ({ projects, currentProject, onProjectSelect }) => {
  return (
    <div className="space-y-2">
      {projects.map((project) => (
        <Button
          key={project}
          variant={project === currentProject ? "default" : "outline"}
          onClick={() => onProjectSelect(project)}
        >
          {project}
        </Button>
      ))}
    </div>
  );
};

export default ProjectList;