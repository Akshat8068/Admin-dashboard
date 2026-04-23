import { useState } from 'react';
import type { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal, Users, Copy, Trash2 } from 'lucide-react';
import { DataTable } from '@/components/common/DataTable';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useGetUsersQuery } from '@/store/api/customerApi';
import { useAppSelector } from '@/hooks/redux';
import { NetworkErrorBanner } from '@/components/common/ErrorBanner';

type CustomerStatus = 'active' | 'inactive';

interface Customer {
    id: string;
    name: string;
    email: string;
    status: CustomerStatus;
    joinDate: string;
    location: string;
}

const AdminCustomer = () => {
    const [deletedIds, setDeletedIds] = useState<string[]>([]);
    const [copiedId, setCopiedId] = useState<string | null>(null);
    const [pageIndex, setPageIndex] = useState(0);
    const [pageSize, setPageSize] = useState(10);

    const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

    const { data, isLoading, isError, refetch } = useGetUsersQuery(
        { limit: pageSize, skip: pageIndex * pageSize },
        { skip: !isAuthenticated }
    );

    const allCustomers: Customer[] = (data?.users ?? []).map((user: any) => ({
        id: String(user.id),
        name: `${user.firstName} ${user.lastName}`,
        email: user.email,
        status: (user.role === 'admin' ? 'active' : 'inactive') as CustomerStatus,
        joinDate: user.birthDate,
        location: `${user.address.city}, ${user.address.country}`,
    }));

    const customers = allCustomers.filter((c) => !deletedIds.includes(c.id));

    const pageCount = data?.total ? Math.ceil(data.total / pageSize) : 0;

    const handleCopyId = (id: string) => {
        navigator.clipboard.writeText(id);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 1500);
    };

    const handleDelete = (id: string) => {
        setDeletedIds((prev) => [...prev, id]);
    };

    const columns: ColumnDef<Customer>[] = [
        {
            accessorKey: 'name',
            header: 'Name',
            cell: ({ row }) => (
                <div>
                    <p className="text-sm font-medium text-gray-900">{row.original.name}</p>
                    <p className="text-xs text-gray-400">{row.original.email}</p>
                </div>
            ),
        },
        {
            accessorKey: 'id',
            header: 'Customer ID',
            cell: ({ row }) => (
                <span className="text-xs font-mono text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    {row.original.id}
                </span>
            ),
        },
        {
            accessorKey: 'status',
            header: 'Status',
            cell: ({ row }) => {
                const isActive = row.original.status === 'active';
                return (
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${isActive
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-500'
                        }`}>
                        <span className={`h-1.5 w-1.5 rounded-full ${isActive ? 'bg-green-400' : 'bg-red-400'}`} />
                        {isActive ? 'Active' : 'Inactive'}
                    </span>
                );
            },
        },
        {
            accessorKey: 'joinDate',
            header: 'Join Date',
            cell: ({ row }) => (
                <span className="text-sm text-gray-600">
                    {new Date(row.original.joinDate).toLocaleDateString('en-IN', {
                        day: '2-digit', month: 'short', year: 'numeric',
                    })}
                </span>
            ),
        },
        {
            accessorKey: 'location',
            header: 'Location',
            cell: ({ row }) => (
                <span className="text-sm text-gray-600">{row.original.location}</span>
            ),
        },
        {
            id: 'actions',
            header: 'Action',
            enableSorting: false,
            cell: ({ row }) => {
                const customer = row.original;
                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button className="p-1.5 rounded-md hover:bg-orange-50 text-gray-400 hover:text-[#ff6900] outline-none transition-colors">
                                <MoreHorizontal className="h-4 w-4" />
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-44">
                            <DropdownMenuItem
                                className="gap-2 cursor-pointer text-sm hover:bg-orange-50 hover:text-[#ff6900]"
                                onClick={() => handleCopyId(customer.id)}
                            >
                                <Copy className="h-3.5 w-3.5" />
                                {copiedId === customer.id ? 'Copied!' : 'Copy ID'}
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                className="gap-2 cursor-pointer text-sm text-red-500 hover:bg-red-50 hover:text-red-600"
                                onClick={() => handleDelete(customer.id)}
                            >
                                <Trash2 className="h-3.5 w-3.5" />
                                Delete User
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                );
            },
        },
    ];

    const activeCount = customers.filter((c) => c.status === 'active').length;
    const inactiveCount = customers.filter((c) => c.status === 'inactive').length;

    return (
        <div className="flex flex-col gap-6 p-4">
            {/* Header */}
            <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-hover">
                    <Users className="h-5 w-5 text-primary" />
                </div>
                <div>
                    <h1 className="text-lg font-semibold text-gray-800">Customers</h1>
                    <p className="text-xs text-gray-400">Manage your customer base</p>
                </div>
                
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl border border-gray-100 p-4">
                {!isAuthenticated ? (
                    <p className="text-sm text-orange-400 text-center py-10">
                        Please login to view customers. (skip: true — no API call made)
                    </p>
                ) : isLoading ? (
                    <p className="text-sm text-gray-400 text-center py-10">Loading customers...</p>
                ) : isError ? (
                    <NetworkErrorBanner onRetry={refetch} />
                ) : (
                    <DataTable
                        data={customers}
                        columns={columns}
                        searchPlaceholder="Search customers..."
                        enableSelection={false}
                        enableExport={false}
                        pageSize={pageSize}
                        manualPageIndex={pageIndex}
                        manualPageCount={pageCount}
                        onPaginationChange={(newPageIndex, newPageSize) => {
                            if (newPageSize !== pageSize) {
                                setPageSize(newPageSize);
                                setPageIndex(0);
                            } else {
                                setPageIndex(newPageIndex);
                            }
                        }}
                    />
                )}
            </div>
        </div>
    );
};

export default AdminCustomer;
