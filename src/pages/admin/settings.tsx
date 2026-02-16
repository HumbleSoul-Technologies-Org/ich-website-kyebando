import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Settings, Bell, Lock, Users } from "lucide-react";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState({
    organizationName: "Community Innovation Hub",
    organizationEmail: "info@communityhub.org",
    supportEmail: "support@communityhub.org",
    emailNotifications: true,
    weeklyReports: true,
    maintenanceMode: false,
    publicRegistration: true,
    requireApproval: false,
  });

  const handleChange = (field: string, value: any) => {
    setSettings({ ...settings, [field]: value });
  };

  const handleSave = () => {
    console.log("Settings saved:", settings);
    // In a real app, this would send to an API
  };

  return (
    <AdminLayout>
      <div className="p-4 sm:p-6 space-y-6 max-w-4xl">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Settings className="h-8 w-8" />
            Settings
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage system configuration and preferences
          </p>
        </div>

        {/* Organization Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Organization Settings
            </CardTitle>
            <CardDescription>
              Update your organization information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="org-name">Organization Name</Label>
              <Input
                id="org-name"
                value={settings.organizationName}
                onChange={(e) => handleChange("organizationName", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="org-email">Organization Email</Label>
              <Input
                id="org-email"
                type="email"
                value={settings.organizationEmail}
                onChange={(e) => handleChange("organizationEmail", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="support-email">Support Email</Label>
              <Input
                id="support-email"
                type="email"
                value={settings.supportEmail}
                onChange={(e) => handleChange("supportEmail", e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notification Settings
            </CardTitle>
            <CardDescription>
              Configure notification preferences
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Email Notifications</p>
                <p className="text-sm text-muted-foreground">
                  Receive email notifications for important events
                </p>
              </div>
              <Switch
                checked={settings.emailNotifications}
                onCheckedChange={(value) =>
                  handleChange("emailNotifications", value)
                }
              />
            </div>

            <div className="border-t border-border pt-4 flex items-center justify-between">
              <div>
                <p className="font-medium">Weekly Reports</p>
                <p className="text-sm text-muted-foreground">
                  Receive weekly performance reports
                </p>
              </div>
              <Switch
                checked={settings.weeklyReports}
                onCheckedChange={(value) =>
                  handleChange("weeklyReports", value)
                }
              />
            </div>
          </CardContent>
        </Card>

        {/* System Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5" />
              System Settings
            </CardTitle>
            <CardDescription>
              Control system-wide behavior and security
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Maintenance Mode</p>
                <p className="text-sm text-muted-foreground">
                  Put the system in maintenance mode
                </p>
              </div>
              <Switch
                checked={settings.maintenanceMode}
                onCheckedChange={(value) =>
                  handleChange("maintenanceMode", value)
                }
              />
            </div>

            <div className="border-t border-border pt-4 flex items-center justify-between">
              <div>
                <p className="font-medium">Public Registration</p>
                <p className="text-sm text-muted-foreground">
                  Allow new users to register publicly
                </p>
              </div>
              <Switch
                checked={settings.publicRegistration}
                onCheckedChange={(value) =>
                  handleChange("publicRegistration", value)
                }
              />
            </div>

            <div className="border-t border-border pt-4 flex items-center justify-between">
              <div>
                <p className="font-medium">Require Approval</p>
                <p className="text-sm text-muted-foreground">
                  Require admin approval for new registrations
                </p>
              </div>
              <Switch
                checked={settings.requireApproval}
                onCheckedChange={(value) =>
                  handleChange("requireApproval", value)
                }
              />
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end gap-3">
          <Button variant="outline">Cancel</Button>
          <Button onClick={handleSave}>Save Settings</Button>
        </div>
      </div>
    </AdminLayout>
  );
}
