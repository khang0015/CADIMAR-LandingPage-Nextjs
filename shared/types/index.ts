// API Response types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Common types
export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
}

// Blog types
export interface BlogPost extends BaseEntity {
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  featured: boolean;
  status: 'draft' | 'published';
  lang: 'en' | 'vi';
  category: string;
  tags: string[];
}

export interface CreateBlogRequest {
  title: string;
  content: string;
  excerpt: string;
  category: string;
  lang: 'en' | 'vi';
  featured?: boolean;
  tags?: string[];
}