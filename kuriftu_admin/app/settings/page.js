"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../components/ui/card";
import { Save, RefreshCw, Lock, Bell, Mail, Smartphone, Shield } from "lucide-react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Settings() {
  // Initialize state with default settings
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('settings');
    return saved ? JSON.parse(saved) : {
      general: {
        resortName: "Kuriftu Resort and Spa",
        adminEmail: "admin@kuriftu.com",
        defaultLanguage: "English",
        timeZone: "Africa/Addis_Ababa (GMT+3)",
        maintenanceMode: false,
      },
      notifications: {
        newMember: true,
        email: true,
        sms: false,
        security: true,
      },
      blockchain: {
        miningRate: 0.5,
        earningRate: {
          Explorer: 1.0,
          Adventurer: 1.5,
          Pioneer: 2.0,
        },
        network: "Ethereum",
        enableMining: true,
      },
      security: {
        twoFactorAuth: true,
        sessionTimeout: 30,
        passwordPolicy: "Strong (8+ chars, special chars, numbers)",
      },
      api: {
        apiKey: "krf_api_12345678abcdefgh",
        lastRegenerated: "2023-03-15",
        rateLimit: "100 requests/minute",
        enableAPI: true,
      },
      system: {
        version: "1.0.0",
        lastUpdated: "2023-04-12",
        databaseStatus: "Connected",
        blockchainStatus: "Active",
        aiSystem: "Running",
      },
    };
  });

  // Persist settings to localStorage
  useEffect(() => {
    localStorage.setItem('settings', JSON.stringify(settings));
  }, [settings]);

  // Handle input changes
  const handleInputChange = (section, field, value) => {
    setSettings((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  // Handle nested input changes (e.g., earningRate)
  const handleNestedInputChange = (section, parentField, subField, value) => {
    setSettings((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [parentField]: {
          ...prev[section][parentField],
          [subField]: value,
        },
      },
    }));
  };

  // Validate settings
  const validateSettings = () => {
    if (!settings.general.resortName) return "Resort name is required";
    if (!settings.general.adminEmail.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) return "Invalid admin email";
    if (settings.blockchain.miningRate < 0.1 || settings.blockchain.miningRate > 10) return "Mining rate must be between 0.1 and 10";
    if (settings.security.sessionTimeout < 5 || settings.security.sessionTimeout > 120) return "Session timeout must be between 5 and 120 minutes";
    for (const tier of ['Explorer', 'Adventurer', 'Pioneer']) {
      if (settings.blockchain.earningRate[tier] < 0 || settings.blockchain.earningRate[tier] > 10) {
        return `${tier} earning rate must be between 0 and 10`;
      }
    }
    return null;
  };

  // Save Changes button handler
  const handleSaveChanges = () => {
    const error = validateSettings();
    if (error) {
      toast.error(error);
      return;
    }
    // Simulate API call
    toast.success("Settings saved successfully");
    // Optional: Backend API call
    /*
    fetch('http://localhost:5000/settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(settings),
    }).catch(() => toast.warn('Backend update failed, changes saved locally'));
    */
  };

  // Update Security Settings button handler
  const handleUpdateSecurity = () => {
    if (settings.security.sessionTimeout < 5 || settings.security.sessionTimeout > 120) {
      toast.error("Session timeout must be between 5 and 120 minutes");
      return;
    }
    toast.success("Security settings updated");
    // Optional: Backend API call
  };

  // Regenerate API Key button handler
  const handleRegenerateApiKey = () => {
    const newKey = `krf_api_${Math.random().toString(36).substring(2, 15)}`;
    setSettings((prev) => ({
      ...prev,
      api: {
        ...prev.api,
        apiKey: newKey,
        lastRegenerated: new Date().toISOString().split('T')[0],
      },
    }));
    toast.success("API key regenerated");
  };

  // Check for Updates button handler
  const handleCheckUpdates = () => {
    // Simulate update check
    toast.info("Checking for updates...");
    setTimeout(() => {
      toast.success("System is up to date (v1.0.0)");
    }, 1000);
  };

  // Toggle handler
  const handleToggle = (section, field) => {
    setSettings((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: !prev[section][field],
      },
    }));
  };

  return (
    <div className="p-6">
      <ToastContainer />
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-kuriftu-black">Settings</h1>
          <p className="text-gray-500">Configure system settings and preferences</p>
        </div>
        <button
          onClick={handleSaveChanges}
          className="bg-kuriftu-green text-white px-4 py-2 rounded-md flex items-center"
        >
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
                  <input
                    type="text"
                    value={settings.general.resortName}
                    onChange={(e) => handleInputChange('general', 'resortName', e.target.value)}
                    className="w-full p-2 border rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Admin Email</label>
                  <input
                    type="email"
                    value={settings.general.adminEmail}
                    onChange={(e) => handleInputChange('general', 'adminEmail', e.target.value)}
                    className="w-full p-2 border rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Default Language</label>
                  <select
                    value={settings.general.defaultLanguage}
                    onChange={(e) => handleInputChange('general', 'defaultLanguage', e.target.value)}
                    className="w-full p-2 border rounded-md"
                  >
                    <option>English</option>
                    <option>Amharic</option>
                    <option>French</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Time Zone</label>
                  <select
                    value={settings.general.timeZone}
                    onChange={(e) => handleInputChange('general', 'timeZone', e.target.value)}
                    className="w-full p-2 border rounded-md"
                  >
                    <option>Africa/Addis_Ababa (GMT+3)</option>
                    <option>UTC</option>
                    <option>America/New_York</option>
                  </select>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="enableMaintenance"
                    checked={settings.general.maintenanceMode}
                    onChange={() => handleToggle('general', 'maintenanceMode')}
                    className="mr-2"
                  />
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
                    <input
                      type="checkbox"
                      id="newMemberToggle"
                      className="sr-only"
                      checked={settings.notifications.newMember}
                      onChange={() => handleToggle('notifications', 'newMember')}
                    />
                    <span className={`block h-6 w-12 rounded-full ${settings.notifications.newMember ? 'bg-kuriftu-green' : 'bg-gray-200'} cursor-pointer`}></span>
                    <span className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-200 ease-in-out transform ${settings.notifications.newMember ? 'translate-x-6' : ''}`}></span>
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
                    <input
                      type="checkbox"
                      id="emailToggle"
                      className="sr-only"
                      checked={settings.notifications.email}
                      onChange={() => handleToggle('notifications', 'email')}
                    />
                    <span className={`block h-6 w-12 rounded-full ${settings.notifications.email ? 'bg-kuriftu-green' : 'bg-gray-200'} cursor-pointer`}></span>
                    <span className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-200 ease-in-out transform ${settings.notifications.email ? 'translate-x-6' : ''}`}></span>
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
                    <input
                      type="checkbox"
                      id="smsToggle"
                      className="sr-only"
                      checked={settings.notifications.sms}
                      onChange={() => handleToggle('notifications', 'sms')}
                    />
                    <span className={`block h-6 w-12 rounded-full ${settings.notifications.sms ? 'bg-kuriftu-green' : 'bg-gray-200'} cursor-pointer`}></span>
                    <span className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-200 ease-in-out transform ${settings.notifications.sms ? 'translate-x-6' : ''}`}></span>
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
                    <input
                      type="checkbox"
                      id="securityToggle"
                      className="sr-only"
                      checked={settings.notifications.security}
                      onChange={() => handleToggle('notifications', 'security')}
                    />
                    <span className={`block h-6 w-12 rounded-full ${settings.notifications.security ? 'bg-kuriftu-green' : 'bg-gray-200'} cursor-pointer`}></span>
                    <span className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-200 ease-in-out transform ${settings.notifications.security ? 'translate-x-6' : ''}`}></span>
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
                    value={settings.blockchain.miningRate}
                    step="0.1"
                    min="0.1"
                    max="10"
                    onChange={(e) => handleInputChange('blockchain', 'miningRate', parseFloat(e.target.value))}
                    className="w-full p-2 border rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Earning Rate (coins/$10 spent)</label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Explorer</label>
                      <input
                        type="number"
                        value={settings.blockchain.earningRate.Explorer}
                        step="0.1"
                        min="0"
                        max="10"
                        onChange={(e) => handleNestedInputChange('blockchain', 'earningRate', 'Explorer', parseFloat(e.target.value))}
                        className="w-full p-2 border rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Adventurer</label>
                      <input
                        type="number"
                        value={settings.blockchain.earningRate.Adventurer}
                        step="0.1"
                        min="0"
                        max="10"
                        onChange={(e) => handleNestedInputChange('blockchain', 'earningRate', 'Adventurer', parseFloat(e.target.value))}
                        className="w-full p-2 border rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Pioneer</label>
                      <input
                        type="number"
                        value={settings.blockchain.earningRate.Pioneer}
                        step="0.1"
                        min="0"
                        max="10"
                        onChange={(e) => handleNestedInputChange('blockchain', 'earningRate', 'Pioneer', parseFloat(e.target.value))}
                        className="w-full p-2 border rounded-md"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Blockchain Network</label>
                  <select
                    value={settings.blockchain.network}
                    onChange={(e) => handleInputChange('blockchain', 'network', e.target.value)}
                    className="w-full p-2 border rounded-md"
                  >
                    <option>Ethereum</option>
                    <option>Binance Smart Chain</option>
                    <option>Polygon</option>
                    <option>Private Network</option>
                  </select>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="enableMining"
                    checked={settings.blockchain.enableMining}
                    onChange={() => handleToggle('blockchain', 'enableMining')}
                    className="mr-2"
                  />
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
                    <input
                      type="checkbox"
                      id="enable2FA"
                      checked={settings.security.twoFactorAuth}
                      onChange={() => handleToggle('security', 'twoFactorAuth')}
                      className="mr-2"
                    />
                    <label htmlFor="enable2FA" className="text-sm">
                      Enable for all admins
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Session Timeout (minutes)</label>
                  <input
                    type="number"
                    value={settings.security.sessionTimeout}
                    min="5"
                    max="120"
                    onChange={(e) => handleInputChange('security', 'sessionTimeout', parseInt(e.target.value))}
                    className="w-full p-2 border rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Password Policy</label>
                  <select
                    value={settings.security.passwordPolicy}
                    onChange={(e) => handleInputChange('security', 'passwordPolicy', e.target.value)}
                    className="w-full p-2 border rounded-md"
                  >
                    <option>Strong (8+ chars, special chars, numbers)</option>
                    <option>Medium (8+ chars, numbers)</option>
                    <option>Basic (6+ chars)</option>
                  </select>
                </div>

                <button
                  onClick={handleUpdateSecurity}
                  className="w-full bg-kuriftu-green/10 text-kuriftu-green p-2 rounded-md text-sm font-medium flex items-center justify-center mt-2"
                >
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
                      value={settings.api.apiKey}
                      className="w-full p-2 border rounded-l-md bg-gray-50"
                      readOnly
                    />
                    <button
                      onClick={handleRegenerateApiKey}
                      className="bg-gray-200 px-3 rounded-r-md"
                    >
                      <RefreshCw className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Last regenerated: {settings.api.lastRegenerated}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Rate Limiting</label>
                  <select
                    value={settings.api.rateLimit}
                    onChange={(e) => handleInputChange('api', 'rateLimit', e.target.value)}
                    className="w-full p-2 border rounded-md"
                  >
                    <option>100 requests/minute</option>
                    <option>500 requests/minute</option>
                    <option>1000 requests/minute</option>
                    <option>Unlimited</option>
                  </select>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="enableAPI"
                    checked={settings.api.enableAPI}
                    onChange={() => handleToggle('api', 'enableAPI')}
                    className="mr-2"
                  />
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
                  <span className="font-medium">{settings.system.version}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Last Updated</span>
                  <span className="font-medium">{settings.system.lastUpdated}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Database Status</span>
                  <span className="font-medium text-green-500">{settings.system.databaseStatus}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Blockchain Status</span>
                  <span className="font-medium text-green-500">{settings.system.blockchainStatus}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">AI System</span>
                  <span className="font-medium text-green-500">{settings.system.aiSystem}</span>
                </div>

                <button
                  onClick={handleCheckUpdates}
                  className="w-full bg-gray-100 text-gray-700 p-2 rounded-md text-sm font-medium flex items-center justify-center mt-2"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Check for Updates
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}