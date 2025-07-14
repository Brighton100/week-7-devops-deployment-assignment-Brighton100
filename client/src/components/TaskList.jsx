import { useState } from 'react';
import { useTasks, useDeleteTask, useUpdateTask } from '../hooks/useTasks';
import { Trash2, Edit, CheckCircle, Circle, Calendar, Tag } from 'lucide-react';
import LoadingSpinner from './LoadingSpinner';

const TaskList = () => {
  const [filters, setFilters] = useState({
    completed: undefined,
    priority: '',
    page: 1,
    limit: 10
  });

  const { data: tasksData, isLoading, error } = useTasks(filters);
  const deleteTaskMutation = useDeleteTask();
  const updateTaskMutation = useUpdateTask();

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
      page: 1 // Reset to first page when filtering
    }));
  };

  const handleToggleComplete = (task) => {
    updateTaskMutation.mutate({
      id: task._id,
      data: { completed: !task.completed }
    });
  };

  const handleDeleteTask = (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      deleteTaskMutation.mutate(taskId);
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return null;
    return new Date(dateString).toLocaleDateString();
  };

  if (isLoading) return <LoadingSpinner />;

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600">Error loading tasks: {error.message}</p>
      </div>
    );
  }

  const tasks = tasksData?.data || [];
  const pagination = tasksData?.pagination || {};

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Filters</h3>
        <div className="flex flex-wrap gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              value={filters.completed === undefined ? '' : filters.completed}
              onChange={(e) => handleFilterChange('completed', 
                e.target.value === '' ? undefined : e.target.value === 'true'
              )}
              className="border border-gray-300 rounded-md px-3 py-2"
            >
              <option value="">All</option>
              <option value="false">Pending</option>
              <option value="true">Completed</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Priority
            </label>
            <select
              value={filters.priority}
              onChange={(e) => handleFilterChange('priority', e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2"
            >
              <option value="">All</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>
      </div>

      {/* Task List */}
      <div className="space-y-4">
        {tasks.length === 0 ? (
          <div className="text-center py-8 bg-white rounded-lg shadow">
            <p className="text-gray-500">No tasks found</p>
          </div>
        ) : (
          tasks.map(task => (
            <div
              key={task._id}
              className={`bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow ${
                task.completed ? 'opacity-75' : ''
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3 flex-1">
                  <button
                    onClick={() => handleToggleComplete(task)}
                    className="mt-1 text-blue-600 hover:text-blue-800"
                    disabled={updateTaskMutation.isLoading}
                  >
                    {task.completed ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      <Circle className="w-5 h-5" />
                    )}
                  </button>
                  
                  <div className="flex-1">
                    <h4 className={`font-medium ${
                      task.completed ? 'line-through text-gray-500' : 'text-gray-900'
                    }`}>
                      {task.title}
                    </h4>
                    
                    {task.description && (
                      <p className="text-gray-600 mt-1">{task.description}</p>
                    )}
                    
                    <div className="flex items-center space-x-4 mt-2">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        getPriorityColor(task.priority)
                      }`}>
                        <Tag className="w-3 h-3 mr-1" />
                        {task.priority}
                      </span>
                      
                      {task.dueDate && (
                        <span className="inline-flex items-center text-xs text-gray-500">
                          <Calendar className="w-3 h-3 mr-1" />
                          {formatDate(task.dueDate)}
                        </span>
                      )}
                    </div>
                    
                    {task.tags && task.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {task.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => {/* TODO: Implement edit */}}
                    className="text-gray-400 hover:text-blue-600"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  
                  <button
                    onClick={() => handleDeleteTask(task._id)}
                    className="text-gray-400 hover:text-red-600"
                    disabled={deleteTaskMutation.isLoading}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      {pagination.pages > 1 && (
        <div className="flex justify-center space-x-2">
          {Array.from({ length: pagination.pages }, (_, i) => i + 1).map(page => (
            <button
              key={page}
              onClick={() => handleFilterChange('page', page)}
              className={`px-3 py-2 rounded ${
                pagination.page === page
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              {page}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;