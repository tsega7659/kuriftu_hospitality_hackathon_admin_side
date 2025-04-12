import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../components/ui/card"
import { Save, RefreshCw, Lock, Bell, Mail, Smartphone, Shield } from "lucide-react"

export default function Settings() {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-kuriftu-black">Settings</h1>
          <p className="text-gray-500">Configure system settings and preferences</p>
        </div>
        <button className="bg-kuriftu-green text-white px-4 py-2 rounded-md flex items-center">
          <Save className="w-4 h-4 mr-2" />
          Save Changes
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* General Settings */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-bold">General Settings</CardTitle>
              <CardDescription>Configure basic system settings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Resort Name</label>
                  <input type="text" value="Kuriftu Resort and Spa" className="w-full p-2 border rounded-md" />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Admin Email</label>
                  <input type="email" value="admin@kuriftu.com" className="w-full p-2 border rounded-md" />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Default Language</label>
                  <select className="w-full p-2 border rounded-md">
                    <option>English</option>
                    <option>Amharic</option>
                    <option>French</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Time Zone</label>
                  <select className="w-full p-2 border rounded-md">
                    <option>Africa/Addis_Ababa (GMT+3)</option>
                    <option>UTC</option>
                    <option>America/New_York</option>
                  </select>
                </div>

                <div className="flex items-center">
                  <input type="checkbox" id="enableMaintenance" className="mr-2" />
                  <label htmlFor="enableMaintenance" className="text-sm">
                    Enable Maintenance Mode
                  </label>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-bold">Notification Settings</CardTitle>
              <CardDescription>Configure system notifications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Bell className="w-5 h-5 mr-3 text-kuriftu-gold" />
                    <div>
                      <p className="font-medium">New Member Notifications</p>
                      <p className="text-sm text-gray-500">Receive notifications when new members register</p>
                    </div>
                  </div>
                  <div className="relative inline-block w-12 h-6">
                    <input type="checkbox" id="newMemberToggle" className="sr-only" defaultChecked />
                    <span className="block h-6 w-12 rounded-full bg-gray-200 cursor-pointer"></span>
                    <span className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-200 ease-in-out transform translate-x-6"></span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Mail className="w-5 h-5 mr-3 text-kuriftu-gold" />
                    <div>
                      <p className="font-medium">Email Notifications</p>
                      <p className="text-sm text-gray-500">Send email notifications for important events</p>
                    </div>
                  </div>
                  <div className="relative inline-block w-12 h-6">
                    <input type="checkbox" id="emailToggle" className="sr-only" defaultChecked />
                    <span className="block h-6 w-12 rounded-full bg-gray-200 cursor-pointer"></span>
                    <span className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-200 ease-in-out transform translate-x-6"></span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Smartphone className="w-5 h-5 mr-3 text-kuriftu-gold" />
                    <div>
                      <p className="font-medium">SMS Notifications</p>
                      <p className="text-sm text-gray-500">Send SMS notifications for critical alerts</p>
                    </div>
                  </div>
                  <div className="relative inline-block w-12 h-6">
                    <input type="checkbox" id="smsToggle" className="sr-only" />
                    <span className="block h-6 w-12 rounded-full bg-gray-200 cursor-pointer"></span>
                    <span className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-200 ease-in-out transform"></span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Shield className="w-5 h-5 mr-3 text-kuriftu-gold" />
                    <div>
                      <p className="font-medium">Security Alerts</p>
                      <p className="text-sm text-gray-500">Receive notifications about security events</p>
                    </div>
                  </div>
                  <div className="relative inline-block w-12 h-6">
                    <input type="checkbox" id="securityToggle" className="sr-only" defaultChecked />
                    <span className="block h-6 w-12 rounded-full bg-gray-200 cursor-pointer"></span>
                    <span className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-200 ease-in-out transform translate-x-6"></span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-bold">Blockchain Settings</CardTitle>
              <CardDescription>Configure blockchain and loyalty coin settings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Mining Rate (coins/hour)</label>
                  <input
                    type="number"
                    value="0.5"
                    step="0.1"
                    min="0.1"
                    max="10"
                    className="w-full p-2 border rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Earning Rate (coins/$10 spent)</label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Explorer</label>
                      <input type="number" value="1.0" step="0.1" className="w-full p-2 border rounded-md" />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Adventurer</label>
                      <input type="number" value="1.5" step="0.1" className="w-full p-2 border rounded-md" />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Pioneer</label>
                      <input type="number" value="2.0" step="0.1" className="w-full p-2 border rounded-md" />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Blockchain Network</label>
                  <select className="w-full p-2 border rounded-md">
                    <option>Ethereum</option>
                    <option>Binance Smart Chain</option>
                    <option>Polygon</option>
                    <option>Private Network</option>
                  </select>
                </div>

                <div className="flex items-center">
                  <input type="checkbox" id="enableMining" className="mr-2" defaultChecked />
                  <label htmlFor="enableMining" className="text-sm">
                    Enable Mining for Pioneer Members
                  </label>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Settings */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-bold">Security Settings</CardTitle>
              <CardDescription>Configure security options</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Two-Factor Authentication</label>
                  <div className="flex items-center mt-2">
                    <input type="checkbox" id="enable2FA" className="mr-2" defaultChecked />
                    <label htmlFor="enable2FA" className="text-sm">
                      Enable for all admins
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Session Timeout (minutes)</label>
                  <input type="number" value="30" min="5" max="120" className="w-full p-2 border rounded-md" />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Password Policy</label>
                  <select className="w-full p-2 border rounded-md">
                    <option>Strong (8+ chars, special chars, numbers)</option>
                    <option>Medium (8+ chars, numbers)</option>
                    <option>Basic (6+ chars)</option>
                  </select>
                </div>

                <button className="w-full bg-kuriftu-green/10 text-kuriftu-green p-2 rounded-md text-sm font-medium flex items-center justify-center mt-2">
                  <Lock className="w-4 h-4 mr-2" />
                  Update Security Settings
                </button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-bold">API Settings</CardTitle>
              <CardDescription>Configure API access</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">API Key</label>
                  <div className="flex">
                    <input
                      type="text"
                      value="krf_api_12345678abcdefgh"
                      className="w-full p-2 border rounded-l-md bg-gray-50"
                      readOnly
                    />
                    <button className="bg-gray-200 px-3 rounded-r-md">
                      <RefreshCw className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Last regenerated: 2023-03-15</p>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Rate Limiting</label>
                  <select className="w-full p-2 border rounded-md">
                    <option>100 requests/minute</option>
                    <option>500 requests/minute</option>
                    <option>1000 requests/minute</option>
                    <option>Unlimited</option>
                  </select>
                </div>

                <div className="flex items-center">
                  <input type="checkbox" id="enableAPI" className="mr-2" defaultChecked />
                  <label htmlFor="enableAPI" className="text-sm">
                    Enable API Access
                  </label>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-bold">System Information</CardTitle>
              <CardDescription>View system details</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Version</span>
                  <span className="font-medium">1.0.0</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Last Updated</span>
                  <span className="font-medium">April 12, 2023</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Database Status</span>
                  <span className="font-medium text-green-500">Connected</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Blockchain Status</span>
                  <span className="font-medium text-green-500">Active</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">AI System</span>
                  <span className="font-medium text-green-500">Running</span>
                </div>

                <button className="w-full bg-gray-100 text-gray-700 p-2 rounded-md text-sm font-medium flex items-center justify-center mt-2">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Check for Updates
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
