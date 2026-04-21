import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { cn } from '@/utils';

const tabs = [
    { label: 'Orders', path: '/reports/orders' },
    { label: 'Customers', path: '/reports/customers' },
    { label: 'Revenue', path: '/reports/revenue' },
    { label: 'Products', path: '/reports/products' },
];

const AdminReports = () => {
    const location = useLocation();

    return (
        <div className="space-y-5">
            <div>
                <h1 className="text-xl font-bold text-gray-900">Reports</h1>
                <p className="text-sm text-gray-500 mt-0.5">Analytics and insights across your store</p>
            </div>

            <div className="flex justify-center overflow-x-auto">
                <div className="flex bg-gray-100 p-1 rounded-lg gap-1 min-w-max">
                    {tabs.map(tab => (
                        <NavLink
                            key={tab.path}
                            to={tab.path}
                            className={cn(
                                'px-4 py-1.5 text-sm rounded-md font-medium transition-colors',
                                location.pathname === tab.path
                                    ? 'bg-orange-500 text-white shadow-sm'
                                    : 'text-gray-600 hover:text-gray-900'
                            )}
                        >
                            {tab.label}
                        </NavLink>
                    ))}
                </div>
            </div>

            <Outlet />
        </div>
    );
};

export default AdminReports;
