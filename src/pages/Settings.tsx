
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "sonner";
import { User, Bell, Shield, Key, Upload } from "lucide-react";

const Settings = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");

  const handleSaveChanges = () => {
    toast.success("Settings saved successfully");
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">Manage your account settings and preferences</p>
      </div>

      <Card className="bg-white shadow-sm border-0">
        <CardContent className="p-0">
          <Tabs defaultValue="profile" value={activeTab} onValueChange={setActiveTab}>
            <div className="border-b">
              <div className="px-4">
                <TabsList className="grid grid-cols-4 w-full max-w-lg">
                  <TabsTrigger value="profile" className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none">
                    <User className="h-4 w-4 mr-2" />
                    Profile
                  </TabsTrigger>
                  <TabsTrigger value="notifications" className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none">
                    <Bell className="h-4 w-4 mr-2" />
                    Notifications
                  </TabsTrigger>
                  <TabsTrigger value="security" className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none">
                    <Shield className="h-4 w-4 mr-2" />
                    Security
                  </TabsTrigger>
                  <TabsTrigger value="appearance" className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none">
                    <Key className="h-4 w-4 mr-2" />
                    Appearance
                  </TabsTrigger>
                </TabsList>
              </div>
            </div>
            <div className="p-6">
              <TabsContent value="profile" className="mt-0">
                <div className="space-y-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex flex-col items-center space-y-3">
                      <Avatar className="h-24 w-24">
                        <AvatarImage src={user?.avatar} />
                        <AvatarFallback>{user?.name[0]}</AvatarFallback>
                      </Avatar>
                      <Button variant="outline" size="sm">
                        <Upload className="h-4 w-4 mr-2" />
                        Change Avatar
                      </Button>
                    </div>
                    <div className="flex-1 space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="full-name">Full Name</Label>
                          <Input id="full-name" defaultValue={user?.name} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input id="email" type="email" defaultValue={user?.email} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="role">Role</Label>
                          <Input id="role" defaultValue={user?.role} readOnly className="bg-muted" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone</Label>
                          <Input id="phone" type="tel" placeholder="+1 (555) 123-4567" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="bio">Bio</Label>
                        <textarea
                          id="bio"
                          className="w-full min-h-[100px] p-3 rounded-md border border-input bg-transparent"
                          placeholder="Write a brief description about yourself"
                        ></textarea>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <Button onClick={handleSaveChanges}>Save Changes</Button>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="notifications" className="mt-0">
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Email Notifications</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">School Announcements</p>
                          <p className="text-sm text-muted-foreground">
                            Receive notifications for important school announcements
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">Student Updates</p>
                          <p className="text-sm text-muted-foreground">
                            Receive notifications about student performance and attendance
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">System Updates</p>
                          <p className="text-sm text-muted-foreground">
                            Receive notifications about system maintenance and updates
                          </p>
                        </div>
                        <Switch />
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <Button onClick={handleSaveChanges}>Save Changes</Button>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="security" className="mt-0">
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Change Password</h3>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="current-password">Current Password</Label>
                        <Input id="current-password" type="password" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="new-password">New Password</Label>
                        <Input id="new-password" type="password" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirm-password">Confirm New Password</Label>
                        <Input id="confirm-password" type="password" />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Two-Factor Authentication</h3>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Enable 2FA</p>
                        <p className="text-sm text-muted-foreground">
                          Add an extra layer of security to your account
                        </p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <Button onClick={handleSaveChanges}>Save Changes</Button>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="appearance" className="mt-0">
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Theme Preferences</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">Dark Mode</p>
                          <p className="text-sm text-muted-foreground">
                            Enable dark mode for the application
                          </p>
                        </div>
                        <Switch />
                      </div>
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">High Contrast</p>
                          <p className="text-sm text-muted-foreground">
                            Enable high contrast mode for better visibility
                          </p>
                        </div>
                        <Switch />
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <Button onClick={handleSaveChanges}>Save Changes</Button>
                  </div>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;
