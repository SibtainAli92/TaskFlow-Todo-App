'use client';

import { useState, useEffect } from 'react';
import { Task } from '../../types/task';
import { apiClient } from '../../lib/api/client';
import { useAuth } from '../../lib/auth/client';
import { ToastProvider, useToast } from '../../components/toast';
import { Button } from '../../components/ui/button';
import { StatsCard } from '../../components/tasks/StatsCard';
import { TaskCard } from '../../components/tasks/TaskCard';
import { TaskModal, TaskFormData } from '../../components/tasks/TaskModal';
import { Skeleton } from '../../components/ui/skeleton';
import { EmptyState } from '../../components/ui/state-handling';
import {
  CheckSquare,
  Clock,
  CheckCircle2,
  TrendingUp,
  Plus,
  Filter,
} from 'lucide-react';

// Inner component that uses the toast context
function DashboardContent() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'in_progress' | 'completed'>('all');
  const { data: session } = useAuth();
  const { showToast } = useToast();

  // Load tasks when component mounts
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const fetchedTasks = await apiClient.getTasks();
        setTasks(fetchedTasks);
      } catch (err) {
        showToast('Failed to load tasks. Please try again.', 'error');
        console.error('Error fetching tasks:', err);
      } finally {
        setLoading(false);
      }
    };

    if (session) {
      fetchTasks();
    }
  }, [session, showToast]);

  // Calculate statistics
  const stats = {
    total: tasks.length,
    completed: tasks.filter((t) => t.completed).length,
    pending: tasks.filter((t) => !t.completed && t.status !== 'in_progress').length,
    inProgress: tasks.filter((t) => t.status === 'in_progress').length,
    completionRate: tasks.length > 0 ? Math.round((tasks.filter((t) => t.completed).length / tasks.length) * 100) : 0,
  };

  const handleSaveTask = async (taskData: TaskFormData) => {
    try {
      if (editingTask) {
        // Update existing task
        const updatedTask = await apiClient.updateTask(editingTask.id, {
          ...taskData,
          completed: taskData.status === 'completed',
        });
        setTasks(tasks.map((task) => (task.id === editingTask.id ? updatedTask : task)));
        showToast('Task updated successfully!', 'success');
      } else {
        // Create new task
        const newTask = await apiClient.createTask({
          ...taskData,
          completed: taskData.status === 'completed',
        });
        setTasks([...tasks, newTask]);
        showToast('Task created successfully!', 'success');
      }
      setIsModalOpen(false);
      setEditingTask(null);
    } catch (err) {
      showToast(`Failed to ${editingTask ? 'update' : 'create'} task. Please try again.`, 'error');
      console.error('Error saving task:', err);
    }
  };

  const handleToggleComplete = async (taskId: string) => {
    const task = tasks.find((t) => t.id === taskId);
    if (!task) return;

    try {
      const updatedTask = await apiClient.updateTask(taskId, { completed: !task.completed });
      setTasks(tasks.map((t) => (t.id === taskId ? updatedTask : t)));
      showToast(`Task marked as ${!task.completed ? 'completed' : 'active'}!`, 'success');
    } catch (err) {
      showToast('Failed to update task. Please try again.', 'error');
      console.error('Error updating task:', err);
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    if (!confirm('Are you sure you want to delete this task?')) return;

    try {
      await apiClient.deleteTask(taskId);
      setTasks(tasks.filter((task) => task.id !== taskId));
      showToast('Task deleted successfully!', 'success');
    } catch (err) {
      showToast('Failed to delete task. Please try again.', 'error');
      console.error('Error deleting task:', err);
    }
  };

  const handleEditTask = (taskId: string) => {
    const task = tasks.find((t) => t.id === taskId);
    if (task) {
      setEditingTask(task);
      setIsModalOpen(true);
    }
  };

  // Filter tasks
  const filteredTasks = tasks.filter((task) => {
    if (filterStatus === 'all') return true;
    if (filterStatus === 'completed') return task.completed;
    if (filterStatus === 'pending') return !task.completed && task.status !== 'in_progress';
    if (filterStatus === 'in_progress') return task.status === 'in_progress';
    return true;
  });

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} height="120px" />
          ))}
        </div>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} height="100px" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-50">
            Dashboard
          </h1>
          <p className="mt-1 text-neutral-600 dark:text-neutral-400">
            Welcome back! Here's an overview of your tasks.
          </p>
        </div>
        <Button
          onClick={() => {
            setEditingTask(null);
            setIsModalOpen(true);
          }}
          variant="primary"
          size="lg"
        >
          <Plus className="h-5 w-5 mr-2" />
          New Task
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Tasks"
          value={stats.total}
          icon={CheckSquare}
          color="primary"
        />
        <StatsCard
          title="In Progress"
          value={stats.inProgress}
          icon={Clock}
          color="warning"
        />
        <StatsCard
          title="Completed"
          value={stats.completed}
          icon={CheckCircle2}
          color="success"
        />
        <StatsCard
          title="Completion Rate"
          value={`${stats.completionRate}%`}
          icon={TrendingUp}
          color="accent"
        />
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-neutral-200 dark:border-neutral-800">
        {[
          { key: 'all', label: 'All Tasks' },
          { key: 'pending', label: 'Pending' },
          { key: 'in_progress', label: 'In Progress' },
          { key: 'completed', label: 'Completed' },
        ].map((filter) => (
          <button
            key={filter.key}
            onClick={() => setFilterStatus(filter.key as any)}
            className={`
              px-4 py-2 text-sm font-medium transition-colors border-b-2 -mb-px
              ${
                filterStatus === filter.key
                  ? 'border-primary-600 text-primary-600 dark:text-primary-400'
                  : 'border-transparent text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200'
              }
            `}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Tasks List */}
      {filteredTasks.length === 0 ? (
        <EmptyState
          message={
            filterStatus === 'all'
              ? 'No tasks yet. Create your first task to get started!'
              : `No ${filterStatus.replace('_', ' ')} tasks found.`
          }
          action={{
            text: 'Create Task',
            onClick: () => setIsModalOpen(true),
          }}
        />
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filteredTasks.map((task) => (
            <TaskCard
              key={task.id}
              id={task.id}
              title={task.title}
              description={task.description}
              priority={(task.priority as 'low' | 'medium' | 'high') || 'medium'}
              status={task.completed ? 'completed' : (task.status as any) || 'pending'}
              dueDate={task.due_date}
              tags={task.tags || []}
              onToggleComplete={handleToggleComplete}
              onClick={handleEditTask}
              onMenuClick={handleDeleteTask}
            />
          ))}
        </div>
      )}

      {/* Task Modal */}
      <TaskModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingTask(null);
        }}
        onSave={handleSaveTask}
        task={
          editingTask
            ? {
                id: editingTask.id,
                title: editingTask.title,
                description: editingTask.description || '',
                priority: (editingTask.priority as 'low' | 'medium' | 'high') || 'medium',
                status: editingTask.completed ? 'completed' : (editingTask.status as any) || 'pending',
                dueDate: editingTask.due_date || '',
                tags: editingTask.tags || [],
              }
            : undefined
        }
        mode={editingTask ? 'edit' : 'create'}
      />
    </div>
  );
}

export default function DashboardPage() {
  return (
    <ToastProvider>
      <DashboardContent />
    </ToastProvider>
  );
}