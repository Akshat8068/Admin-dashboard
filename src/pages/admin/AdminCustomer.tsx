import { useState } from 'react';
import type { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal, Users, Copy, Trash2 } from 'lucide-react';
import { DataTable } from '@/components/common/DataTable';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/UI/dropdown-menu';

type CustomerStatus = 'active' | 'inactive';

interface Customer {
    id: string;
    name: string;
    email: string;
    status: CustomerStatus;
    joinDate: string;
    location: string;
}

const mockCustomers: Customer[] = [
    { id: 'USR-001', name: 'Aarav Sharma', email: 'aarav@example.com', status: 'active', joinDate: '2024-01-15', location: 'Mumbai, IN' },
    { id: 'USR-002', name: 'Priya Mehta', email: 'priya@example.com', status: 'active', joinDate: '2024-02-20', location: 'Delhi, IN' },
    { id: 'USR-003', name: 'Rohan Verma', email: 'rohan@example.com', status: 'inactive', joinDate: '2024-03-05', location: 'Bangalore, IN' },
    { id: 'USR-004', name: 'Sneha Patel', email: 'sneha@example.com', status: 'active', joinDate: '2024-03-18', location: 'Ahmedabad, IN' },
    { id: 'USR-005', name: 'Karan Singh', email: 'karan@example.com', status: 'inactive', joinDate: '2024-04-01', location: 'Jaipur, IN' },
    { id: 'USR-006', name: 'Ananya Gupta', email: 'ananya@example.com', status: 'active', joinDate: '2024-04-10', location: 'Pune, IN' },
    { id: 'USR-007', name: 'Vikram Nair', email: 'vikram@example.com', status: 'active', joinDate: '2024-05-02', location: 'Chennai, IN' },
    { id: 'USR-008', name: 'Meera Joshi', email: 'meera@example.com', status: 'inactive', joinDate: '2024-05-14', location: 'Hyderabad, IN' },
    { id: 'USR-009', name: 'Arjun Reddy', email: 'arjun@example.com', status: 'active', joinDate: '2024-06-01', location: 'Kolkata, IN' },
    { id: 'USR-010', name: 'Divya Kapoor', email: 'divya@example.com', status: 'active', joinDate: '2024-06-20', location: 'Surat, IN' },
    { id: 'USR-011', name: 'Nikhil Bose', email: 'nikhil@example.com', status: 'inactive', joinDate: '2024-07-08', location: 'Lucknow, IN' },
    { id: 'USR-012', name: 'Pooja Iyer', email: 'pooja@example.com', status: 'active', joinDate: '2024-07-22', location: 'Nagpur, IN' },
];

const AdminCustomer = () => {
    const [customers, setCustomers] = useState<Customer[]>(mockCustomers);
    const [copiedId, setCopiedId] = useState<string | null>(null);

    const handleCopyId = (id: string) => {
        navigator.clipboard.writeText(id);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 1500);
    };

    const handleDelete = (id: string) => {
        setCustomers((prev) => prev.filter((c) => c.id !== id));
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
                            ? 'bg-orange-50 text-[#ff6900]'
                            : 'bg-gray-100 text-gray-500'
                        }`}>
                        <span className={`h-1.5 w-1.5 rounded-full ${isActive ? 'bg-[#ff6900]' : 'bg-gray-400'}`} />
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
                <div className="ml-auto flex items-center gap-3">
                    <span className="text-xs bg-orange-50 text-[#ff6900] px-3 py-1.5 rounded-full font-medium">
                        {activeCount} Active
                    </span>
                    <span className="text-xs bg-gray-100 text-gray-500 px-3 py-1.5 rounded-full font-medium">
                        {inactiveCount} Inactive
                    </span>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl border border-gray-100 p-4">
                <DataTable
                    data={customers}
                    columns={columns}
                    searchPlaceholder="Search customers..."
                    enableSelection={false}
                    enableExport={false}
                    pageSize={8}
                />
            </div>
        </div>
    );
};

export default AdminCustomer;
