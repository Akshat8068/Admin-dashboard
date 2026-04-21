import { useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Menu, Search, MessageSquare, Bell, ChevronDown, User, Settings, LogOut } from 'lucide-react';
import { EnhancedSidebar } from '@/components/common/EnhancedSidebar';
import { useCurrentUser } from '@/hooks/redux';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/UI/dropdown-menu';
import { useDispatch } from 'react-redux';
import { logout } from '@/store/slices/authSlice';

const routeTitles: Record<string, string> = {
    '/dashboard': 'Dashboard',
    '/products': 'Products',
    '/add': 'Add Product',
    '/orders': 'Orders',
    '/customers': 'Customers',
    '/reports': 'Reports',
    '/reports/orders': 'Order Report',
    '/reports/customers': 'Customer Report',
    '/reports/revenue': 'Revenue Report',
    '/reports/products': 'Product Report',
    '/discounts': 'Discounts',
    '/integrations': 'Integrations',
    '/help': 'Help',
    '/settings': 'Settings',
};

const DashBoardLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const user = useCurrentUser();
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const pageTitle = routeTitles[location.pathname] ?? 'Dashboard';
    const initials = user?.name ? user.name.charAt(0).toUpperCase() : 'A';

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-gray-50 flex">
            <EnhancedSidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />

            <div
                className={`flex-1 flex flex-col transition-all duration-300 ${sidebarOpen ? 'lg:ml-52' : 'lg:ml-16'
                    }`}
            >
                {/* Header */}
                <header className="h-16 bg-white border-b border-gray-200 flex items-center w-full px-4 gap-4 sticky top-0 z-10">
                    {/* Mobile burger */}
                    <button
                        className="lg:hidden p-2 rounded-md text-gray-500 hover:bg-gray-100"
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                    >
                        <Menu className="h-5 w-5" />
                    </button>

                    {/* Page title */}
                    <h1 className="text-xl font-bold text-gray-900">{pageTitle}</h1>

                    {/* Search */}
                    <div className="flex-1 max-w-md ml-4 hidden sm:flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-2">
                        <Search className="h-4 w-4 text-gray-400 shrink-0" />
                        <input
                            type="text"
                            placeholder="Search stock, order, etc"
                            className="bg-transparent text-sm text-gray-600 placeholder-gray-400 outline-none w-full"
                        />
                    </div>

                    <div className="ml-auto flex items-center gap-3">
                        {/* Chat */}
                        <button className="p-2 rounded-full text-gray-500 hover:bg-gray-100 relative">
                            <MessageSquare className="h-5 w-5" />
                        </button>

                        {/* Notifications */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <button className="p-2 rounded-full text-gray-500 hover:bg-gray-100 relative outline-none">
                                    <Bell className="h-5 w-5" />
                                    <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-orange-500" />
                                </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-80">
                                <DropdownMenuLabel className="pb-2">
                                    <p className="text-sm font-semibold text-gray-900">Notifications</p>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <div className="max-h-[300px] overflow-y-auto">
                                    <DropdownMenuItem className="flex flex-col items-start gap-1 py-3 cursor-pointer hover:bg-orange-50">
                                        <p className="text-sm font-medium text-gray-900">New order received</p>
                                        <p className="text-xs text-gray-500">Order #12345 from John Doe</p>
                                        <p className="text-xs text-gray-400">2 minutes ago</p>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="flex flex-col items-start gap-1 py-3 cursor-pointer hover:bg-orange-50">
                                        <p className="text-sm font-medium text-gray-900">Low stock alert</p>
                                        <p className="text-xs text-gray-500">Product "Widget A" has only 5 items left</p>
                                        <p className="text-xs text-gray-400">1 hour ago</p>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="flex flex-col items-start gap-1 py-3 cursor-pointer hover:bg-orange-50">
                                        <p className="text-sm font-medium text-gray-900">Payment received</p>
                                        <p className="text-xs text-gray-500">$250.00 from Order #12340</p>
                                        <p className="text-xs text-gray-400">3 hours ago</p>
                                    </DropdownMenuItem>
                                </div>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="justify-center text-primary font-medium cursor-pointer hover:bg-orange-50">
                                    View All
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        {/* User */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <button className="flex items-center gap-2 pl-3 border-l border-gray-200 outline-none">
                                    <div className="h-8 w-8 rounded-full bg-orange-500 flex items-center justify-center text-white font-semibold text-sm">
                                        {initials}
                                    </div>
                                    <div className="hidden sm:block text-left">
                                        <p className="text-sm font-medium text-gray-900 leading-none">{user?.name ?? 'Admin'}</p>
                                        <p className="text-xs text-gray-500 mt-0.5">Admin</p>
                                    </div>
                                    <ChevronDown className="h-4 w-4 text-gray-400" />
                                </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-52">
                                <DropdownMenuLabel className="pb-2">
                                    <p className="text-sm font-semibold text-gray-900">{user?.name ?? 'Admin User'}</p>
                                    <p className="text-xs text-gray-400 font-normal mt-0.5">{user?.email ?? 'admin@example.com'}</p>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="gap-2 cursor-pointer hover:bg-orange-50 hover:text-orange-600" onClick={() => navigate('/settings')}>
                                    <User className="h-4 w-4" />
                                    Profile
                                </DropdownMenuItem>
                                <DropdownMenuItem className="gap-2 cursor-pointer hover:bg-orange-50 hover:text-orange-600" onClick={() => navigate('/settings')}>
                                    <Settings className="h-4 w-4" />
                                    Settings
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="gap-2 cursor-pointer text-red-500 hover:bg-red-50 hover:text-red-600" onClick={handleLogout}>
                                    <LogOut className="h-4 w-4" />
                                    Log out
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </header>

                {/* Page content */}
                <main className="flex-1 p-2">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default DashBoardLayout;
