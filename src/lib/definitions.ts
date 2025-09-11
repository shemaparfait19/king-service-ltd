import { type LucideIcon } from 'lucide-react';

export type Service = {
  id: number;
  title: string;
  slug: string;
  icon: LucideIcon;
  short_desc: string;
  long_desc: string;
  details: string[];
  gallery: {
    id: string;
    imageHint: string;
    imageUrl: string;
  }[];
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
