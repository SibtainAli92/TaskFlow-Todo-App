import { Task } from '../../types/task';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://sibtain22-todo-app.hf.space';

// Create a base API client with JWT handling
class ApiClient {
  private token: string | null = null;

  // Set the auth token (called from AuthContext)
  setAuthToken(token: string | null) {
    this.token = token;
  }

  private async request(endpoint: string, options: RequestInit = {}) {
    const url = `${API_BASE_URL}${endpoint}`;

    const response = await fetch(url, {
      ...options,
      credentials: 'include', // Send cookies with request
      headers: {
        'Content-Type': 'application/json',
        ...(this.token && { 'Authorization': `Bearer ${this.token}` }),
        ...options.headers,
      },
    });

    if (!response.ok) {
      // Try to parse error response
      let errorMessage = `API request failed: ${response.status} ${response.statusText}`;

      try {
        const errorData = await response.json();

        // Handle FastAPI validation errors: {detail: [{type, loc, msg, input}]}
        if (errorData.detail) {
          if (Array.isArray(errorData.detail)) {
            // Extract readable messages from validation errors
            errorMessage = errorData.detail
              .map((err: any) => err.msg || JSON.stringify(err))
              .join(', ');
          } else if (typeof errorData.detail === 'string') {
            errorMessage = errorData.detail;
          } else {
            errorMessage = JSON.stringify(errorData.detail);
          }
        } else if (errorData.message) {
          errorMessage = errorData.message;
        }
      } catch (e) {
        // If JSON parsing fails, use default error message
        console.error('Failed to parse error response:', e);
      }

      if (response.status === 401) {
        // Handle unauthorized access - redirect to login
        console.error('Unauthorized access - redirecting to login');
        if (typeof window !== 'undefined') {
          window.location.href = '/auth/login';
        }
      }

      throw new Error(errorMessage);
    }

    return response.json();
  }

  // Task-related methods
  async getTasks(): Promise<Task[]> {
    return this.request('/api/tasks');
  }

  async createTask(taskData: Omit<Task, 'id' | 'created_at' | 'updated_at' | 'owner_id'>): Promise<Task> {
    return this.request('/api/tasks', {
      method: 'POST',
      body: JSON.stringify(taskData),
    });
  }

  async updateTask(taskId: string, taskData: Partial<Task>): Promise<Task> {
    return this.request(`/api/tasks/${taskId}`, {
      method: 'PUT',
      body: JSON.stringify(taskData),
    });
  }

  async deleteTask(taskId: string): Promise<void> {
    await this.request(`/api/tasks/${taskId}`, {
      method: 'DELETE',
    });
  }

  async toggleTaskCompletion(taskId: string): Promise<Task> {
    return this.request(`/api/tasks/${taskId}/toggle`, {
      method: 'PATCH',
    });
  }
}

export const apiClient = new ApiClient();