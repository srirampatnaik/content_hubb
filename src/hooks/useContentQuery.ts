import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { ContentItem } from '@/store/slices/contentSlice';
import { z } from 'zod';

// Mock API base URL - in a real app this would be your actual API
const API_BASE = '/api';

// Zod schemas for validation
export const createContentSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title too long'),
  description: z.string().min(10, 'Description must be at least 10 characters').max(500, 'Description too long'),
  category: z.string().min(1, 'Category is required'),
});

export type CreateContentData = z.infer<typeof createContentSchema>;

// Mock data generator
const generateMockContent = (): ContentItem[] => [
  {
    id: '1',
    title: 'Complete Guide to React Server Components',
    description: 'Learn how to build faster React applications using Server Components with practical examples and best practices.',
    category: 'React',
    status: 'published',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 86400000).toISOString(),
    slug: 'react-server-components',
    author: 'Sarah Chen',
    tags: ['React', 'Performance', 'SSR'],
  },
  {
    id: '2',
    title: 'Next.js 14 SEO Optimization Techniques',
    description: 'Master SEO in Next.js 14 with App Router, metadata API, and advanced optimization strategies.',
    category: 'Next.js',
    status: 'in-progress',
    createdAt: new Date(Date.now() - 172800000).toISOString(),
    updatedAt: new Date(Date.now() - 86400000).toISOString(),
    author: 'Alex Rivera',
    tags: ['Next.js', 'SEO', 'Performance'],
  },
  {
    id: '3',
    title: 'TypeScript Advanced Patterns for Large Applications',
    description: 'Explore advanced TypeScript patterns including conditional types, mapped types, and utility types for scalable codebases.',
    category: 'TypeScript',
    status: 'requested',
    createdAt: new Date(Date.now() - 259200000).toISOString(),
    updatedAt: new Date(Date.now() - 259200000).toISOString(),
    tags: ['TypeScript', 'Patterns', 'Architecture'],
  },
  {
    id: '4',
    title: 'Building Accessible React Components',
    description: 'Create inclusive React components with proper ARIA attributes, keyboard navigation, and screen reader support.',
    category: 'Accessibility',
    status: 'published',
    createdAt: new Date(Date.now() - 345600000).toISOString(),
    updatedAt: new Date(Date.now() - 345600000).toISOString(),
    slug: 'accessible-react-components',
    author: 'Maya Patel',
    tags: ['React', 'Accessibility', 'UX'],
  },
];

// Mock API functions
const mockAPI = {
  getContent: async (): Promise<ContentItem[]> => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));
    return generateMockContent();
  },
  
  createContent: async (data: CreateContentData): Promise<ContentItem> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newContent: ContentItem = {
      id: Date.now().toString(),
      ...data,
      status: 'requested',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    return newContent;
  },
};

// React Query hooks
export const useContentQuery = () => {
  return useQuery({
    queryKey: ['content'],
    queryFn: mockAPI.getContent,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export const useCreateContentMutation = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: mockAPI.createContent,
    onSuccess: (newContent) => {
      queryClient.setQueryData(['content'], (old: ContentItem[] | undefined) => {
        return old ? [newContent, ...old] : [newContent];
      });
    },
  });
};