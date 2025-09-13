import { type LucideIcon } from 'lucide-react';
import type { Service as PrismaService } from '@prisma/client'

// Extending Prisma's generated Service type with the icon component
export type Service = PrismaService & {
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

// These types are now derived from Prisma's generated types
export type { BlogPost, PortfolioProject } from '@prisma/client';
