// API Client for backend communication
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export class ApiClient {
  private static baseUrl = API_BASE_URL;

  private static async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      console.log(`API Request: ${options.method || 'GET'} ${url}`);
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error(`API Error ${response.status}:`, errorText);
        let errorData;
        try {
          errorData = JSON.parse(errorText);
        } catch {
          errorData = { error: errorText || `HTTP error! status: ${response.status}` };
        }
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error(`API Error for ${endpoint}:`, error);
      throw error;
    }
  }

  // Blog API methods
  static async getBlogs(params?: {
    status?: string;
    lang?: string;
    featured?: boolean;
    limit?: number;
    offset?: number;
  }) {
    const searchParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.append(key, String(value));
        }
      });
    }
    
    const query = searchParams.toString();
    return this.request(`/api/blogs${query ? `?${query}` : ''}`);
  }

  static async getBlog(id: string) {
    return this.request(`/api/blogs/${id}`);
  }

  static async getBlogBySlug(slug: string) {
    return this.request(`/api/blogs/${slug}`);
  }

  static async createBlog(data: any) {
    return this.request('/api/blogs', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  static async updateBlog(id: string, data: any) {
    return this.request(`/api/blogs/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  static async deleteBlog(id: string) {
    return this.request(`/api/blogs/${id}`, {
      method: 'DELETE',
    });
  }

  static async searchBlogs(query: string, lang?: string) {
    const searchParams = new URLSearchParams({ q: query });
    if (lang) searchParams.append('lang', lang);
    return this.request(`/api/blogs/search?${searchParams.toString()}`);
  }

  // Contact API methods
  static async getContacts(params?: {
    status?: string;
    limit?: number;
    offset?: number;
  }) {
    const searchParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.append(key, String(value));
        }
      });
    }
    
    const query = searchParams.toString();
    return this.request(`/api/contacts${query ? `?${query}` : ''}`);
  }

  static async createContact(data: any) {
    return this.request('/api/contacts', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  static async getContact(id: string) {
    return this.request(`/api/contacts/${id}`);
  }

  static async updateContact(id: string, data: any) {
    return this.request(`/api/contacts/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  static async deleteContact(id: string) {
    return this.request(`/api/contacts/${id}`, {
      method: 'DELETE',
    });
  }

  // Language API methods
  static async getLanguages() {
    return this.request('/api/languages');
  }

  static async createLanguage(data: any) {
    return this.request('/api/languages', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  static async updateLanguage(id: string, data: any) {
    return this.request(`/api/languages/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  static async deleteLanguage(id: string) {
    return this.request(`/api/languages/${id}`, {
      method: 'DELETE',
    });
  }

  // Translation API methods
  static async getTranslations(params?: {
    lang?: string;
    category?: string;
    limit?: number;
    offset?: number;
  }) {
    const searchParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.append(key, String(value));
        }
      });
    }
    
    const query = searchParams.toString();
    return this.request(`/api/translations${query ? `?${query}` : ''}`);
  }

  static async createTranslation(data: any) {
    return this.request('/api/translations', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  static async updateTranslation(id: string, data: any) {
    return this.request(`/api/translations/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  static async deleteTranslation(id: string) {
    return this.request(`/api/translations/${id}`, {
      method: 'DELETE',
    });
  }

  static async bulkImportTranslations(data: any[]) {
    return this.request('/api/translations/bulk', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }
}

export default ApiClient;
