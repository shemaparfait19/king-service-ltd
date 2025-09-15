import { type LucideIcon } from "lucide-react";

export type Service = {
  id: string;
  title: string;
  slug: string;
  short_desc: string;
  long_desc: string;
  details: string[];
  icon: LucideIcon;
  imageUrl?: string;
};

export type FaqItem = {
  id: number;
  question: string;
  answer: string;
};

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
  status: "Draft" | "Published";
};

export type PortfolioProject = {
  id: string;
  title: string;
  category: string;
  description: string;
  imageUrl?: string;
};

export type CareerType = "job" | "internship" | "training";

export type CareerBase = {
  id: string;
  type: CareerType;
  title: string;
  slug: string;
  summary: string;
  description: string;
  imageUrl?: string;
  location?: string;
  applicationEmail?: string;
  applicationWhatsapp?: string;
  status: "Draft" | "Published";
  createdAt?: any;
  updatedAt?: any;
};

export type JobCareer = CareerBase & {
  department?: string;
  employmentType?: string; // e.g. Full-time
  salaryRange?: string;
  requirements?: string[];
  responsibilities?: string[];
};

export type InternshipCareer = CareerBase & {
  duration?: string;
  stipend?: string;
  requirements?: string[];
  responsibilities?: string[];
};

export type TrainingCareer = CareerBase & {
  startDate?: any;
  duration?: string;
  price?: string;
  curriculum?: string[];
  prerequisites?: string[];
};

export type Career = JobCareer | InternshipCareer | TrainingCareer;
