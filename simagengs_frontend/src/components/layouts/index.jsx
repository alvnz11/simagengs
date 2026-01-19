import { useAuth } from '../../contexts/AuthContext';
import InternLayout from './InternLayout';
import AdminLayout from './AdminLayout';
import SupervisorLayout from './SupervisorLayout';

export default function DynamicLayout({ children }) {
  const { user } = useAuth();

  // Determine which layout to use based on user role
  switch (user?.role) {
    case 'admin':
      return <AdminLayout>{children}</AdminLayout>;
    case 'supervisor':
      return <SupervisorLayout>{children}</SupervisorLayout>;
    case 'intern':
    default:
      return <InternLayout>{children}</InternLayout>;
  }
}

// Export individual layouts for direct use if needed
export { InternLayout, AdminLayout, SupervisorLayout };
