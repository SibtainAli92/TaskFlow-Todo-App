export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  status?: 'pending' | 'in_progress' | 'completed';
  priority?: 'low' | 'medium' | 'high';
  due_date?: string;
  tags?: string[];
  owner_id: string;
  created_at: string;
  updated_at: string;
}