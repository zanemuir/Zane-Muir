import { Project, UserProfile } from './types';

/**
 * =====================================================================
 * 🟢 HOW TO EDIT YOUR PORTFOLIO
 * =====================================================================
 * 
 * 1. TEXT: Change any text inside the quotes "". 
 *    Example: name: "Your Name"
 * 
 * 2. PHOTOS: Since this is a website, you need to use Image URLs.
 *    - Upload your photo to a site like Imgur.com, PostImages.org, or Cloudinary.
 *    - Right-click the uploaded image and select "Copy Image Address".
 *    - Paste that link inside the quotes below.
 *    - Ensure the link ends in .jpg, .png, or .webp
 * 
 * 3. NEW PROJECTS: To add a new project, copy the block inside curly braces { ... },
 *    paste it after the last comma, and fill in your details.
 */

export const userProfile: UserProfile = {
  // 1. Your Name
  name: "Alex Designer",
  
  // 2. Your 'About Me' Paragraph
  bio: "I am a creative developer passionate about minimal design, neon aesthetics, and building intuitive user experiences. Welcome to my digital garden.",
  
  // 3. Your Profile Photo URL
  avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop"
};

export const projectData: Project[] = [
  // --- PROJECT 2 ---
  {
    id: "2",
    title: "Task Master App",
    description: "Productivity dashboard focusing on clarity and focus. Uses a card-based layout to organize daily workflows efficiently. Features include drag-and-drop tasks and dark mode.",
    imageUrl: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?q=80&w=1000&auto=format&fit=crop"
  },
  
  // --- PROJECT 3 ---
  {
    id: "3",
    title: "AI Image Analyzer",
    description: "An experimental tool that uses computer vision to generate descriptive text for uploaded images. This project showcases my ability to integrate complex APIs into simple interfaces.",
    imageUrl: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1000&auto=format&fit=crop"
  }
];
