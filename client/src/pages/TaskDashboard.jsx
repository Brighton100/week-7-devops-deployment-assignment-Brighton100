import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';

const TaskDashboard = () => {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Task Management Dashboard
        </h1>
        <p className="text-gray-600">
          Create, manage, and track your tasks efficiently
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <TaskForm />
        </div>
        
        <div className="lg:col-span-2">
          <TaskList />
        </div>
      </div>
    </div>
  );
};

export default TaskDashboard;