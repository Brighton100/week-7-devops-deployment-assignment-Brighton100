import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { taskAPI } from '../services/api';
import toast from 'react-hot-toast';

export const useTasks = (filters = {}) => {
  return useQuery({
    queryKey: ['tasks', filters],
    queryFn: () => taskAPI.getAll(filters),
    select: (data) => data.data,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export const useTask = (id) => {
  return useQuery({
    queryKey: ['task', id],
    queryFn: () => taskAPI.getById(id),
    select: (data) => data.data,
    enabled: !!id,
  });
};

export const useCreateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: taskAPI.create,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      toast.success(data.data.message || 'Task created successfully!');
    },
    onError: (error) => {
      const message = error.response?.data?.message || 'Failed to create task';
      toast.error(message);
    },
  });
};

export const useUpdateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => taskAPI.update(id, data),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      queryClient.invalidateQueries({ queryKey: ['task', variables.id] });
      toast.success(data.data.message || 'Task updated successfully!');
    },
    onError: (error) => {
      const message = error.response?.data?.message || 'Failed to update task';
      toast.error(message);
    },
  });
};

export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: taskAPI.delete,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      toast.success(data.data.message || 'Task deleted successfully!');
    },
    onError: (error) => {
      const message = error.response?.data?.message || 'Failed to delete task';
      toast.error(message);
    },
  });
};