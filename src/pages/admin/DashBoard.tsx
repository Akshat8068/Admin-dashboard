import { useState } from 'react';
import {ShoppingBag, ShoppingCart, Users,MoreHorizontal, ArrowUpRight, ArrowDownRight, ChevronDown,
} from 'lucide-react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
    Cell,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/UI/card';
import { Progress } from '@/components/UI/progress';
import {DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/UI/dropdown-menu';


const revenueData = [
    { date: '12 Aug', revenue: 8000, order: 4000 },
    { date: '13 Aug', revenue: 9500, order: 5000 },
    { date: '14 Aug', revenue: 8800, order: 4200 },
    { date: '15 Aug', revenue: 14521, order: 6000 },
    { date: '16 Aug', revenue: 11000, order: 5500 },
    { date: '17 Aug', revenue: 13000, order: 6200 },
    { date: '18 Aug', revenue: 12000, order: 5800 },
    { date: '19 Aug', revenue: 15000, order: 7000 },
];

const conversionData = [
    { label: 'Product\nViews', value: 25000, change: '+9%', positive: true },
    { label: 'Add to\nCart', value: 12000, change: '+6%', positive: true },
    { label: 'Proceed to\nCheckout', value: 8500, change: '+4%', positive: true },
    { label: 'Completed\nPurchases', value: 6200, change: '-7%', positive: false },
    { label: 'Abandoned\nCarts', value: 3000, change: '-5%', positive: false },
];

const activeUsers = [
    { country: 'United States', percent: 36 },
    { country: 'United Kingdom', percent: 24 },
    { country: 'Indonesia', percent: 17.5 },
    { country: 'Russia', percent: 15 },
];

const categories = [
    { name: 'Electronics', value: '$1,200,000', color: '#f97316' },
    { name: 'Fashion', value: '$950,000', color: '#fb923c' },
    { name: 'Home & Kitchen', value: '$750,000', color: '#fdba74' },
    { name: 'Beauty & Personal Care', value: '$500,000', color: '#fed7aa' },
];

const donutData = [
    { value: 1200000, color: '#f97316' },
    { value: 950000, color: '#fb923c' },
    { value: 750000, color: '#fdba74' },
    { value: 500000, color: '#fed7aa' },
];

const trafficSources = [
    { name: 'Direct Traffic', percent: 40, color: '#f97316' },
    { name: 'Organic Search', percent: 30, color: '#fb923c' },
    { name: 'Social Media', percent: 15, color: '#fdba74' },
    { name: 'Referral Traffic', percent: 10, color: '#fed7aa' },
    { name: 'Email Campaigns', percent: 5, color: '#fef3c7' },
];


interface StatCardProps {
    title: string;
    value: string;
    change: string;
    positive: boolean;
    icon: React.ComponentType<{ className?: string }>;
    isSelected?: boolean;
    onClick?: () => void;
}

function StatCard({ title, value, change, positive, icon: Icon, isSelected, onClick }: StatCardProps) {
    return (
        <Card
            onClick={onClick}
            className={`cursor-pointer border transition-colors ${isSelected ? 'bg-orange-400 border-orange-400' : 'bg-white border-gray-100'}`}
        >
            <CardContent className="p-5">
                <div className="flex items-center justify-between mb-4">
                    <p className={`text-sm font-medium ${isSelected ? 'text-orange-100' : 'text-gray-500'}`}>{title}</p>
                    <div className={`p-2.5 rounded-xl ${isSelected ? 'bg-white/30' : 'bg-gray-200'}`}>
                        <Icon className={`h-5 w-5 ${isSelected ? 'text-white' : 'text-gray-500'}`} />
                    </div>
                </div>
                <div className="flex items-end justify-between">
                    <p className={`text-xl font-bold ${isSelected ? 'text-white' : 'text-gray-900'}`}>{value}</p>
                    <div className="flex flex-col items-end gap-0.5">
                        <div className="flex items-center gap-1">
                            {positive
                                ? <ArrowUpRight className="h-3 w-3 : text-green-500 "/>
                                : <ArrowDownRight className="h-3 w-3 text-red-500 "/>}
                            <span className={`text-xs font-semibold ${ positive ? 'text-green-600' : 'text-red-500'}`}>{change}</span>
                        </div>
                        <span className={`text-xs ${isSelected ? 'text-orange-100' : 'text-gray-400'}`}>vs last week</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}



const revenueRanges = ['Last 8 Days', 'Last 30 Days', 'Last 3 Months', 'Last Year'];

function RevenueAnalytics() {
    const [range, setRange] = useState('Last 8 Days');
    return (
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
                            {revenueRanges.map(r => (
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
                <ResponsiveContainer width="100%" height={180}>
                    <LineChart data={revenueData}>
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
    );
}


function MonthlyTarget() {
    const percent = 85;
    const r = 52;
    const circ = 2 * Math.PI * r;
    const offset = circ * (1 - percent / 100);

    return (
        <Card className="bg-white border border-gray-100">
            <CardHeader className="pb-2 px-5 pt-5">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-semibold text-gray-800">Monthly Target</CardTitle>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button className="text-gray-400 hover:text-gray-600 p-1">
                                <MoreHorizontal className="h-4 w-4" />
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuItem>Export</DropdownMenuItem>
                            <DropdownMenuItem>Set New Target</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </CardHeader>
            <CardContent className="px-5 pb-5 flex flex-col items-center">
                <div className="relative w-32 h-32 my-2">
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                        <circle cx="60" cy="60" r={r} fill="none" stroke="#fed7aa" strokeWidth="12" />
                        <circle cx="60" cy="60" r={r} fill="none" stroke="#f97316" strokeWidth="12"
                            strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round" />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-2xl font-bold text-gray-900">{percent}%</span>
                    </div>
                </div>
                <p className="text-xs text-green-500 font-medium">+8.02% from last month</p>
                <p className="text-sm font-semibold text-gray-800 mt-1">Great Progress! 🎉</p>
                <p className="text-xs text-gray-400 text-center mt-1">
                    Our achievement increased by <span className="text-orange-500 font-medium">$200,000</span>, let's reach 100% next month.
                </p>
                <div className="flex gap-6 mt-4 w-full justify-center">
                    <div className="text-center">
                        <p className="text-xs text-gray-400">Target</p>
                        <p className="text-sm font-bold text-gray-800">$600,000</p>
                    </div>
                    <div className="text-center">
                        <p className="text-xs text-gray-400">Revenue</p>
                        <p className="text-sm font-bold text-gray-800">$510,000</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}


function TopCategories() {
    const total = donutData.reduce((s, d) => s + d.value, 0);
    let cumulative = 0;
    const slices = donutData.map(d => {
        const start = cumulative;
        cumulative += d.value / total;
        return { ...d, start, end: cumulative };
    });

    const r = 45;
    const cx = 60; const cy = 60;

    function describeArc(startAngle: number, endAngle: number) {
        const s = startAngle * 2 * Math.PI - Math.PI / 2;
        const e = endAngle * 2 * Math.PI - Math.PI / 2;
        const x1 = cx + r * Math.cos(s); const y1 = cy + r * Math.sin(s);
        const x2 = cx + r * Math.cos(e); const y2 = cy + r * Math.sin(e);
        const large = endAngle - startAngle > 0.5 ? 1 : 0;
        return `M ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2}`;
    }

    return (
        <Card className="bg-white border border-gray-100">
            <CardHeader className="pb-2 px-5 pt-5">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-semibold text-gray-800">Top Categories</CardTitle>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button className="text-xs text-orange-500 font-medium hover:underline">See All</button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem>View All Categories</DropdownMenuItem>
                            <DropdownMenuItem>Export Report</DropdownMenuItem>
                            <DropdownMenuItem>Manage Categories</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </CardHeader>
            <CardContent className="px-5 pb-5">
                <div className="flex justify-center my-2">
                    <div className="relative w-32 h-32">
                        <svg viewBox="0 0 120 120" className="w-full h-full">
                            {slices.map((s, i) => (
                                <path key={i} d={describeArc(s.start, s.end)} fill="none"
                                    stroke={s.color} strokeWidth="18" />
                            ))}
                            <circle cx="60" cy="60" r="30" fill="white" />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <p className="text-[9px] text-gray-400">Total Sales</p>
                            <p className="text-xs font-bold text-gray-800">$3.4M</p>
                        </div>
                    </div>
                </div>
                <div className="space-y-2 mt-2">
                    {categories.map(c => (
                        <div key={c.name} className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <span className="h-2.5 w-2.5 rounded-full shrink-0" style={{ background: c.color }} />
                                <span className="text-xs text-gray-600">{c.name}</span>
                            </div>
                            <span className="text-xs font-medium text-gray-800">{c.value}</span>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}



function ActiveUser() {
    return (
        <Card className="bg-white border border-gray-100">
            <CardHeader className="pb-2 px-5 pt-5">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-semibold text-gray-800">Active User</CardTitle>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button className="text-gray-400 hover:text-gray-600 p-1">
                                <MoreHorizontal className="h-4 w-4" />
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem>View All Users</DropdownMenuItem>
                            <DropdownMenuItem>Export Data</DropdownMenuItem>
                            <DropdownMenuItem>Filter by Region</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </CardHeader>
            <CardContent className="px-5 pb-5">
                <div className="flex items-end gap-3 mb-3">
                    <span className="text-3xl font-bold text-gray-900">2,758</span>
                    <div className="mb-1">
                        <span className="text-xs text-green-500 font-medium">+8.02%</span>
                        <p className="text-xs text-gray-400">from last month</p>
                    </div>
                </div>
                <div className="space-y-3">
                    {activeUsers.map(u => (
                        <div key={u.country}>
                            <div className="flex justify-between mb-1">
                                <span className="text-xs text-gray-600">{u.country}</span>
                                <span className="text-xs font-medium text-gray-700">{u.percent}%</span>
                            </div>
                            <Progress value={u.percent} className="h-1.5 bg-orange-100 [&>div]:bg-orange-500" />
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}


const conversionRanges = ['This Week', 'This Month', 'Last 3 Months'];

function ConversionRate() {
    const [range, setRange] = useState('This Week');


    return (
        <Card className="bg-white border border-gray-100">
            <CardHeader className="pb-2 px-5 pt-5">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-semibold text-gray-800">Conversion Rate</CardTitle>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button className="flex items-center gap-1 bg-orange-500 text-white text-xs px-3 py-1.5 rounded-lg font-medium">
                                {range} <ChevronDown className="h-3 w-3" />
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            {conversionRanges.map(r => (
                                <DropdownMenuItem key={r} onClick={() => setRange(r)}>{r}</DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </CardHeader>
            <CardContent className="px-3 pb-4">
                <ResponsiveContainer width="100%" height={160}>
                    <BarChart data={conversionData} barSize={28}>
                        <XAxis dataKey="label" tick={{ fontSize: 9, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                        <YAxis hide />
                        <Tooltip
                            formatter={(val: number) => [val.toLocaleString(), '']}
                            contentStyle={{ fontSize: 11, borderRadius: 8 }}
                        />
                        <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                            {conversionData.map((_, i) => (
                                <Cell key={i} fill={i < 3 ? '#fdba74' : '#f97316'} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
                <div className="grid grid-cols-5 gap-1 mt-1">
                    {conversionData.map(d => (
                        <div key={d.label} className="text-center">
                            <p className="text-xs font-semibold text-gray-800">{(d.value / 1000).toFixed(0)}k</p>
                            <p className={`text-[10px] font-medium ${d.positive ? 'text-green-500' : 'text-red-500'}`}>{d.change}</p>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}



function TrafficSources() {
    return (
        <Card className="bg-white border border-gray-100">
            <CardHeader className="pb-2 px-5 pt-5">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-semibold text-gray-800">Traffic Sources</CardTitle>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button className="text-gray-400 hover:text-gray-600 p-1">
                                <MoreHorizontal className="h-4 w-4" />
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuItem>Export Report</DropdownMenuItem>
                            <DropdownMenuItem>Configure Sources</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </CardHeader>
            <CardContent className="px-5 pb-5">
                {/* Stacked bar */}
                <div className="flex h-3 rounded-full overflow-hidden mb-4 gap-0.5">
                    {trafficSources.map(s => (
                        <div key={s.name} style={{ width: `${s.percent}%`, background: s.color }} />
                    ))}
                </div>
                <div className="space-y-2">
                    {trafficSources.map(s => (
                        <div key={s.name} className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <span className="h-2.5 w-2.5 rounded-full shrink-0" style={{ background: s.color }} />
                                <span className="text-xs text-gray-600">{s.name}</span>
                            </div>
                            <span className="text-xs font-medium text-gray-800">{s.percent}%</span>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}

const DashBoard = () => {
    const [selectedCard, setSelectedCard] = useState<number>(0);
    return (
        <div className="flex gap-4 h-full">
            {/* LEFT COLUMN */}
            <div className="flex-1 flex flex-col gap-4 min-w-0">
                {/* Row 1: Stat Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <StatCard title="Total Sales" value="$983,410" change="+1.34%" positive={true} icon={ShoppingBag} isSelected={selectedCard === 0} onClick={() => setSelectedCard(0)} />
                    <StatCard title="Total Orders" value="58,375" change="-2.89%" positive={false} icon={ShoppingCart} isSelected={selectedCard === 1} onClick={() => setSelectedCard(1)} />
                    <StatCard title="Total Visitors" value="237,782" change="+8.02%" positive={true} icon={Users} isSelected={selectedCard === 2} onClick={() => setSelectedCard(2)} />
                </div>

                {/* Row 2: Revenue + Monthly Target */}
                <div className="flex gap-4">
                    <div className="flex-1 min-w-0"><RevenueAnalytics /></div>
                    <div className="w-64 shrink-0"><MonthlyTarget /></div>
                </div>

                {/* Row 3: Active User + Conversion Rate */}
                <div className="flex gap-4">
                    <div className="w-56 shrink-0"><ActiveUser /></div>
                    <div className="flex-1 min-w-0"><ConversionRate /></div>
                </div>
            </div>

            {/* RIGHT COLUMN */}
            <div className="w-64 shrink-0 flex flex-col gap-4">
                <TopCategories />
                <TrafficSources />
            </div>
        </div>
    );
};

export default DashBoard;
