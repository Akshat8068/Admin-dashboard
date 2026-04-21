import { useState } from 'react';
import { ShoppingBag, ShoppingCart, Package, ChevronDown } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/UI/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/UI/dropdown-menu';
import { ReportStatCard } from './ReportStatCard';
import { revenueData8Days, revenueData30Days, revenueData3Months, revenueDataYear } from '@/utils/mockReport';

const stats = [
    { title: 'Total Revenue', value: '$983,410', change: '+12.4%', positive: true, icon: ShoppingBag },
    { title: 'Avg Order Value', value: '$68.50', change: '+3.2%', positive: true, icon: ShoppingCart },
    { title: 'Refund Rate', value: '2.1%', change: '-0.5%', positive: false, icon: Package },
];

const ranges = ['Last 8 Days', 'Last 30 Days', 'Last 3 Months', 'Last Year'];
const dataMap: Record<string, typeof revenueData8Days> = {
    'Last 8 Days': revenueData8Days,
    'Last 30 Days': revenueData30Days,
    'Last 3 Months': revenueData3Months,
    'Last Year': revenueDataYear,
};

const RevenueReport = () => {
    const [selected, setSelected] = useState(0);
    const [range, setRange] = useState('Last 8 Days');
    const data = dataMap[range];

    return (
        <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {stats.map((stat, i) => (
                    <ReportStatCard key={i} {...stat} isSelected={selected === i} onClick={() => setSelected(i)} />
                ))}
            </div>
            <Card className="bg-white border border-gray-100">
                <CardHeader className="pb-2 px-5 pt-5">
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-sm font-semibold text-gray-800">Revenue Analytics</CardTitle>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <button className="flex items-center gap-1 bg-orange-500 text-white text-xs px-3 py-1.5 rounded-lg font-medium">
                                    {range} <ChevronDown className="h-3 w-3" />
                                </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                {ranges.map(r => (
                                    <DropdownMenuItem key={r} onClick={() => setRange(r)}>{r}</DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    <div className="flex items-center gap-4 mt-2">
                        <span className="flex items-center gap-1.5 text-xs text-gray-500">
                            <span className="h-2 w-4 rounded-full bg-orange-500 inline-block" /> Revenue
                        </span>
                        <span className="flex items-center gap-1.5 text-xs text-gray-500">
                            <span className="h-2 w-4 rounded-full border-2 border-orange-300 inline-block" /> Order
                        </span>
                    </div>
                </CardHeader>
                <CardContent className="px-2 pb-4">
                    <ResponsiveContainer width="100%" height={260}>
                        <LineChart data={data}>
                            <XAxis dataKey="date" tick={{ fontSize: 10, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                            <YAxis tick={{ fontSize: 10, fill: '#9ca3af' }} axisLine={false} tickLine={false} tickFormatter={v => `${v / 1000}k`} />
                            <Tooltip
                                formatter={(val: number) => [`$${val.toLocaleString()}`, '']}
                                contentStyle={{ fontSize: 11, borderRadius: 8, border: '1px solid #f3f4f6' }}
                            />
                            <Line type="monotone" dataKey="revenue" stroke="#f97316" strokeWidth={2.5} dot={false} />
                            <Line type="monotone" dataKey="order" stroke="#fdba74" strokeWidth={1.5} strokeDasharray="4 4" dot={false} />
                        </LineChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
        </div>
    );
};

export default RevenueReport;
