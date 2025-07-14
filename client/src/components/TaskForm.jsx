import { useForm } from 'react-hook-form';
import { useCreateTask } from '../hooks/useTasks';
import { Plus } from 'lucide-react';

const TaskForm = () => {
  const createTaskMutation = useCreateTask();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    defaultValues: {
      title: '',
      description: '',
      priority: 'medium',
      dueDate: '',
      tags: ''
    }
  });

  const onSubmit = (data) => {
    // Convert tags string to array
    const formattedData = {
      ...data,
      tags: data.tags ? data.tags.split(',').map(tag => tag.trim()).filter(Boolean) : [],
      dueDate: data.dueDate || undefined
    };
    
    createTaskMutation.mutate(formattedData, {
      onSuccess: () => {
        reset();
      }
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        <Plus className="w-5 h-5 mr-2" />
        Create New Task
      </h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Title *
          </label>
          <input
            type="text"
            id="title"
            {...register('title', { 
              required: 'Title is required',
              maxLength: { value: 100, message: 'Title cannot exceed 100 characters' }
            })}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.title ? 'border-red-300' : 'border-gray-300'
            }`}
            placeholder="Enter task title"
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            id="description"
            rows={3}
            {...register('description', {
              maxLength: { value: 500, message: 'Description cannot exceed 500 characters' }
            })}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.description ? 'border-red-300' : 'border-gray-300'
            }`}
            placeholder="Enter task description"
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">
              Priority
            </label>
            <select
              id="priority"
              {...register('priority')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div>
            <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 mb-1">
              Due Date
            </label>
            <input
              type="date"
              id="dueDate"
              {...register('dueDate')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div>
          <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1">
            Tags
          </label>
          <input
            type="text"
            id="tags"
            {...register('tags')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter tags separated by commas"
          />
          <p className="mt-1 text-sm text-gray-500">
            Separate multiple tags with commas (e.g., "work, urgent, project")
          </p>
        </div>

        <button
          type="submit"
          disabled={createTaskMutation.isLoading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {createTaskMutation.isLoading ? 'Creating...' : 'Create Task'}
        </button>
      </form>
    </div>
  );
};

export default TaskForm;