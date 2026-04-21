import React, { useState, useMemo } from 'react';
import type {
    ColumnDef,
    SortingState,
    ColumnFiltersState,
    VisibilityState,
    RowSelectionState,
} from '@tanstack/react-table';
import {
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    useReactTable,
} from '@tanstack/react-table';

import {
    ChevronDown,
    ChevronUp,
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
    Search,
    Filter,
    Download,
    Trash2,
    EyeOff,
} from 'lucide-react';

import { Button } from '@/components/UI/button';
import { Input } from '@/components/UI/input';
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@/components/UI/dropdown-menu';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/UI/select';
import { cn } from '@/utils';

interface DataTableProps<TData> {
    data: TData[];
    columns: ColumnDef<TData>[];
    searchPlaceholder?: string;
    onSelectionChange?: (selectedRows: TData[]) => void;
    onExport?: (selectedRows: TData[]) => void;
    onDelete?: (selectedRows: TData[]) => void;
    enableSearch?: boolean;
    enableFilters?: boolean;
    enableSelection?: boolean;
    enableExport?: boolean;
    enableColumnVisibility?: boolean;
    pageSize?: number;
}

export function DataTable<TData>({
    data,
    columns,
    searchPlaceholder = "Search...",
    onSelectionChange,
    onExport,
    onDelete,
    enableSearch = true,
    enableFilters = true,
    enableSelection = false,
    enableExport = false,
    enableColumnVisibility = true,
    pageSize = 10,
}: DataTableProps<TData>) {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
    const [globalFilter, setGlobalFilter] = useState('');

    // Add selection column if enabled
    const tableColumns = useMemo(() => {
        if (!enableSelection) return columns;

        const selectionColumn: ColumnDef<TData> = {
            id: 'select',
            header: ({ table }) => (
                <div
                    onClick={() => table.toggleAllPageRowsSelected(!table.getIsAllPageRowsSelected())}
                    className={`h-4 w-4 rounded cursor-pointer flex items-center justify-center border-2 transition-colors ${table.getIsAllPageRowsSelected()
                        ? 'bg-[#FF8904] border-[#FF8904]'
                        : 'bg-white border-gray-300'
                        }`}
                >
                    {table.getIsAllPageRowsSelected() && (
                        <svg className="h-2.5 w-2.5 text-white" fill="none" viewBox="0 0 12 12" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2 6l3 3 5-5" />
                        </svg>
                    )}
                </div>
            ),
            cell: ({ row }) => (
                <div
                    onClick={() => row.toggleSelected(!row.getIsSelected())}
                    className={`h-4 w-4 rounded cursor-pointer flex items-center justify-center border-2 transition-colors ${row.getIsSelected()
                        ? 'bg-[#FF8904] border-[#FF8904]'
                        : 'bg-white border-gray-300'
                        }`}
                >
                    {row.getIsSelected() && (
                        <svg className="h-2.5 w-2.5 text-white" fill="none" viewBox="0 0 12 12" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2 6l3 3 5-5" />
                        </svg>
                    )}
                </div>
            ),
            enableSorting: false,
            enableHiding: false,
        };

        return [selectionColumn, ...columns];
    }, [columns, enableSelection]);

    const table = useReactTable({
        data,
        columns: tableColumns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        onGlobalFilterChange: setGlobalFilter,
        globalFilterFn: 'includesString',
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
            globalFilter,
        },
        initialState: {
            pagination: {
                pageSize,
            },
        },
    });

    // Handle selection change
    React.useEffect(() => {
        if (onSelectionChange) {
            const selectedRows = table.getFilteredSelectedRowModel().rows.map(row => row.original);
            onSelectionChange(selectedRows);
        }
    }, [rowSelection, onSelectionChange, table]);

    const selectedRows = table.getFilteredSelectedRowModel().rows.map(row => row.original);

    return (
        <div className="space-y-4">
            {/* Toolbar */}
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    {/* Global Search */}
                    {enableSearch && (
                        <div className="relative">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder={searchPlaceholder}
                                value={globalFilter}
                                onChange={(e) => setGlobalFilter(e.target.value)}
                                className="pl-8 max-w-sm"
                            />
                        </div>
                    )}

                    {/* Column Filters */}
                    {enableFilters && (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="sm" className="bg-[#FFAC4F] border-[#FFAC4F] text-white hover:bg-[#FF8904] hover:border-[#FF8904] hover:text-white">
                                    <Filter className="mr-2 h-4 w-4" />
                                    Filter
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="start" className="w-[200px]">
                                {table
                                    .getAllColumns()
                                    .filter((column) => column.getCanFilter())
                                    .map((column) => {
                                        return (
                                            <div key={column.id} className="p-2">
                                                <Input
                                                    placeholder={`Filter ${column.id}...`}
                                                    value={(column.getFilterValue() as string) ?? ""}
                                                    onChange={(event) =>
                                                        column.setFilterValue(event.target.value)
                                                    }
                                                    className="max-w-sm"
                                                />
                                            </div>
                                        );
                                    })}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    )}
                </div>

                <div className="flex items-center space-x-2">
                    {/* Column Visibility */}
                    {enableColumnVisibility && (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="sm" className="bg-[#FFAC4F] border-[#FFAC4F] text-white hover:bg-[#FF8904] hover:border-[#FF8904] hover:text-white">
                                    <EyeOff className="mr-2 h-4 w-4" />
                                    View
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                {table
                                    .getAllColumns()
                                    .filter((column) => column.getCanHide())
                                    .map((column) => {
                                        return (
                                            <DropdownMenuCheckboxItem
                                                key={column.id}
                                                className="capitalize"
                                                checked={column.getIsVisible()}
                                                onCheckedChange={(value) =>
                                                    column.toggleVisibility(!!value)
                                                }
                                            >
                                                {column.id}
                                            </DropdownMenuCheckboxItem>
                                        );
                                    })}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    )}

                    {/* Export */}
                    {enableExport && selectedRows.length > 0 && onExport && (
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onExport(selectedRows)}
                        >
                            <Download className="mr-2 h-4 w-4" />
                            Export ({selectedRows.length})
                        </Button>
                    )}

                    {/* Delete */}
                    {enableSelection && selectedRows.length > 0 && onDelete && (
                        <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => onDelete(selectedRows)}
                        >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete ({selectedRows.length})
                        </Button>
                    )}
                </div>
            </div>

            {/* Table */}
            <div className="rounded-md border-gray-500">
                <table className="w-full">
                    <thead>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id} className="border-b border-gray-200 bg-muted/50">
                                {headerGroup.headers.map((header) => (
                                    <th
                                        key={header.id}
                                        className="h-12 px-4 text-left align-middle font-medium text-muted-foreground"
                                    >
                                        {header.isPlaceholder ? null : (
                                            <div
                                                className={cn(
                                                    "flex items-center space-x-2",
                                                    header.column.getCanSort() && "cursor-pointer select-none"
                                                )}
                                                onClick={header.column.getToggleSortingHandler()}
                                            >
                                                <span>
                                                    {flexRender(
                                                        header.column.columnDef.header,
                                                        header.getContext()
                                                    )}
                                                </span>
                                                {header.column.getCanSort() && (
                                                    <div className="ml-2 h-4 w-4">
                                                        {header.column.getIsSorted() === 'desc' ? (
                                                            <ChevronDown className="h-4 w-4" />
                                                        ) : header.column.getIsSorted() === 'asc' ? (
                                                            <ChevronUp className="h-4 w-4" />
                                                        ) : (
                                                            <div className="h-4 w-4" />
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <tr
                                    key={row.id}
                                    className={cn(
                                        "border-b border-gray-200 transition-colors hover:bg-orange-50",
                                        row.getIsSelected() && "bg-orange-50"
                                    )}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <td key={cell.id} className="p-4 align-middle">
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan={table.getAllColumns().length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                    {enableSelection && (
                        <span>
                            {table.getFilteredSelectedRowModel().rows.length} of{" "}
                            {table.getFilteredRowModel().rows.length} row(s) selected.
                        </span>
                    )}
                </div>

                <div className="flex items-center space-x-6 lg:space-x-8">
                    <div className="flex items-center space-x-2">
                        <p className="text-sm font-medium">Rows per page</p>
                        <Select
                            value={`${table.getState().pagination.pageSize}`}
                            onValueChange={(value) => {
                                table.setPageSize(Number(value));
                            }}
                        >
                            <SelectTrigger className="h-8 w-[70px]">
                                <SelectValue placeholder={table.getState().pagination.pageSize} />
                            </SelectTrigger>
                            <SelectContent side="top">
                                {[5, 10, 20, 50].map((pageSize) => (
                                    <SelectItem key={pageSize} value={`${pageSize}`}>
                                        {pageSize}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex w-[100px] items-center justify-center text-sm font-medium">
                        Page {table.getState().pagination.pageIndex + 1} of{" "}
                        {table.getPageCount()}
                    </div>

                    <div className="flex items-center space-x-2">
                        <Button
                            variant="outline"
                            className="hidden h-8 w-8 p-0 lg:flex hover:bg-[#FFAC4F] hover:border-[#FFAC4F] hover:text-white"
                            onClick={() => table.setPageIndex(0)}
                            disabled={!table.getCanPreviousPage()}
                        >
                            <ChevronsLeft className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="outline"
                            className="h-8 w-8 p-0 hover:bg-[#FFAC4F] hover:border-[#FFAC4F] hover:text-white"
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="outline"
                            className="h-8 w-8 p-0 hover:bg-[#FFAC4F] hover:border-[#FFAC4F] hover:text-white"
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                        >
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="outline"
                            className="hidden h-8 w-8 p-0 lg:flex hover:bg-[#FFAC4F] hover:border-[#FFAC4F] hover:text-white"
                            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                            disabled={!table.getCanNextPage()}
                        >
                            <ChevronsRight className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}