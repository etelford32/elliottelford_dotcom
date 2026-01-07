/**
 * Core TypeScript interfaces for the website
 */

export interface Simulation {
  id: string;
  title: string;
  slug: string;
  category: 'computational-astrophysics' | 'quantum-physics' | 'biological-evolution' | 'physics-games';
  description: string;
  scientificAccuracy: string;
  techStack: string[];
  thumbnail: string;
  demoUrl?: string;
  githubUrl?: string;
  featured: boolean;
  tags: string[];
  createdDate: string;
}

export interface BlogPost {
  title: string;
  slug: string;
  excerpt: string;
  category: 'space' | 'gamedev' | 'health' | 'opinion';
  tags: string[];
  publishDate: string;
  readingTime: number;
  featured: boolean;
  coverImage?: string;
  content?: string;
}

export interface Project {
  title: string;
  slug: string;
  description: string;
  category: string;
  techStack: string[];
  liveUrl?: string;
  githubUrl?: string;
  images: string[];
  featured: boolean;
}

export type SimulationCategory = 'computational-astrophysics' | 'quantum-physics' | 'biological-evolution' | 'physics-games';
export type BlogCategory = 'space' | 'gamedev' | 'health' | 'opinion';
