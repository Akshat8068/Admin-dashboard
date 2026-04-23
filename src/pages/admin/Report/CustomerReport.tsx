import { useState, useMemo } from 'react';
import { Users, ShoppingBag, Package, ChevronDown, Download, Copy, Pencil, Trash2, MoreHorizontal, ArrowUpRight } from 'lucide-react';
import type { ColumnDef } from '@tanstack/react-table';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { DataTable } from '@/components/common/DataTable';
import { ReportStatCard } from './ReportStatCard';
import { mockCustomerReportData, customerGrowthData } from '@/utils/mockReport';

const stats = [
    { title: 'Total Customers', value: '12,480', change: '+8.2%', positive: true, icon: Users },
    { title: 'Active Customers', value: '9,840', change: '+5.1%', positive: true, icon: ShoppingBag },
    { title: 'New This Month', value: '480', change: '+12%', positive: true, icon: ArrowUpRight },
    { title: 'Churn Rate', value: '2.4%', change: '-0.3%', positive: true, icon: Package },
];

const growthRanges = ['Monthly', 'Quarterly', 'Yearly'];
type CustomerRow = typeof mockCustomerReportData[0];

const CustomerReport = () => {
    const [selected, setSelected] = useState(0);
    const [growthRange, setGrowthRange] = useState('Monthly');

    const columns = useMemo<ColumnDef<CustomerRow>[]>(() => [
        { accessorKey: 'id', header: 'ID', cell: ({ getValue }) => <span className="text-xs text-gray-500 font-mono">{getValue() as string}</span> },
        { accessorKey: 'name', header: 'Name', cell: ({ getValue }) => <span className="text-sm font-medium text-gray-800">{getValue() as string}</span> },
        { accessorKey: 'email', header: 'Email', cell: ({ getValue }) => <span className="text-sm text-gray-600">{getValue() as string}</span> },
        { accessorKey: 'orders', header: 'Orders', cell: ({ getValue }) => <span className="text-sm text-gray-700">{getValue() as number}</span> },
        { accessorKey: 'totalSpent', header: 'Total Spent', cell: ({ getValue }) => <span className="text-sm font-medium text-gray-800">${(getValue() as number).toLocaleString()}</span> },
        { accessorKey: 'joined', header: 'Joined', cell: ({ getValue }) => <span className="text-sm text-gray-500">{getValue() as string}</span> },
        {
            accessorKey: 'status', header: 'Status',
            cell: ({ getValue }) => {
                const v = getValue() as string;
                return (
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${v === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                        {v === 'active' ? 'Active' : 'Inactive'}
                    </span>
                );
            }
        },
        {
            id: 'actions', header: 'Actions', enableSorting: false,
            cell: ({ row }) => (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button className="p-1.5 rounded hover:bg-gray-100 text-gray-500 hover:text-gray-700">
                            <MoreHorizontal className="h-4 w-4" />
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => navigator.clipboard.writeText(row.original.id)}>
                            <Copy className="h-3.5 w-3.5 mr-2" /> Copy ID
                        </DropdownMenuItem>
                        <DropdownMenuItem><Pencil className="h-3.5 w-3.5 mr-2" /> Edit Customer</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-500 focus:text-red-500">
                            <Trash2 className="h-3.5 w-3.5 mr-2" /> Delete Customer
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            ),
        },
    ], []);

    return (
        <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                {stats.map((stat, i) => (
                    <ReportStatCard key={i} {...stat} isSelected={selected === i} onClick={() => setSelected(i)} />
                ))}
            </div>

            <Card className="bg-white border border-gray-100">
                <CardHeader className="pb-2 px-5 pt-5">
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle className="text-sm font-semibold text-gray-800">Customer Growth</CardTitle>
                            <p className="text-xs text-gray-400 mt-0.5">New users added over time</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => {
                                    const csv = 'Month,Users\n' + customerGrowthData.map(d => `${d.month},${d.users}`).join('\n');
                                    const a = document.createElement('a');
                                    a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }));
                                    a.download = 'customer-growth.csv';
                                    a.click();
                                }}
                                className="flex items-center gap-1 border border-gray-200 text-gray-600 text-xs px-3 py-1.5 rounded-lg font-medium hover:bg-gray-50"
                            >
                                <Download className="h-3 w-3" /> Export
                            </button>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <button className="flex items-center gap-1 bg-orange-500 text-white text-xs px-3 py-1.5 rounded-lg font-medium">
                                        {growthRange} <ChevronDown className="h-3 w-3" />
                                    </button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    {growthRanges.map(r => (
                                        <DropdownMenuItem key={r} onClick={() => setGrowthRange(r)}>{r}</DropdownMenuItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="px-2 pb-4">
                    <ResponsiveContainer width="100%" height={220}>
                        <BarChart data={customerGrowthData} barSize={28}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
                            <XAxis dataKey="month" tick={{ fontSize: 10, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                            <YAxis tick={{ fontSize: 10, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                            <Tooltip
                                formatter={(val: number) => [val.toLocaleString(), 'New Users']}
                                contentStyle={{ fontSize: 11, borderRadius: 8, border: '1px solid #f3f4f6' }}
                            />
                            <Bar dataKey="users" fill="#f97316" radius={[4, 4, 0, 0]} name="New Users" />
                        </BarChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>

            <Card className="bg-white border border-gray-100">
                <CardContent className="p-5">
                    <DataTable
                        data={mockCustomerReportData}
                        columns={columns}
                        searchPlaceholder="Search customers..."
                        enableExport={false}
                        enableSelection={true}
                        pageSize={8}
                    />
                </CardContent>
            </Card>
        </div>
    );
};

export default CustomerReport;
