import React, { useState, useRef } from 'react';
import { UserProfile } from '../types';
import { Camera, Edit2, Save, X } from 'lucide-react';
import { Button } from './Button';

interface AboutSectionProps {
  profile: UserProfile;
  onUpdate: (profile: UserProfile) => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ profile, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempProfile, setTempProfile] = useState(profile);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTempProfile(prev => ({ ...prev, avatarUrl: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    onUpdate(tempProfile);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempProfile(profile);
    setIsEditing(false);
  };

  return (
    <section className="bg-white rounded-[3rem] p-8 md:p-12 shadow-sm border border-gray-100 mb-12 relative overflow-hidden print:shadow-none print:border-none print:p-0">
      {/* Decorative neon blobs - hide on print to save ink */}
      <div className="print:hidden absolute -top-24 -right-24 w-64 h-64 bg-[#ccff00] rounded-full blur-[80px] opacity-20 pointer-events-none"></div>
      
      <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 md:gap-12 text-center md:text-left">
        
        {/* Avatar Area */}
        <div className="relative group shrink-0">
          <div className="w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-[#ccff00] shadow-xl bg-gray-50 relative print:shadow-none print:w-40 print:h-40">
            <img 
              src={tempProfile.avatarUrl} 
              alt={tempProfile.name} 
              className="w-full h-full object-cover"
            />
            {isEditing && (
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white cursor-pointer transition-opacity hover:bg-black/50"
              >
                <Camera size={32} />
                <span className="text-sm font-bold mt-2">Change Photo</span>
              </div>
            )}
          </div>
          <input 
            type="file" 
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={handleImageUpload}
          />
        </div>

        {/* Content Area */}
        <div className="flex-1 max-w-2xl w-full">
          {isEditing ? (
            <div className="space-y-4 w-full text-left">
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Name</label>
                <input
                  type="text"
                  value={tempProfile.name}
                  onChange={(e) => setTempProfile(prev => ({...prev, name: e.target.value}))}
                  className="w-full text-3xl md:text-5xl font-black bg-gray-50 border-b-2 border-[#ccff00] focus:outline-none focus:bg-white transition-colors p-2 rounded-t-lg"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">About Me</label>
                <textarea
                  value={tempProfile.bio}
                  onChange={(e) => setTempProfile(prev => ({...prev, bio: e.target.value}))}
                  rows={4}
                  className="w-full text-lg text-gray-600 bg-gray-50 border-b-2 border-gray-200 focus:border-[#ccff00] focus:outline-none focus:bg-white transition-colors p-3 rounded-t-lg resize-none"
                />
              </div>
              <div className="flex gap-3 justify-center md:justify-start pt-2">
                <Button onClick={handleSave}>
                  <Save size={18} className="mr-2" /> Save Profile
                </Button>
                <Button variant="ghost" onClick={handleCancel}>
                  <X size={18} className="mr-2" /> Cancel
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tight">
                {profile.name}
              </h1>
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                {profile.bio}
              </p>
              <Button variant="secondary" onClick={() => setIsEditing(true)} className="mt-4 print:hidden">
                <Edit2 size={16} className="mr-2" /> Edit Profile
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
