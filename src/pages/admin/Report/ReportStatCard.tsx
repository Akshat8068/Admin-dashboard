import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface StatCardProps {
    title: string;
    value: string;
    change: string;
    positive: boolean;
    icon: React.ComponentType<{ className?: string }>;
    isSelected?: boolean;
    onClick?: () => void;
}

export function ReportStatCard({ title, value, change, positive, icon: Icon, isSelected, onClick }: StatCardProps) {
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
                                ? <ArrowUpRight className="h-3 w-3 text-green-500" />
                                : <ArrowDownRight className="h-3 w-3 text-red-500" />}
                            <span className={`text-xs font-semibold ${positive ? 'text-green-600' : 'text-red-500'}`}>{change}</span>
                        </div>
                        <span className={`text-xs ${isSelected ? 'text-orange-100' : 'text-gray-400'}`}>vs last week</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
