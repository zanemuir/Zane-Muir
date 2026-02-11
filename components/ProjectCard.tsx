import React from 'react';
import { Project } from '../types';
import { Trash2 } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  onDelete: (id: string) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onDelete }) => {
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = "https://placehold.co/800x600/111/ccff00?text=Image+Not+Found";
  };

  return (
    <div className="break-inside-avoid group relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 border border-gray-100 print:shadow-none print:border-gray-200">
      <div className="aspect-video w-full overflow-hidden bg-gray-100 relative">
        <img 
          src={project.imageUrl} 
          alt={project.title} 
          onError={handleImageError}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500 print:transform-none"
        />
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-gray-900 leading-tight">
            {project.title}
          </h3>
          <button 
            onClick={() => onDelete(project.id)}
            className="text-gray-400 hover:text-red-500 transition-colors p-1 print:hidden"
            title="Delete project"
          >
            <Trash2 size={18} />
          </button>
        </div>
        <p className="text-gray-600 leading-relaxed text-sm">
          {project.description}
        </p>
      </div>
    </div>
  );
};
