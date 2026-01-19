import { Link, useLocation } from 'react-router-dom';

export default function Sidebar({ sidebarOpen, setSidebarOpen, menuItems, onLogout, user }) {
  const location = useLocation();

  return (
    <aside className="fixed top-6 left-6 bottom-6 w-64 bg-white/90 backdrop-blur-md text-gray-700 z-50 rounded-2xl shadow-2xl border border-gray-200">
      {/* Navigation Menu */}
      <nav className="p-4 h-full flex flex-col">
        <div className="flex-1 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  isActive 
                    ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg' 
                    : 'text-gray-600 hover:bg-gray-100 hover:text-primary-600'
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                <span className="font-medium text-sm">{item.label}</span>
              </Link>
            );
          })}
        </div>

        {/* User Info & Logout */}
        <div className="pt-4 border-t border-gray-200 space-y-2">
          <div className="px-4 py-2 text-xs text-gray-500">
            <div className="font-semibold text-gray-700 truncate">{user?.name}</div>
            <div className="capitalize text-gray-500">{user?.role}</div>
          </div>
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-red-50 hover:text-red-600 transition-all"
          >
            <span className="text-xl">⎋</span>
            <span className="font-medium text-sm">Logout</span>
          </button>
        </div>
      </nav>
    </aside>
  );
}
