import { Navigate, Outlet } from 'react-router-dom';
import { useCurrentUser } from '@/hooks/redux';

export function AdminRoute() {
    const user = useCurrentUser();

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (!Boolean(user.isAdmin)) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
}
