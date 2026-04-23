import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
    ArrowDownRight,
    ArrowUpRight,
    CheckCircle,
    Clock,
    DollarSign,
    ShoppingBag,
    ListOrdered,
    MoreHorizontal,
    Copy,
    Pencil,
    FileText,
} from "lucide-react";
import { DataTable } from "@/components/common/DataTable";
import type { ColumnDef } from "@tanstack/react-table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface StatCardProps {
    title: string;
    value: string;
    change: string;
    positive: boolean;
    icon: React.ComponentType<{ className?: string }>;
    isSelected?: boolean;
    onClick?: () => void;
}

const orderStats: StatCardProps[] = [
    { title: "Total Orders", value: "1,245", change: "+5%", positive: true, icon: ShoppingBag },
    { title: "Pending Orders", value: "320", change: "-2%", positive: false, icon: Clock },
    { title: "Completed Orders", value: "890", change: "+3%", positive: true, icon: CheckCircle },
    { title: "Revenue", value: "$45,200", change: "+10%", positive: true, icon: DollarSign },
];

function StatCard({ title, value, change, positive, icon: Icon, isSelected, onClick }: StatCardProps) {
    return (
        <Card
            onClick={onClick}
            className={`cursor-pointer border transition-colors ${isSelected ? "bg-orange-400 border-orange-400" : "bg-white border-gray-100"
                }`}
        >
            <CardContent className="p-5">
                <div className="flex items-center justify-between mb-4">
                    <p className={`text-sm font-medium ${isSelected ? "text-orange-100" : "text-gray-500"}`}>
                        {title}
                    </p>
                    <div className={`p-2.5 rounded-xl ${isSelected ? "bg-white/30" : "bg-gray-200"}`}>
                        <Icon className={`h-5 w-5 ${isSelected ? "text-white" : "text-gray-500"}`} />
                    </div>
                </div>
                <div className="flex items-end justify-between">
                    <p className={`text-xl font-bold ${isSelected ? "text-white" : "text-gray-900"}`}>
                        {value}
                    </p>
                    <div className="flex flex-col items-end gap-0.5">
                        <div className="flex items-center gap-1">
                            {positive ? (
                                <ArrowUpRight className="h-3 w-3 text-green-500" />
                            ) : (
                                <ArrowDownRight className="h-3 w-3 text-red-500" />
                            )}
                            <span className={`text-xs font-semibold ${positive ? "text-green-600" : "text-red-500"}`}>
                                {change}
                            </span>
                        </div>
                        <span className={`text-xs ${isSelected ? "text-orange-100" : "text-gray-400"}`}>
                            vs last week
                        </span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

const statusConfig: Record<string, { dot: string; bg: string; text: string }> = {
    Completed: { dot: "bg-green-500", bg: "bg-green-50", text: "text-green-700" },
    Pending: { dot: "bg-yellow-400", bg: "bg-yellow-50", text: "text-yellow-700" },
    Cancelled: { dot: "bg-red-400", bg: "bg-red-50", text: "text-red-600" },
};

const orders = [
    { id: "ORD001", customer: "Akshat Yadav", status: "Pending", amount: 1200, date: "2026-04-10" },
    { id: "ORD002", customer: "Rahul Sharma", status: "Completed", amount: 2500, date: "2026-04-11" },
    { id: "ORD003", customer: "Priya Singh", status: "Cancelled", amount: 800, date: "2026-04-12" },
    { id: "ORD004", customer: " Kumar", status: "Completed", amount: 3200, date: "2026-04-13" },
    { id: "ORD005", customer: "Neha Gupta", status: "Pending", amount: 1500, date: "2026-04-14" },
    { id: "ORD001", customer: "Yadav", status: "Pending", amount: 1200, date: "2026-04-10" },
    { id: "ORD002", customer: "Rahul Sharma", status: "Completed", amount: 2500, date: "2026-04-11" },
    { id: "ORD003", customer: "ingh", status: "Cancelled", amount: 800, date: "2026-04-12" },
    { id: "ORD004", customer: "Amitumar", status: "Completed", amount: 3200, date: "2026-04-13" },
    { id: "ORD005", customer: "Gupta", status: "Pending", amount: 1500, date: "2026-04-14" },
    { id: "ORD001", customer: "Yadav", status: "Pending", amount: 1200, date: "2026-04-10" },
    { id: "ORD002", customer: "Rahul Sharma", status: "Completed", amount: 2500, date: "2026-04-11" },
    { id: "ORD003", customer: " Singh", status: "Cancelled", amount: 800, date: "2026-04-12" },
    { id: "ORD004", customer: "Amit Kumar", status: "Completed", amount: 3200, date: "2026-04-13" },
    { id: "ORD005", customer: "Neha ", status: "Pending", amount: 1500, date: "2026-04-14" },
    { id: "ORD001", customer: "Akshat ", status: "Pending", amount: 1200, date: "2026-04-10" },
    { id: "ORD002", customer: "Rahul ", status: "Completed", amount: 2500, date: "2026-04-11" },
    { id: "ORD003", customer: "Priya ", status: "Cancelled", amount: 800, date: "2026-04-12" },
    { id: "ORD004", customer: "Amit ", status: "Completed", amount: 3200, date: "2026-04-13" },
    { id: "ORD005", customer: "Neha ", status: "Pending", amount: 1500, date: "2026-04-14" },

    { id: "ORD001", customer: "Yadav", status: "Pending", amount: 1200, date: "2026-04-10" },
    { id: "ORD002", customer: "rma", status: "Completed", amount: 2500, date: "2026-04-11" },
    { id: "ORD003", customer: "Singh", status: "Cancelled", amount: 800, date: "2026-04-12" },
    { id: "ORD004", customer: "Kumar", status: "Completed", amount: 3200, date: "2026-04-13" },
    { id: "ORD005", customer: "Gupta", status: "Pending", amount: 1500, date: "2026-04-14" },

];

const columns: ColumnDef<any>[] = [
    { accessorKey: "id", header: "Order ID" },
    { accessorKey: "customer", header: "Customer" },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const status = row.getValue("status") as string;
            const cfg = statusConfig[status] ?? { dot: "bg-gray-400", bg: "bg-gray-50", text: "text-gray-600" };
            return (
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${cfg.bg} ${cfg.text}`}>
                    <span className={`h-2 w-2 rounded-full ${cfg.dot}`} />
                    {status}
                </span>
            );
        },
    },
    {
        accessorKey: "amount",
        header: "Amount",
        cell: ({ row }) => (
            <span className="font-medium text-gray-800">${row.getValue("amount")}</span>
        ),
    },
    { accessorKey: "date", header: "Date" },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
            const order = row.original;
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button className="h-8 w-8 flex items-center justify-center rounded-md hover:bg-gray-100 transition-colors">
                            <MoreHorizontal className="h-4 w-4 text-gray-500" />
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-44">
                        <DropdownMenuLabel className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                            Actions
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            className="gap-2 cursor-pointer"
                            onClick={() => navigator.clipboard.writeText(order.id)}
                        >
                            <Copy className="h-4 w-4 text-gray-400" />
                            Copy Order ID
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2 cursor-pointer">
                            <Pencil className="h-4 w-4 text-gray-400" />
                            Edit Status
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2 cursor-pointer">
                            <FileText className="h-4 w-4 text-gray-400" />
                            Invoice
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
        enableSorting: false,
        enableHiding: false,
    },
];

const AdminOrders = () => {
    const [selectedCard, setSelectedCard] = useState<number>(0);

    return (
        <div className="flex flex-col min-h-screen p-4 gap-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {orderStats.map((item, i) => (
                    <StatCard key={i} {...item} isSelected={selectedCard === i} onClick={() => setSelectedCard(i)} />
                ))}
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                    <div className="flex items-center gap-2">
                        <div className="p-2 rounded-lg bg-orange-50">
                            <ListOrdered className="h-4 w-4 text-orange-500" />
                        </div>
                        <div>
                            <h2 className="text-sm font-semibold text-gray-800">Recent Orders</h2>
                            <p className="text-xs text-gray-400">{orders.length} orders found</p>
                        </div>
                    </div>
                </div>
                <div className="p-5">
                    <DataTable
                        data={orders}
                        columns={columns}
                        searchPlaceholder="Search orders..."
                        enableSearch={true}
                        enableFilters={true}
                        enableSelection={true}
                        enableExport={true}
                    />
                </div>
            </div>
        </div>
    );
};

export default AdminOrders;
