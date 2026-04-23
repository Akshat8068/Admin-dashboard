import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
    LayoutDashboard,
    ShoppingCart,
    Package,
    Users,
    BarChart2,
    HelpCircle,
    Settings,
    ChevronDown,
    ChevronUp,
    ListOrdered,
    PlusSquare,
} from 'lucide-react';

import { cn } from '@/utils';

interface SidebarProps {
    isOpen: boolean;
    onToggle: () => void;
}

interface NavItem {
    name: string;
    href?: string;
    icon?: React.ComponentType<{ className?: string }>;
    children?: NavItem[];
    separator?: boolean;
}

const navigation: NavItem[] = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Orders', href: '/orders', icon: ShoppingCart },
    {
        name: 'Products',
        icon: Package,
        children: [
            { name: 'List Products', href: '/products', icon: ListOrdered },
            { name: 'Add Product', href: '/add', icon: PlusSquare },
            { name: 'Dummy Products', href: '/dummy-products', icon: Package },
        ],
    },
    { name: 'Customers', href: '/customers', icon: Users },
    {
        name: 'Reports',
        icon: BarChart2,
        children: [
            { name: 'Order Report', href: '/reports/orders', icon: ShoppingCart },
            { name: 'Customer Report', href: '/reports/customers', icon: Users },
            { name: 'Product Report', href: '/reports/products', icon: Package },
        ],
    },
    { name: 'sep', separator: true, icon: undefined as unknown as React.ComponentType<{ className?: string }> },
    { name: 'Help', href: '/help', icon: HelpCircle },
    { name: 'Settings', href: '/settings', icon: Settings },
];

interface NavItemComponentProps {
    item: NavItem;
    isOpen: boolean;
    level?: number;
}

function NavItemComponent({ item, isOpen, level = 0 }: NavItemComponentProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const location = useLocation();

    const hasChildren = item.children && item.children.length > 0;
    const hasActiveChild = item.children?.some(
        (child) => child.href && location.pathname === child.href
    );

    React.useEffect(() => {
        if (hasActiveChild && isOpen) setIsExpanded(true);
    }, [hasActiveChild, isOpen]);

    const Icon = item.icon;
    const indent = level * 16;

    if (hasChildren) {
        return (
            <div>
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className={cn(
                        'flex w-full items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                        hasActiveChild
                            ? 'bg-orange-500 text-white'
                            : 'text-gray-600 hover:bg-orange-50 hover:text-orange-500',
                        !isOpen && 'justify-center'
                    )}
                    style={{ paddingLeft: isOpen ? `${12 + indent}px` : undefined }}
                    title={!isOpen ? item.name : undefined}
                >
                    <Icon className={cn('h-5 w-5 shrink-0', isOpen && 'mr-3')} />
                    {isOpen && (
                        <>
                            <span className="flex-1 text-left">{item.name}</span>
                            {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                        </>
                    )}
                </button>
                {isExpanded && isOpen && (
                    <div className="mt-1 space-y-1">
                        {item.children!.map((child) => (
                            <NavItemComponent key={child.name} item={child} isOpen={isOpen} level={level + 1} />
                        ))}
                    </div>
                )}
            </div>
        );
    }

    return (
        <NavLink
            to={item.href!}
            className={({ isActive }) =>
                cn(
                    'flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                    isActive
                        ? 'bg-orange-500 text-white'
                        : 'text-gray-600 hover:bg-orange-50 hover:text-orange-500',
                    !isOpen && 'justify-center'
                )
            }
            style={{ paddingLeft: isOpen ? `${12 + indent}px` : undefined }}
            title={!isOpen ? item.name : undefined}
        >
            <Icon className={cn('h-5 w-5 shrink-0', isOpen && 'mr-3')} />
            {isOpen && <span>{item.name}</span>}
        </NavLink>
    );
}

export function EnhancedSidebar({ isOpen, onToggle }: SidebarProps) {
    return (
        <>
            {/* Mobile backdrop */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-20 bg-black/50 lg:hidden"
                    onClick={onToggle}
                />
            )}

            <div
                className={cn(
                    'fixed inset-y-0 left-0 z-30 flex flex-col bg-white border-r border-gray-200 transition-all duration-300 overflow-hidden',
                    isOpen ? 'w-52 translate-x-0' : 'w-16 -translate-x-full lg:translate-x-0'
                )}
            >
                {/* Logo */}
                <div className="flex h-16 items-center border-b border-gray-200 px-4">
                    <div className={cn('flex items-center', !isOpen && 'justify-center w-full')}>
                        <div
                            onClick={onToggle}
                            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-orange-500 cursor-pointer">

                        </div>
                        {isOpen && (
                            <span className="ml-3 text-lg font-bold text-gray-900">EzMart</span>
                        )}
                    </div>
                </div>

                {/* Nav */}
                <nav className="flex-1 space-y-1 p-3 overflow-y-auto">
                    {navigation.map((item) =>
                        item.separator
                            ? <hr key={item.name} className="my-2 border-gray-200" />
                            : <NavItemComponent key={item.name} item={item} isOpen={isOpen} />
                    )}
                </nav>


            </div>
        </>
    );
}
