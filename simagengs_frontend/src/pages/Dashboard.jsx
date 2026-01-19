import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import DynamicLayout from '../components/layouts/index.jsx';

export default function Dashboard() {
  const { user } = useAuth();

  const stats = [
    { icon: '📝', label: 'Daily Logs', value: '0', color: 'from-blue-500 to-blue-600', link: '/daily-logs' },
    { icon: '✅', label: 'Tasks', value: '0', color: 'from-green-500 to-green-600', link: '/tasks' },
    { icon: '🐛', label: 'Bugs', value: '0', color: 'from-red-500 to-red-600', link: '/bugs' },
    { icon: '📅', label: 'Meetings', value: '0', color: 'from-purple-500 to-purple-600', link: '/meetings' },
  ];

  const quickActions = [
    { icon: '➕', label: 'Add Daily Log', color: 'from-blue-500 to-blue-600', link: '/daily-logs' },
    { icon: '📋', label: 'View Tasks', color: 'from-green-500 to-green-600', link: '/tasks' },
    { icon: '🐞', label: 'Report Bug', color: 'from-red-500 to-red-600', link: '/bugs' },
    { icon: '📝', label: 'Add Meeting', color: 'from-purple-500 to-purple-600', link: '/meetings' },
  ];

  return (
    <DynamicLayout>
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl p-8 mb-8 shadow-xl">
        <div className="flex items-center justify-between">
          <div className="text-white">
            <h2 className="text-3xl font-bold mb-2">Welcome back, {user?.name}! 👋</h2>
            <p className="text-primary-100">Here's what's happening with your internship today.</p>
          </div>
          <div className="hidden md:block text-6xl">🚀</div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <Link 
            key={index}
            to={stat.link}
            className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-3xl shadow-lg`}>
                {stat.icon}
              </div>
              <span className="text-3xl font-bold text-gray-800">{stat.value}</span>
            </div>
            <h3 className="text-gray-600 font-semibold">{stat.label}</h3>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl p-8 shadow-xl mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">⚡ Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <Link
              key={index}
              to={action.link}
              className={`bg-gradient-to-br ${action.color} text-white rounded-xl p-6 text-center hover:shadow-lg hover:-translate-y-1 transition-all`}
            >
              <div className="text-4xl mb-3">{action.icon}</div>
              <p className="font-semibold">{action.label}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Latest Logs */}
        <div className="bg-white rounded-2xl p-8 shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">📝 Latest Logs</h3>
            <Link to="/daily-logs" className="text-primary-600 hover:text-primary-700 font-semibold text-sm">
              View All →
            </Link>
          </div>
          <div className="space-y-4">
            <div className="text-center py-8 text-gray-500">
              <p>No logs yet. Start logging your activities!</p>
            </div>
          </div>
        </div>

        {/* Upcoming Tasks */}
        <div className="bg-white rounded-2xl p-8 shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">✅ Upcoming Tasks</h3>
            <Link to="/tasks" className="text-primary-600 hover:text-primary-700 font-semibold text-sm">
              View All →
            </Link>
          </div>
          <div className="space-y-4">
            <div className="text-center py-8 text-gray-500">
              <p>No tasks assigned yet.</p>
            </div>
          </div>
        </div>
      </div>
    </DynamicLayout>
  );
}

