import { Link, useLocation } from 'react-router-dom';
import { CheckSquare, Activity } from 'lucide-react';

const Header = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center space-x-2 text-xl font-bold text-gray-900">
              <CheckSquare className="w-6 h-6 text-blue-600" />
              <span>MERN Tasks</span>
            </Link>
            
            <nav className="hidden md:flex space-x-6">
              <Link
                to="/"
                className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/') 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <CheckSquare className="w-4 h-4" />
                <span>Tasks</span>
              </Link>
              
              <Link
                to="/health"
                className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/health') 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <Activity className="w-4 h-4" />
                <span>Health</span>
              </Link>
            </nav>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-600">
              {process.env.NODE_ENV === 'development' && (
                <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">
                  DEV
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;