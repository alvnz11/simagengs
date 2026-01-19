import { useState, useEffect } from 'react';
import DynamicLayout from '../components/layouts/index.jsx';
import api from '../services/api';

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await api.get('/tasks');
      setTasks(response.data.data || []);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-700 border-green-200';
      case 'in-progress': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'pending': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700';
      case 'medium': return 'bg-orange-100 text-orange-700';
      case 'low': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <DynamicLayout>
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900">My Tasks</h2>
        <p className="text-gray-600 mt-1">Tasks assigned by your supervisor</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl p-6 shadow-lg">
          <div className="text-3xl mb-2">📋</div>
          <div className="text-3xl font-bold">{tasks.length}</div>
          <div className="text-blue-100">Total Tasks</div>
        </div>
        <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white rounded-2xl p-6 shadow-lg">
          <div className="text-3xl mb-2">⏳</div>
          <div className="text-3xl font-bold">{tasks.filter(t => t.status === 'pending').length}</div>
          <div className="text-yellow-100">Pending</div>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-2xl p-6 shadow-lg">
          <div className="text-3xl mb-2">🔄</div>
          <div className="text-3xl font-bold">{tasks.filter(t => t.status === 'in-progress').length}</div>
          <div className="text-purple-100">In Progress</div>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-2xl p-6 shadow-lg">
          <div className="text-3xl mb-2">✓</div>
          <div className="text-3xl font-bold">{tasks.filter(t => t.status === 'completed').length}</div>
          <div className="text-green-100">Completed</div>
        </div>
      </div>

      {/* Tasks List */}
      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary-500 border-t-transparent"></div>
        </div>
      ) : tasks.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center shadow-xl">
          <div className="text-6xl mb-4">◈</div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">No tasks yet</h3>
          <p className="text-gray-600">Your supervisor hasn't assigned any tasks yet</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {tasks.map((task) => (
            <div key={task.id} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all border-l-4 border-primary-500">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold text-gray-900">{task.title}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getPriorityColor(task.priority)}`}>
                      {task.priority?.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-3">{task.description}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>📅 Due: {new Date(task.due_date).toLocaleDateString('id-ID')}</span>
                    <span>👤 Assigned by: {task.supervisor_name || 'Supervisor'}</span>
                  </div>
                </div>
                <span className={`px-4 py-2 rounded-xl text-sm font-semibold border-2 ${getStatusColor(task.status)}`}>
                  {task.status === 'completed' && '✓ '}
                  {task.status === 'in-progress' && '🔄 '}
                  {task.status === 'pending' && '⏳ '}
                  {task.status?.replace('-', ' ').toUpperCase()}
                </span>
              </div>
              
              {task.notes && (
                <div className="mt-4 p-4 bg-gray-50 rounded-xl">
                  <p className="text-sm text-gray-700"><span className="font-semibold">Notes:</span> {task.notes}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </DynamicLayout>
  );
}
