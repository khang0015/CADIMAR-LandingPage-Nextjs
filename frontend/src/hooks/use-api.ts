'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ApiClient } from '@/lib/api-client';

// Blog hooks
export function useBlogs(params?: {
  status?: string;
  lang?: string;
  featured?: boolean;
  limit?: number;
  offset?: number;
}) {
  return useQuery({
    queryKey: ['blogs', params],
    queryFn: () => ApiClient.getBlogs(params),
  });
}

export function useBlog(id: string) {
  return useQuery({
    queryKey: ['blog', id],
    queryFn: () => ApiClient.getBlog(id),
    enabled: !!id,
  });
}

export function useBlogBySlug(slug: string) {
  return useQuery({
    queryKey: ['blog', 'slug', slug],
    queryFn: () => ApiClient.getBlogBySlug(slug),
    enabled: !!slug,
  });
}

export function useCreateBlog() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ApiClient.createBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
    },
  });
}

export function useUpdateBlog() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => ApiClient.updateBlog(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
      queryClient.invalidateQueries({ queryKey: ['blog', id] });
    },
  });
}

export function useDeleteBlog() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ApiClient.deleteBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
    },
  });
}

export function useSearchBlogs() {
  return useMutation({
    mutationFn: ({ query, lang }: { query: string; lang?: string }) => 
      ApiClient.searchBlogs(query, lang),
  });
}

// Contact hooks
export function useContacts(params?: {
  status?: string;
  limit?: number;
  offset?: number;
}) {
  return useQuery({
    queryKey: ['contacts', params],
    queryFn: () => ApiClient.getContacts(params),
  });
}

export function useContact(id: string) {
  return useQuery({
    queryKey: ['contact', id],
    queryFn: () => ApiClient.getContact(id),
    enabled: !!id,
  });
}

export function useCreateContact() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ApiClient.createContact,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
    },
  });
}

export function useUpdateContact() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => ApiClient.updateContact(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
      queryClient.invalidateQueries({ queryKey: ['contact', id] });
    },
  });
}

export function useDeleteContact() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ApiClient.deleteContact,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
    },
  });
}

// Language hooks
export function useLanguages() {
  return useQuery({
    queryKey: ['languages'],
    queryFn: () => ApiClient.getLanguages(),
  });
}

export function useCreateLanguage() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ApiClient.createLanguage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['languages'] });
    },
  });
}

export function useUpdateLanguage() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => ApiClient.updateLanguage(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['languages'] });
    },
  });
}

export function useDeleteLanguage() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ApiClient.deleteLanguage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['languages'] });
    },
  });
}

// Translation hooks
export function useTranslations(params?: {
  lang?: string;
  category?: string;
  limit?: number;
  offset?: number;
}) {
  return useQuery({
    queryKey: ['translations', params],
    queryFn: () => ApiClient.getTranslations(params),
  });
}

export function useCreateTranslation() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ApiClient.createTranslation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['translations'] });
    },
  });
}

export function useUpdateTranslation() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => ApiClient.updateTranslation(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['translations'] });
    },
  });
}

export function useDeleteTranslation() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ApiClient.deleteTranslation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['translations'] });
    },
  });
}

export function useBulkImportTranslations() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ApiClient.bulkImportTranslations,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['translations'] });
    },
  });
}
