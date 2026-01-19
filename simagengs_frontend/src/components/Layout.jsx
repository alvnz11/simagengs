import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const menuItems = [
    { path: '/dashboard', icon: '🏠', label: 'Dashboard', role: 'all' },
    { path: '/daily-logs', icon: '📝', label: 'Daily Logs', role: 'intern' },
    { path: '/tasks', icon: '✅', label: 'My Tasks', role: 'intern' },
    { path: '/bugs', icon: '🐛', label: 'Bug Reports', role: 'intern' },
    { path: '/meetings', icon: '📅', label: 'Meetings', role: 'intern' },
    { path: '/internships', icon: '🎓', label: 'Internships', role: 'admin' },
    { path: '/profile', icon: '👤', label: 'Profile', role: 'all' },
  ];

  const filteredMenu = menuItems.filter(item => 
    item.role === 'all' || user?.role === item.role
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50 to-emerald-50">
      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 h-full bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white transition-all duration-300 z-50 ${sidebarOpen ? 'w-64' : 'w-20'} shadow-2xl`}>
        {/* Logo Section */}
        <div className="p-6 border-b border-gray-700 flex items-center justify-between">
          {sidebarOpen ? (
            <div className="flex items-center gap-3">
              <span className="text-3xl">📚</span>
              <span className="text-xl font-bold bg-gradient-to-r from-primary-400 to-primary-500 bg-clip-text text-transparent">
                SIMAGENGS
              </span>
            </div>
          ) : (
            <span className="text-3xl">📚</span>
          )}
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
          >
            {sidebarOpen ? '◀' : '▶'}
          </button>
        </div>

        {/* User Info */}
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-xl font-bold">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            {sidebarOpen && (
              <div className="flex-1 min-w-0">
                <p className="font-semibold truncate">{user?.name}</p>
                <p className="text-xs text-gray-400 truncate">{user?.email}</p>
                <span className="inline-block mt-1 px-2 py-0.5 bg-primary-500/20 text-primary-400 text-xs rounded-full">
                  {user?.role || 'user'}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="p-4 flex-1 overflow-y-auto">
          <ul className="space-y-2">
            {filteredMenu.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all group ${
                      isActive 
                        ? 'bg-gradient-to-r from-primary-500 to-primary-600 shadow-lg shadow-primary-500/50' 
                        : 'hover:bg-gray-800'
                    }`}
                  >
                    <span className="text-2xl">{item.icon}</span>
                    {sidebarOpen && (
                      <span className="font-medium">{item.label}</span>
                    )}
                    {isActive && sidebarOpen && (
                      <span className="ml-auto w-2 h-2 bg-white rounded-full"></span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-gray-700">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-4 px-4 py-3 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-all group"
          >
            <span className="text-2xl">🚪</span>
            {sidebarOpen && <span className="font-medium">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-20'}`}>
        {/* Top Bar */}
        <div className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-40">
          <div className="px-8 py-4 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {filteredMenu.find(item => item.path === location.pathname)?.label || 'Dashboard'}
              </h1>
              <p className="text-sm text-gray-500">Welcome back, {user?.name}!</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-700">{new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
