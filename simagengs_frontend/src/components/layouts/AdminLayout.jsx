import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Sidebar from '../common/Sidebar';

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const menuItems = [
    { path: '/dashboard', icon: '🏠', label: 'Dashboard' },
    { path: '/users', icon: '👥', label: 'Manage Users' },
    { path: '/internships', icon: '🎓', label: 'Internships' },
    { path: '/tasks', icon: '✅', label: 'All Tasks' },
    { path: '/bugs', icon: '🐛', label: 'Bug Reports' },
    { path: '/meetings', icon: '📅', label: 'Meetings' },
    { path: '/reports', icon: '📊', label: 'Reports' },
    { path: '/profile', icon: '👤', label: 'Profile' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50 to-emerald-50">
      <Sidebar 
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        menuItems={menuItems}
        onLogout={handleLogout}
        user={user}
      />

      {/* Main Content */}
      <main className={`transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-20'}`}>
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
