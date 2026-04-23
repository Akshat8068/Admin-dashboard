import {
  Settings,
  User,
  Shield,
  Bell,
  Key,
  CreditCard,
  Globe,
  Lock,
  Mail
} from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-800">Settings</h1>
        <p className="text-gray-500 text-sm mt-1">Manage your account settings and preferences</p>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList className="inline-flex w-auto bg-orange-50 border border-orange-100 rounded-xl p-1 gap-1">
          {[
            { value: 'general', icon: <Settings className="w-4 h-4" />, label: 'General' },
            { value: 'security', icon: <Shield className="w-4 h-4" />, label: 'Security' },
            { value: 'notifications', icon: <Bell className="w-4 h-4" />, label: 'Notifications' },
            { value: 'api', icon: <Key className="w-4 h-4" />, label: 'API' },
            { value: 'billing', icon: <CreditCard className="w-4 h-4" />, label: 'Billing' },
          ].map(tab => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium text-gray-500
                data-[state=active]:bg-orange-500 data-[state=active]:text-white data-[state=active]:shadow-sm
                hover:text-orange-500 transition-colors"
            >
              {tab.icon}
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general" className="space-y-6">
          <Card className="bg-white border border-orange-100 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center text-gray-800">
                <User className="mr-2 h-5 w-5 text-orange-500" />
                Profile Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-gray-700">Full Name</Label>
                  <Input id="name" defaultValue="A" className="border-orange-100 focus:border-orange-400 focus:ring-orange-400" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-700">Email Address</Label>
                  <Input id="email" type="email" defaultValue="a@gmail.com" className="border-orange-100 focus:border-orange-400 focus:ring-orange-400" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio" className="text-gray-700">Bio</Label>
                <Textarea id="bio" placeholder="Tell us about yourself..." className="border-orange-100 focus:border-orange-400 focus:ring-orange-400" />
              </div>
              <Button className="bg-orange-500 hover:bg-orange-600 text-white">Save Changes</Button>
            </CardContent>
          </Card>

          <Card className="bg-white border border-orange-100 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center text-gray-800">
                <Globe className="mr-2 h-5 w-5 text-orange-500" />
                Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="language" className="text-gray-700">Language</Label>
                  <Select defaultValue="en">
                    <SelectTrigger className="border-orange-100 focus:ring-orange-400">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                      <SelectItem value="de">German</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone" className="text-gray-700">Timezone</Label>
                  <Select defaultValue="utc">
                    <SelectTrigger className="border-orange-100 focus:ring-orange-400">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="utc">UTC</SelectItem>
                      <SelectItem value="est">Eastern Time</SelectItem>
                      <SelectItem value="pst">Pacific Time</SelectItem>
                      <SelectItem value="gmt">GMT</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button className="bg-orange-500 hover:bg-orange-600 text-white">Save Preferences</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security" className="space-y-6">
          <Card className="bg-white border border-orange-100 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center text-gray-800">
                <Lock className="mr-2 h-5 w-5 text-orange-500" />
                Password & Authentication
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password" className="text-gray-700">Current Password</Label>
                <Input id="current-password" type="password" className="border-orange-100 focus:border-orange-400" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password" className="text-gray-700">New Password</Label>
                <Input id="new-password" type="password" className="border-orange-100 focus:border-orange-400" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password" className="text-gray-700">Confirm New Password</Label>
                <Input id="confirm-password" type="password" className="border-orange-100 focus:border-orange-400" />
              </div>
              <Button className="bg-orange-500 hover:bg-orange-600 text-white">Update Password</Button>
            </CardContent>
          </Card>

          <Card className="bg-white border border-orange-100 shadow-sm">
            <CardHeader>
              <CardTitle className="text-gray-800">Two-Factor Authentication</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-gray-700">Enable 2FA</Label>
                  <p className="text-sm text-gray-400">Add an extra layer of security to your account</p>
                </div>
                <Switch className="data-[state=checked]:bg-orange-500" />
              </div>
              <Separator className="bg-orange-100" />
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-gray-700">Backup Codes</h4>
                <p className="text-sm text-gray-400">Generate backup codes if you lose access to your authenticator app</p>
                <Button variant="outline" className="border-orange-200 text-orange-500 hover:bg-orange-50">Generate Backup Codes</Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border border-orange-100 shadow-sm">
            <CardHeader>
              <CardTitle className="text-gray-800">Active Sessions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {[
                  { device: 'Chrome on Windows', location: 'New York, US', current: true },
                  { device: 'Safari on iPhone', location: 'San Francisco, US', current: false },
                  { device: 'Firefox on Linux', location: 'London, UK', current: false },
                ].map((session, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                    <div>
                      <div className="font-medium text-gray-800">{session.device}</div>
                      <div className="text-sm text-gray-400">{session.location}</div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {session.current
                        ? <span className="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded-full font-medium">Current</span>
                        : <Button variant="outline" size="sm" className="border-orange-200 text-orange-500 hover:bg-orange-50">Revoke</Button>
                      }
                    </div>
                  </div>
                ))}
              </div>
              <Button className="bg-red-500 hover:bg-red-600 text-white">Revoke All Other Sessions</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Settings */}
        <TabsContent value="notifications" className="space-y-6">
          <Card className="bg-white border border-orange-100 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center text-gray-800">
                <Mail className="mr-2 h-5 w-5 text-orange-500" />
                Email Notifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { label: 'Security alerts', description: 'Get notified about security events' },
                { label: 'Product updates', description: 'Receive updates about new features' },
                { label: 'Marketing emails', description: 'Promotional content and offers' },
                { label: 'Weekly reports', description: 'Weekly summary of your activity' },
              ].map((n) => (
                <div key={n.label} className="flex items-center justify-between py-2">
                  <div>
                    <Label className="text-gray-700">{n.label}</Label>
                    <p className="text-sm text-gray-400">{n.description}</p>
                  </div>
                  <Switch defaultChecked className="data-[state=checked]:bg-orange-500" />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-white border border-orange-100 shadow-sm">
            <CardHeader>
              <CardTitle className="text-gray-800">Push Notifications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { label: 'Real-time alerts', description: 'Immediate notifications for critical events' },
                { label: 'Daily summaries', description: 'Daily digest of your activity' },
                { label: 'Team mentions', description: 'When someone mentions you in a comment' },
              ].map((n) => (
                <div key={n.label} className="flex items-center justify-between py-2">
                  <div>
                    <Label className="text-gray-700">{n.label}</Label>
                    <p className="text-sm text-gray-400">{n.description}</p>
                  </div>
                  <Switch defaultChecked className="data-[state=checked]:bg-orange-500" />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* API Settings */}
        <TabsContent value="api" className="space-y-6">
          <Card className="bg-white border border-orange-100 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center text-gray-800">
                <Key className="mr-2 h-5 w-5 text-orange-500" />
                API Keys
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-400">Use API keys to authenticate requests. Keep your keys secure.</p>
              <div className="space-y-3">
                {[
                  { name: 'Production API Key', lastUsed: '2 hours ago', created: 'Jan 15, 2024' },
                  { name: 'Development API Key', lastUsed: '1 day ago', created: 'Jan 10, 2024' },
                ].map((key, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                    <div>
                      <div className="font-medium text-gray-800">{key.name}</div>
                      <div className="text-sm text-gray-400">Last used: {key.lastUsed} • Created: {key.created}</div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" className="border-orange-200 text-orange-500 hover:bg-orange-50">Regenerate</Button>
                      <Button size="sm" className="bg-red-500 hover:bg-red-600 text-white">Delete</Button>
                    </div>
                  </div>
                ))}
              </div>
              <Button className="bg-orange-500 hover:bg-orange-600 text-white">Create New API Key</Button>
            </CardContent>
          </Card>

          <Card className="bg-white border border-orange-100 shadow-sm">
            <CardHeader>
              <CardTitle className="text-gray-800">Webhooks</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-400">Configure webhooks to receive real-time event notifications.</p>
              <div className="space-y-2">
                <Label htmlFor="webhook-url" className="text-gray-700">Webhook URL</Label>
                <Input id="webhook-url" placeholder="https://your-app.com/webhooks" className="border-orange-100 focus:border-orange-400" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="webhook-events" className="text-gray-700">Events</Label>
                <Select>
                  <SelectTrigger className="border-orange-100 focus:ring-orange-400">
                    <SelectValue placeholder="Select events to subscribe to" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="user.created">User Created</SelectItem>
                    <SelectItem value="user.updated">User Updated</SelectItem>
                    <SelectItem value="order.completed">Order Completed</SelectItem>
                    <SelectItem value="payment.failed">Payment Failed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button className="bg-orange-500 hover:bg-orange-600 text-white">Add Webhook</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Billing */}
        <TabsContent value="billing" className="space-y-6">
          <Card className="bg-white border border-orange-100 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center text-gray-800">
                <CreditCard className="mr-2 h-5 w-5 text-orange-500" />
                Billing Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-orange-50 p-4 rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-gray-800">Pro Plan</h3>
                    <p className="text-sm text-gray-400">$29/month • Next billing: Feb 15, 2024</p>
                  </div>
                  <Button variant="outline" size="sm" className="border-orange-200 text-orange-500 hover:bg-orange-50">Change Plan</Button>
                </div>
              </div>
              <div className="space-y-3">
                <h4 className="font-medium text-gray-700">Payment Method</h4>
                <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-6 bg-orange-500 rounded text-white text-xs flex items-center justify-center font-bold">
                      VISA
                    </div>
                    <div>
                      <div className="font-medium text-gray-800">•••• •••• •••• 4242</div>
                      <div className="text-sm text-gray-400">Expires 12/2025</div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="border-orange-200 text-orange-500 hover:bg-orange-50">Update</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border border-orange-100 shadow-sm">
            <CardHeader>
              <CardTitle className="text-gray-800">Billing History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { date: 'Jan 15, 2024', amount: '$29.00', status: 'Paid' },
                  { date: 'Dec 15, 2023', amount: '$29.00', status: 'Paid' },
                  { date: 'Nov 15, 2023', amount: '$29.00', status: 'Paid' },
                ].map((invoice, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                    <div>
                      <div className="font-medium text-gray-800">{invoice.date}</div>
                      <div className="text-sm text-gray-400">{invoice.amount}</div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded-full font-medium">{invoice.status}</span>
                      <Button variant="outline" size="sm" className="border-orange-200 text-orange-500 hover:bg-orange-50">Download</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
