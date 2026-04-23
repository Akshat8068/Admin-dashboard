import { useState } from 'react';
import { Mail, Bell } from 'lucide-react';
import { Switch } from '@/components/ui/switch';

interface NotifItem {
    id: string;
    title: string;
    description: string;
}

const emailNotifs: NotifItem[] = [
    { id: 'security_alerts', title: 'Security alerts', description: 'Get notified about security events' },
    { id: 'product_updates', title: 'Product updates', description: 'Receive updates about new features' },
    { id: 'marketing_emails', title: 'Marketing emails', description: 'Promotional content and offers' },
    { id: 'weekly_reports', title: 'Weekly reports', description: 'Weekly summary of your activity' },
];

const pushNotifs: NotifItem[] = [
    { id: 'new_orders', title: 'New orders', description: 'Get notified when a new order is placed' },
    { id: 'low_stock', title: 'Low stock alerts', description: 'Alert when product stock is running low' },
    { id: 'customer_messages', title: 'Customer messages', description: 'Notifications for new customer queries' },
];

const NotificationSettings = () => {
    const [enabled, setEnabled] = useState<Record<string, boolean>>({
        security_alerts: true,
        product_updates: true,
        marketing_emails: true,
        weekly_reports: true,
        new_orders: true,
        low_stock: false,
        customer_messages: true,
    });

    const toggle = (id: string) => setEnabled(prev => ({ ...prev, [id]: !prev[id] }));

    const NotifSection = ({ icon: Icon, title, items }: { icon: React.ComponentType<{ className?: string }>, title: string, items: NotifItem[] }) => (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-5">
                <Icon className="h-5 w-5 text-gray-700" />
                <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
            </div>
            <div className="divide-y divide-gray-100">
                {items.map(item => (
                    <div key={item.id} className="flex items-center justify-between py-4 first:pt-0 last:pb-0">
                        <div>
                            <p className="text-sm font-medium text-gray-900">{item.title}</p>
                            <p className="text-xs text-gray-500 mt-0.5">{item.description}</p>
                        </div>
                        <Switch
                            checked={enabled[item.id] ?? false}
                            onCheckedChange={() => toggle(item.id)}
                        />
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <div className="space-y-5">
            <NotifSection icon={Mail} title="Email Notifications" items={emailNotifs} />
            <NotifSection icon={Bell} title="Push Notifications" items={pushNotifs} />
        </div>
    );
};

export default NotificationSettings;
