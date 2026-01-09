'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/Button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import {
  Settings as SettingsIcon,
  Bell,
  Shield,
  Save,
  Mail,
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { createClient } from '@/lib/supabase/client';
import { toast } from 'sonner';

interface GeneralSettings {
  appName: string;
  companyName: string;
  supportEmail: string;
  timezone: string;
}

interface NotificationSettings {
  emailNotifications: boolean;
  pushNotifications: boolean;
  newUserRegistrations: boolean;
  assessmentCompletions: boolean;
  systemUpdates: boolean;
  weeklyReports: boolean;
}

export default function SettingsPage() {
  const [saving, setSaving] = useState(false);
  
  // General Settings
  const [generalSettings, setGeneralSettings] = useState<GeneralSettings>({
    appName: 'ORIGO Admin',
    companyName: 'ORIGO',
    supportEmail: 'support@origo.com',
    timezone: 'UTC+7 (Bangkok)',
  });

  // Notification Settings
  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>({
    emailNotifications: true,
    pushNotifications: false,
    newUserRegistrations: true,
    assessmentCompletions: true,
    systemUpdates: false,
    weeklyReports: false,
  });

  // Security Settings
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  // Load settings from localStorage on mount
  useEffect(() => {
    const savedGeneral = localStorage.getItem('general-settings');
    const savedNotifications = localStorage.getItem('notification-settings');
    const saved2FA = localStorage.getItem('two-factor-auth');

    if (savedGeneral) {
      setGeneralSettings(JSON.parse(savedGeneral));
    }
    if (savedNotifications) {
      setNotificationSettings(JSON.parse(savedNotifications));
    }
    if (saved2FA) {
      setTwoFactorAuth(JSON.parse(saved2FA));
    }
  }, []);

  const handleSaveGeneral = async () => {
    setSaving(true);
    try {
      // Save to localStorage
      localStorage.setItem('general-settings', JSON.stringify(generalSettings));
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('General settings saved successfully!');
    } catch (error) {
      toast.error('Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  const handleSaveNotifications = async () => {
    setSaving(true);
    try {
      // Save to localStorage
      localStorage.setItem('notification-settings', JSON.stringify(notificationSettings));
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('Notification preferences saved successfully!');
    } catch (error) {
      toast.error('Failed to save preferences');
    } finally {
      setSaving(false);
    }
  };

  const handleUpdatePassword = async () => {
    // Validate passwords
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }

    if (passwordForm.newPassword.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    setSaving(true);
    try {
      const supabase = createClient();
      
      // Update password in Supabase
      const { error } = await supabase.auth.updateUser({
        password: passwordForm.newPassword,
      });

      if (error) throw error;

      // Save 2FA setting
      localStorage.setItem('two-factor-auth', JSON.stringify(twoFactorAuth));
      
      toast.success('Password updated successfully! Please login again with your new password.');
      
      // Clear form
      setPasswordForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });

      // Optionally, sign out the user after password change
      // await supabase.auth.signOut();
      // window.location.href = '/admin/login';
      
    } catch (error: any) {
      toast.error(error.message || 'Failed to update password');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="general" className="space-y-4">
        <TabsList className="bg-[#111111]/80 border border-white/10">
          <TabsTrigger
            value="general"
            className="data-[state=active]:bg-[#febe5d] data-[state=active]:text-black"
          >
            <SettingsIcon className="w-4 h-4 mr-2" />
            General
          </TabsTrigger>
          <TabsTrigger
            value="notifications"
            className="data-[state=active]:bg-[#febe5d] data-[state=active]:text-black"
          >
            <Bell className="w-4 h-4 mr-2" />
            Notifications
          </TabsTrigger>
          <TabsTrigger
            value="security"
            className="data-[state=active]:bg-[#febe5d] data-[state=active]:text-black"
          >
            <Shield className="w-4 h-4 mr-2" />
            Security
          </TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general">
          <Card className="bg-[#111111]/80 backdrop-blur-xl border-white/10">
            <CardHeader>
              <CardTitle className="text-white">General Settings</CardTitle>
              <CardDescription className="text-neutral-400">
                Update your application general settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="app-name" className="text-white">
                  Application Name
                </Label>
                <Input
                  id="app-name"
                  value={generalSettings.appName}
                  onChange={(e) => setGeneralSettings({ ...generalSettings, appName: e.target.value })}
                  className="bg-black/40 border-white/10 text-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="company" className="text-white">
                  Company Name
                </Label>
                <Input
                  id="company"
                  value={generalSettings.companyName}
                  onChange={(e) => setGeneralSettings({ ...generalSettings, companyName: e.target.value })}
                  className="bg-black/40 border-white/10 text-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="support-email" className="text-white">
                  Support Email
                </Label>
                <Input
                  id="support-email"
                  type="email"
                  value={generalSettings.supportEmail}
                  onChange={(e) => setGeneralSettings({ ...generalSettings, supportEmail: e.target.value })}
                  className="bg-black/40 border-white/10 text-white"
                />
              </div>

              <Separator className="bg-white/10" />

              <div className="space-y-2">
                <Label htmlFor="timezone" className="text-white">
                  Timezone
                </Label>
                <Input
                  id="timezone"
                  value={generalSettings.timezone}
                  onChange={(e) => setGeneralSettings({ ...generalSettings, timezone: e.target.value })}
                  className="bg-black/40 border-white/10 text-white"
                />
              </div>

              <div className="flex justify-end">
                <Button
                  variant="default"
                  size="lg"
                  className="bg-[#febe5d] hover:bg-[#ffc978] text-black"
                  onClick={handleSaveGeneral}
                  disabled={saving}
                >
                  <Save className="mr-2 w-4 h-4" />
                  {saving ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications */}
        <TabsContent value="notifications">
          <Card className="bg-[#111111]/80 backdrop-blur-xl border-white/10">
            <CardHeader>
              <CardTitle className="text-white">Notification Preferences</CardTitle>
              <CardDescription className="text-neutral-400">
                Manage how you receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-neutral-400" />
                    <Label htmlFor="email-notif" className="text-white font-medium">
                      Email Notifications
                    </Label>
                  </div>
                  <p className="text-sm text-neutral-500">
                    Receive email updates about important events
                  </p>
                </div>
                <Switch
                  id="email-notif"
                  checked={notificationSettings.emailNotifications}
                  onCheckedChange={(checked) => 
                    setNotificationSettings({ ...notificationSettings, emailNotifications: checked })
                  }
                />
              </div>

              <Separator className="bg-white/10" />

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Bell className="w-4 h-4 text-neutral-400" />
                    <Label htmlFor="push-notif" className="text-white font-medium">
                      Push Notifications
                    </Label>
                  </div>
                  <p className="text-sm text-neutral-500">
                    Receive push notifications on your device
                  </p>
                </div>
                <Switch
                  id="push-notif"
                  checked={notificationSettings.pushNotifications}
                  onCheckedChange={(checked) => 
                    setNotificationSettings({ ...notificationSettings, pushNotifications: checked })
                  }
                />
              </div>

              <Separator className="bg-white/10" />

              <div className="space-y-4">
                <h3 className="text-white font-medium">Email Preferences</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="text-neutral-300 text-sm">New user registrations</Label>
                    <Switch
                      checked={notificationSettings.newUserRegistrations}
                      onCheckedChange={(checked) => 
                        setNotificationSettings({ ...notificationSettings, newUserRegistrations: checked })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label className="text-neutral-300 text-sm">Assessment completions</Label>
                    <Switch
                      checked={notificationSettings.assessmentCompletions}
                      onCheckedChange={(checked) => 
                        setNotificationSettings({ ...notificationSettings, assessmentCompletions: checked })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label className="text-neutral-300 text-sm">System updates</Label>
                    <Switch
                      checked={notificationSettings.systemUpdates}
                      onCheckedChange={(checked) => 
                        setNotificationSettings({ ...notificationSettings, systemUpdates: checked })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label className="text-neutral-300 text-sm">Weekly reports</Label>
                    <Switch
                      checked={notificationSettings.weeklyReports}
                      onCheckedChange={(checked) => 
                        setNotificationSettings({ ...notificationSettings, weeklyReports: checked })
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button
                  variant="default"
                  size="lg"
                  className="bg-[#febe5d] hover:bg-[#ffc978] text-black"
                  onClick={handleSaveNotifications}
                  disabled={saving}
                >
                  <Save className="mr-2 w-4 h-4" />
                  {saving ? 'Saving...' : 'Save Preferences'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security */}
        <TabsContent value="security">
          <Card className="bg-[#111111]/80 backdrop-blur-xl border-white/10">
            <CardHeader>
              <CardTitle className="text-white">Security Settings</CardTitle>
              <CardDescription className="text-neutral-400">
                Manage your account security and authentication
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="2fa" className="text-white font-medium">
                    Two-Factor Authentication
                  </Label>
                  <p className="text-sm text-neutral-500">
                    Add an extra layer of security to your account
                  </p>
                </div>
                <Switch
                  id="2fa"
                  checked={twoFactorAuth}
                  onCheckedChange={setTwoFactorAuth}
                />
              </div>

              <Separator className="bg-white/10" />

              <div className="space-y-4">
                <h3 className="text-white font-medium">Change Password</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password" className="text-white">
                      Current Password
                    </Label>
                    <Input
                      id="current-password"
                      type="password"
                      value={passwordForm.currentPassword}
                      onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                      className="bg-black/40 border-white/10 text-white"
                      placeholder="Enter current password"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-password" className="text-white">
                      New Password
                    </Label>
                    <Input
                      id="new-password"
                      type="password"
                      value={passwordForm.newPassword}
                      onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                      className="bg-black/40 border-white/10 text-white"
                      placeholder="Enter new password"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password" className="text-white">
                      Confirm New Password
                    </Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      value={passwordForm.confirmPassword}
                      onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                      className="bg-black/40 border-white/10 text-white"
                      placeholder="Confirm new password"
                    />
                  </div>
                  {passwordForm.newPassword && passwordForm.confirmPassword && 
                   passwordForm.newPassword !== passwordForm.confirmPassword && (
                    <p className="text-sm text-red-400">Passwords do not match</p>
                  )}
                </div>
              </div>

              <div className="flex justify-end">
                <Button
                  variant="default"
                  size="lg"
                  className="bg-[#febe5d] hover:bg-[#ffc978] text-black"
                  onClick={handleUpdatePassword}
                  disabled={saving || !passwordForm.currentPassword || !passwordForm.newPassword || !passwordForm.confirmPassword}
                >
                  <Save className="mr-2 w-4 h-4" />
                  {saving ? 'Updating...' : 'Update Password'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
