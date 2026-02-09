import { Task } from '../../types/task';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';

// Create a base API client with JWT handling
class ApiClient {
  private async request(endpoint: string, options: RequestInit = {}) {
    const url = `${API_BASE_URL}${endpoint}`;

    // Get the Better Auth token if available
    // We'll retrieve it from cookies or storage where Better Auth stores it
    const token = this.getAuthToken();

    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
        ...options.headers,
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        // Handle unauthorized access - maybe redirect to login
        console.error('Unauthorized access - redirecting to login');
        // We might want to trigger a logout here
      }
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  private getAuthToken(): string | null {
    // Better Auth typically stores the token in cookies
    // This is a simplified approach - in a real app, you'd use Better Auth's session management
    if (typeof document !== 'undefined') {
      // Get token from cookies where Better Auth stores it
      const cookies = document.cookie.split(';');
      for (const cookie of cookies) {
        const [name, value] = cookie.trim().split('=');
        if (name === 'better-auth.session_token') {
          return value;
        }
      }
    }
    return null;
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