import { useState } from 'react';
import { ShoppingBag, ShoppingCart, Package, Users } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/UI/card';
import { ReportStatCard } from './ReportStatCard';
import { orderReportData } from '@/utils/mockReport';

const stats = [
    { title: 'Total Orders', value: '58,375', change: '+5.2%', positive: true, icon: ShoppingCart },
    { title: 'Completed', value: '51,200', change: '+6.1%', positive: true, icon: ShoppingBag },
    { title: 'Cancelled', value: '3,890', change: '-1.3%', positive: false, icon: Package },
    { title: 'Pending', value: '3,285', change: '+0.8%', positive: true, icon: Users },
];

const OrderReport = () => {
    const [selected, setSelected] = useState(0);
    return (
        <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                {stats.map((stat, i) => (
                    <ReportStatCard key={i} {...stat} isSelected={selected === i} onClick={() => setSelected(i)} />
                ))}
            </div>
            <Card className="bg-white border border-gray-100">
                <CardHeader className="pb-2 px-5 pt-5">
                    <CardTitle className="text-sm font-semibold text-gray-800">Order Trends (Last 8 Days)</CardTitle>
                </CardHeader>
                <CardContent className="px-2 pb-4">
                    <ResponsiveContainer width="100%" height={260}>
                        <BarChart data={orderReportData} barSize={20}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                            <XAxis dataKey="date" tick={{ fontSize: 10, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                            <YAxis tick={{ fontSize: 10, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                            <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8, border: '1px solid #f3f4f6' }} />
                            <Bar dataKey="completed" fill="#f97316" radius={[4, 4, 0, 0]} name="Completed" />
                            <Bar dataKey="cancelled" fill="#fdba74" radius={[4, 4, 0, 0]} name="Cancelled" />
                        </BarChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
        </div>
    );
};

export default OrderReport;
