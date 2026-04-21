import { useState, useMemo } from 'react';
import { Package, ShoppingBag, ShoppingCart, Copy, Pencil, Trash2, MoreHorizontal } from 'lucide-react';
import type { ColumnDef } from '@tanstack/react-table';
import { Card, CardContent } from '@/components/UI/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/UI/dropdown-menu';
import { DataTable } from '@/components/common/DataTable';
import { ReportStatCard } from './ReportStatCard';
import { mockProductReportData } from '@/utils/mockReport';

const stats = [
    { title: 'Total Products', value: '248', change: '+4', positive: true, icon: Package },
    { title: 'Active Products', value: '201', change: '+6', positive: true, icon: ShoppingBag },
    { title: 'Out of Stock', value: '47', change: '+2', positive: false, icon: ShoppingCart },
];

type ProductRow = typeof mockProductReportData[0];

const ProductReport = () => {
    const [selected, setSelected] = useState(0);

    const columns = useMemo<ColumnDef<ProductRow>[]>(() => [
        { accessorKey: 'id', header: 'Product ID', cell: ({ getValue }) => <span className="text-xs text-gray-500 font-mono">{getValue() as string}</span> },
        { accessorKey: 'name', header: 'Name', cell: ({ getValue }) => <span className="text-sm font-medium text-gray-800">{getValue() as string}</span> },
        { accessorKey: 'price', header: 'Price', cell: ({ getValue }) => <span className="text-sm text-gray-700">${(getValue() as number).toFixed(2)}</span> },
        { accessorKey: 'stock', header: 'Stock', cell: ({ getValue }) => <span className="text-sm text-gray-700">{getValue() as number}</span> },
        {
            accessorKey: 'status', header: 'Status',
            cell: ({ getValue }) => {
                const v = getValue() as string;
                return (
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${v === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>
                        {v === 'active' ? 'Active' : 'Inactive'}
                    </span>
                );
            }
        },
        { accessorKey: 'category', header: 'Category', cell: ({ getValue }) => <span className="text-sm text-gray-700">{getValue() as string}</span> },
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
                        <DropdownMenuItem><Pencil className="h-3.5 w-3.5 mr-2" /> Edit Product</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-500 focus:text-red-500">
                            <Trash2 className="h-3.5 w-3.5 mr-2" /> Delete Product
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            ),
        },
    ], []);

    return (
        <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {stats.map((stat, i) => (
                    <ReportStatCard key={i} {...stat} isSelected={selected === i} onClick={() => setSelected(i)} />
                ))}
            </div>
            <Card className="bg-white border border-gray-100">
                <CardContent className="p-5">
                    <DataTable
                        data={mockProductReportData}
                        columns={columns}
                        searchPlaceholder="Search products..."
                        enableExport={false}
                        enableSelection={true}
                        pageSize={8}
                    />
                </CardContent>
            </Card>
        </div>
    );
};

export default ProductReport;
