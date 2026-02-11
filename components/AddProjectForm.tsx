import React, { useState, useRef } from 'react';
import { Project } from '../types';
import { Button } from './Button';
import { generateProjectDescription } from '../services/geminiService';
import { Plus, Image as ImageIcon, Sparkles, X } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

interface AddProjectFormProps {
  onAdd: (project: Project) => void;
}

export const AddProjectForm: React.FC<AddProjectFormProps> = ({ onAdd }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAiGenerate = async () => {
    if (!image) {
      setError("Please upload an image first to use AI generation.");
      return;
    }
    if (!title) {
      setError("Please add a title to help the AI.");
      return;
    }

    setIsGenerating(true);
    setError(null);
    try {
      const generatedDesc = await generateProjectDescription(image, title);
      setDescription(generatedDesc);
    } catch (err) {
      setError("Failed to generate description. Check your API key or try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !image) {
      setError("Please fill in all fields.");
      return;
    }

    onAdd({
      id: uuidv4(),
      title,
      description,
      imageUrl: image
    });

    // Reset
    setTitle('');
    setDescription('');
    setImage(null);
    setIsOpen(false);
    setError(null);
  };

  if (!isOpen) {
    return (
      <div className="flex justify-center my-12">
        <Button onClick={() => setIsOpen(true)} className="text-lg px-8 py-4 shadow-xl shadow-[#ccff00]/20">
          <Plus size={24} className="mr-2" /> Add New Project
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-3xl w-full max-w-2xl p-8 shadow-2xl relative animate-in fade-in zoom-in duration-200">
        <button 
          onClick={() => setIsOpen(false)}
          className="absolute top-6 right-6 text-gray-400 hover:text-gray-900 transition-colors"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-black mb-6 flex items-center gap-2">
          New Project
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Image Upload */}
          <div 
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-colors ${
              image ? 'border-[#ccff00] bg-gray-50' : 'border-gray-200 hover:border-gray-400'
            }`}
          >
            {image ? (
              <div className="relative w-full h-48 rounded-xl overflow-hidden group">
                 <img src={image} alt="Preview" className="w-full h-full object-cover" />
                 <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-white font-bold">
                   Click to change
                 </div>
              </div>
            ) : (
              <>
                <div className="w-16 h-16 rounded-full bg-[#ccff00]/20 flex items-center justify-center mb-4 text-[#ccff00]">
                  <ImageIcon size={32} className="text-black" />
                </div>
                <p className="font-bold text-gray-900">Upload Project Image</p>
                <p className="text-sm text-gray-500 mt-1">PNG, JPG up to 5MB</p>
              </>
            )}
            <input 
              type="file" 
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={handleImageUpload}
            />
          </div>

          {/* Inputs */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Project Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Neon Dashboard UI"
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-[#ccff00] focus:ring-2 focus:ring-[#ccff00]/20 outline-none transition-all"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-sm font-bold text-gray-700">Description</label>
                <button
                  type="button"
                  onClick={handleAiGenerate}
                  disabled={isGenerating || !image}
                  className="text-xs font-bold text-purple-600 flex items-center hover:bg-purple-50 px-2 py-1 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Sparkles size={14} className="mr-1" />
                  {isGenerating ? 'Generating...' : 'Auto-Generate with AI'}
                </button>
              </div>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe what you built..."
                rows={4}
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-[#ccff00] focus:ring-2 focus:ring-[#ccff00]/20 outline-none transition-all resize-none"
              />
            </div>
          </div>

          {error && (
            <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg font-medium">
              {error}
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <Button type="submit" className="flex-1">
              Add to Portfolio
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
