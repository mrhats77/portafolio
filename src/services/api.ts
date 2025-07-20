const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// HTTP Methods
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

// Generic API request function
async function apiRequest<T>(
  endpoint: string,
  method: HttpMethod = 'GET',
  data?: any,
  token?: string
): Promise<ApiResponse<T>> {
  try {
    const config: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    };

    if (data && method !== 'GET') {
      config.body = JSON.stringify(data);
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'API request failed');
    }

    return {
      success: true,
      data: result.data || result,
      message: result.message,
    };
  } catch (error) {
    console.error('API Error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}

// Auth API calls
export const authApi = {
  login: async (email: string, password: string) => {
    return apiRequest<{ user: any; token: string }>('/auth/login', 'POST', {
      email,
      password,
    });
  },

  logout: async (token: string) => {
    return apiRequest('/auth/logout', 'POST', {}, token);
  },

  verifyToken: async (token: string) => {
    return apiRequest<{ user: any }>('/auth/verify', 'GET', undefined, token);
  },
};

// Personal Info API calls
export const personalInfoApi = {
  get: async () => {
    return apiRequest<any>('/personal-info');
  },

  update: async (data: any, token: string) => {
    return apiRequest<any>('/personal-info', 'PUT', data, token);
  },
};

// Projects API calls
export const projectsApi = {
  getAll: async () => {
    return apiRequest<any[]>('/projects');
  },

  create: async (data: any, token: string) => {
    return apiRequest<any>('/projects', 'POST', data, token);
  },

  update: async (id: string, data: any, token: string) => {
    return apiRequest<any>(`/projects/${id}`, 'PUT', data, token);
  },

  delete: async (id: string, token: string) => {
    return apiRequest('/projects/' + id, 'DELETE', undefined, token);
  },
};

// Skills API calls
export const skillsApi = {
  getAll: async () => {
    return apiRequest<{ frontend: any[]; backend: any[] }>('/skills');
  },

  update: async (data: { frontend: any[]; backend: any[] }, token: string) => {
    return apiRequest<any>('/skills', 'PUT', data, token);
  },
};

// Contact Info API calls
export const contactInfoApi = {
  get: async () => {
    return apiRequest<any>('/contact-info');
  },

  update: async (data: any, token: string) => {
    return apiRequest<any>('/contact-info', 'PUT', data, token);
  },
};

// Contact Form API calls
export const contactFormApi = {
  submit: async (data: { name: string; email: string; message: string }) => {
    return apiRequest('/contact/submit', 'POST', data);
  },
};