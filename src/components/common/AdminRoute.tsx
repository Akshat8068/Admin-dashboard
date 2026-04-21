import { Navigate, Outlet } from 'react-router-dom';
import { useCurrentUser } from '@/hooks/redux';
import { UserRole } from '@/types';

export function AdminRoute() {
    const user = useCurrentUser();

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (user.role !== UserRole.ADMIN) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
}
