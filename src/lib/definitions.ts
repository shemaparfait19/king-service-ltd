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
