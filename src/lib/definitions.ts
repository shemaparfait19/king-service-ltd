import { type LucideIcon } from 'lucide-react';

export type Service = {
    id: string;
    title: string;
    slug: string;
    short_desc: string;
    long_desc: string;
    details: string[];
    icon: LucideIcon;
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
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    date: any; // Firestore timestamp object or string
    author: string;
    category: string;
    imageUrl?: string;
    status: 'Draft' | 'Published';
}

export type PortfolioProject = {
    id: string;
    title: string;
    category: string;
    description: string;
    imageUrl?: string;
}
