import { type LucideIcon } from 'lucide-react';
import { type Icon } from 'lucide-react';

export type Service = {
  id: number;
  title: string;
  slug: string;
  icon: string; // Changed to string to store icon name
  short_desc: string;
  long_desc: string;
  details: string[];
  gallery: {
    id: string;
    imageHint: string;
    imageUrl: string;
  }[];
};

// Helper to get Lucide icon component from string name
export const getIcon = (name: string): LucideIcon => {
    const icons = require('lucide-react');
    const IconComponent = icons[name as keyof typeof icons] as LucideIcon;
    return IconComponent || icons.Wrench; // Return a default icon if not found
};


export type FaqItem = {
    id: number;
    question: string;
    answer: string;
}

export type ImagePlaceholder = {
  id: string;
  description: string;
  imageUrl: string;
  imageHint: string;
};

export type BlogPost = {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  category: string;
  image?: ImagePlaceholder;
}

export type PortfolioProject = {
  id: number;
  title: string;
  category: string;
  description: string;
  image?: ImagePlaceholder;
}
