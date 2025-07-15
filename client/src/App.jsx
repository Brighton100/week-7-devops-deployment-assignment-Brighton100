import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './tailwind.css';

function App() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [appStatus, setAppStatus] = useState(null);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    membershipType: 'Basic'
  });

  // API base URL - works both locally and in production
  const API_BASE = window.location.hostname === 'localhost' 
    ? 'http://localhost:3000/api' 
    : '/api';

  // Check app health
  useEffect(() => {
    checkAppHealth();
  }, []);

  const checkAppHealth = async () => {
    try {
      const response = await axios.get(`${API_BASE}/health`);
      setAppStatus(response.data);
    } catch (error) {
      console.error('Health check failed:', error);
      setAppStatus({ status: 'ERROR', message: 'Unable to connect to server' });
    }
  };

  // Fetch members
  const fetchMembers = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE}/members`);
      setMembers(response.data.data || []);
      setError('');
    } catch (error) {
      setError('Failed to fetch members: ' + (error.response?.data?.message || error.message));
      console.error('Error fetching members:', error);
    } finally {
      setLoading(false);
    }
  };

  // Add member
  const addMember = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE}/members`, formData);
      setMembers([response.data.data, ...members]);
      setFormData({ name: '', email: '', membershipType: 'Basic' });
      setShowAddForm(false);
      setError('');
    } catch (error) {
      setError('Failed to add member: ' + (error.response?.data?.message || error.message));
    }
  };

  // Delete member
  const deleteMember = async (id) => {
    if (!window.confirm('Are you sure you want to delete this member?')) return;
    
    try {
      await axios.delete(`${API_BASE}/members/${id}`);
      setMembers(members.filter(member => member._id !== id));
      setError('');
    } catch (error) {
      setError('Failed to delete member: ' + (error.response?.data?.message || error.message));
    }
  };

  // Load members on component mount
  useEffect(() => {
    fetchMembers();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-blue-600 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold">🏋️‍♂️ Brighton Gym Management</h1>
          <p className="text-blue-100 mt-2">Member Management System</p>
          
          {/* App Status */}
          {appStatus && (
            <div className={`mt-3 p-2 rounded text-sm ${
              appStatus.status === 'OK' 
                ? 'bg-green-500 text-white' 
                : 'bg-red-500 text-white'
            }`}>
              Status: {appStatus.status} - {appStatus.message}
              {appStatus.database && ` | Database: ${appStatus.database}`}
            </div>
          )}
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
            <button 
              onClick={() => setError('')}
              className="float-right font-bold text-red-500 hover:text-red-700"
            >
              ×
            </button>
          </div>
        )}

        {/* Add Member Button */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            Gym Members ({members.length})
          </h2>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            {showAddForm ? 'Cancel' : 'Add New Member'}
          </button>
        </div>

        {/* Add Member Form */}
        {showAddForm && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h3 className="text-xl font-semibold mb-4">Add New Member</h3>
            <form onSubmit={addMember} className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter member name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter email address"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Membership Type *
                </label>
                <select
                  value={formData.membershipType}
                  onChange={(e) => setFormData({...formData, membershipType: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="Basic">Basic</option>
                  <option value="Premium">Premium</option>
                  <option value="VIP">VIP</option>
                </select>
              </div>
              <div className="md:col-span-3">
                <button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-colors"
                >
                  Add Member
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Members List */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-2 text-gray-600">Loading members...</p>
          </div>
        ) : members.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No members found. Add the first member to get started!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {members.map((member) => (
              <div key={member._id} className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold text-gray-800">{member.name}</h3>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    member.membershipType === 'VIP' ? 'bg-purple-100 text-purple-800' :
                    member.membershipType === 'Premium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {member.membershipType}
                  </span>
                </div>
                
                <div className="space-y-2 text-gray-600">
                  <p><strong>Email:</strong> {member.email}</p>
                  <p><strong>Joined:</strong> {new Date(member.joinDate).toLocaleDateString()}</p>
                  <p>
                    <strong>Status:</strong> 
                    <span className={`ml-2 px-2 py-1 rounded text-sm ${
                      member.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {member.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </p>
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <button
                    onClick={() => deleteMember(member._id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition-colors"
                  >
                    Delete Member
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Refresh Button */}
        <div className="text-center mt-8">
          <button
            onClick={fetchMembers}
            className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Refresh Members
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center py-4 mt-12">
        <p>&copy; 2025 Brighton Gym Management System. Built with MERN Stack.</p>
      </footer>
    </div>
  );
}

export default App;
