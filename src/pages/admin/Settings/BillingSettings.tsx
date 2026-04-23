import { CreditCard, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const billingHistory = [
    { date: 'Jan 15, 2024', amount: '$29.00', status: 'Paid' },
    { date: 'Dec 15, 2023', amount: '$29.00', status: 'Paid' },
    { date: 'Nov 15, 2023', amount: '$29.00', status: 'Paid' },
];

const BillingSettings = () => {
    return (
        <div className="space-y-5">
            {/* Billing Info */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center gap-2 mb-5">
                    <CreditCard className="h-5 w-5 text-gray-700" />
                    <h2 className="text-lg font-semibold text-gray-900">Billing Information</h2>
                </div>

                {/* Current Plan */}
                <div className="bg-gray-50 rounded-lg p-4 flex items-center justify-between mb-5">
                    <div>
                        <p className="font-semibold text-gray-900">Pro Plan</p>
                        <p className="text-sm text-gray-500">$29/month · Next billing: Feb 15, 2024</p>
                    </div>
                    <Button variant="outline" size="sm">Change Plan</Button>
                </div>

                {/* Payment Method */}
                <p className="text-sm font-medium text-gray-700 mb-3">Payment Method</p>
                <div className="border border-gray-200 rounded-lg p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="bg-indigo-600 text-white text-xs font-bold px-2 py-1 rounded">VISA</div>
                        <div>
                            <p className="text-sm font-medium text-gray-900">···· ···· ···· 4242</p>
                            <p className="text-xs text-gray-500">Expires 12/2025</p>
                        </div>
                    </div>
                    <Button variant="outline" size="sm">Update</Button>
                </div>
            </div>

            {/* Billing History */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-5">Billing History</h2>
                <div className="space-y-3">
                    {billingHistory.map((item, i) => (
                        <div key={i} className="border border-gray-200 rounded-lg p-4 flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-900">{item.date}</p>
                                <p className="text-sm text-gray-500">{item.amount}</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <Badge className="bg-green-100 text-green-700 hover:bg-green-100">{item.status}</Badge>
                                <Button variant="outline" size="sm" className="flex items-center gap-1.5">
                                    <Download className="h-3.5 w-3.5" />
                                    Download
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BillingSettings;
