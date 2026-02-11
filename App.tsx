import React, { useState } from 'react';
import { UserProfile, Project } from './types';
import { AboutSection } from './components/AboutSection';
import { ProjectCard } from './components/ProjectCard';
import { AddProjectForm } from './components/AddProjectForm';
import { Printer } from 'lucide-react';
import { Button } from './components/Button';
import { userProfile, projectData } from './data';

const App: React.FC = () => {
  // Initial Editable Data loaded from data.ts
  const [profile, setProfile] = useState<UserProfile>(userProfile);
  const [projects, setProjects] = useState<Project[]>(projectData);

  const handleAddProject = (newProject: Project) => {
    setProjects([newProject, ...projects]);
  };

  const handleDeleteProject = (id: string) => {
    if (confirm("Are you sure you want to remove this project?")) {
      setProjects(projects.filter(p => p.id !== id));
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-[#ccff00] selection:text-black">
      
      {/* Header - Hidden when printing */}
      <header className="print:hidden fixed top-0 w-full bg-white/80 backdrop-blur-md z-40 border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-[#ccff00]"></div>
            <span className="font-bold text-xl tracking-tight">NeonFolio Builder</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs font-medium text-gray-400 hidden md:inline-block">
              Edit your portfolio below
            </span>
            <Button onClick={handlePrint} className="flex items-center gap-2 shadow-lg !py-2 !px-4">
              <Printer size={18} />
              Save as PDF
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 pt-32 pb-24 print:pt-12 print:pb-0">
        
        {/* Profile Section */}
        <AboutSection profile={profile} onUpdate={setProfile} />

        <div className="flex items-center justify-between mb-8 mt-16 print:mt-8">
          <h2 className="text-3xl font-black">My Work</h2>
          <span className="bg-gray-100 px-3 py-1 rounded-full text-xs font-bold text-gray-500 print:hidden">
            {projects.length} Projects
          </span>
        </div>

        {/* Add Project Form - Hidden when printing */}
        <div className="print:hidden">
          <AddProjectForm onAdd={handleAddProject} />
        </div>

        {/* Project Grid */}
        {projects.length === 0 ? (
          <div className="text-center py-20 bg-gray-50 rounded-3xl border border-dashed border-gray-200 print:hidden">
            <p className="text-gray-400 font-medium">No projects added yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 print:grid-cols-2 print:gap-6">
            {projects.map(project => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                onDelete={handleDeleteProject}
              />
            ))}
          </div>
        )}

      </main>

      <footer className="bg-gray-50 border-t border-gray-100 py-12 text-center print:hidden">
        <p className="text-gray-500 font-medium text-sm">
          Tip: Click "Save as PDF" to export your portfolio.
        </p>
      </footer>

    </div>
  );
};

export default App;