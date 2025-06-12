import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/sonner";
import { useTheme } from "@/Contexts/ThemeProvider";
import {
  UserRound,
  Mail,
  Lock,
  Bell,
  CreditCard,
  Settings as SettingsIcon,
} from "lucide-react";
import { useAuth } from "@/Contexts/AuthProvider";

type UserType = {
  username: string;
  email: string;
  profilePicture: string;
  userRole: string;
  phoneNumber: string;
};

const Settings = () => {
  const { theme, setTheme } = useTheme();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { user, updateUserData, updateUserPassword } = useAuth();
  const [profileData, setProfileData] = useState<UserType>({
    username: "",
    email: "",
    profilePicture: "",
    userRole: "",
    phoneNumber: "",
  });

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    smsNotifications: false,
    promotionalEmails: true,
    weeklyNewsletter: true,
  });

  useEffect(() => {
    if (user) {
      setProfileData(user);
    }
  }, []);

  const handleProfileSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateUserData(
        profileData.username,
        profileData.phoneNumber,
        profileData.email
      );
      toast.success("Profile updated", {
        description: "Your profile information has been saved",
      });
    } catch (error: any) {
      console.log(error);
      toast.error("sorry, there was an error during the update !");
    }
  };

  const handlePasswordSave = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      await updateUserPassword(currentPassword, newPassword);
      toast.success("Password updated", {
        description: "Your password has been changed successfully",
      });
      
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error: any) {
      console.error(error);
      toast.error("Error updating password", {
        description: error?.message || "Something went wrong.",
      });
    }
  };

  const handleNotificationSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Notification preferences saved", {
      description: "Your notification preferences have been updated",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 pb-16">
        <div className="container px-4 mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl font-bold mb-8">Account Settings</h1>

            <Tabs defaultValue="profile" className="w-full">
              <TabsList className="grid grid-cols-4 mb-8">
                <TabsTrigger
                  value="profile"
                  className="flex items-center justify-center gap-2"
                >
                  <UserRound className="h-4 w-4" />
                  <span className="hidden sm:inline">Profile</span>
                </TabsTrigger>
                <TabsTrigger
                  value="password"
                  className="flex items-center justify-center gap-2"
                >
                  <Lock className="h-4 w-4" />
                  <span className="hidden sm:inline">Password</span>
                </TabsTrigger>
                <TabsTrigger
                  value="notifications"
                  className="flex items-center justify-center gap-2"
                >
                  <Bell className="h-4 w-4" />
                  <span className="hidden sm:inline">Notifications</span>
                </TabsTrigger>
                <TabsTrigger
                  value="payment"
                  className="flex items-center justify-center gap-2"
                >
                  <CreditCard className="h-4 w-4" />
                  <span className="hidden sm:inline">Payment</span>
                </TabsTrigger>
              </TabsList>

              {/* Profile Tab */}
              <TabsContent value="profile">
                <Card>
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>
                      Update your personal information and contact details
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleProfileSave} className="space-y-6">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input
                            id="name"
                            value={profileData?.username || ""}
                            onChange={(e) =>
                              setProfileData({
                                ...profileData,
                                username: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            value={profileData?.email || ""}
                            onChange={(e) =>
                              setProfileData({
                                ...profileData,
                                email: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone</Label>
                          <Input
                            id="phone"
                            type="tel"
                            value={profileData?.phoneNumber || ""}
                            onChange={(e) =>
                              setProfileData({
                                ...profileData,
                                phoneNumber: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>
                      <Button type="submit" className="btn-luxury">
                        Save Changes
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Password Tab */}
              <TabsContent value="password">
                <Card>
                  <CardHeader>
                    <CardTitle>Change Password</CardTitle>
                    <CardDescription>
                      Update your password to keep your account secure
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handlePasswordSave} className="space-y-6">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="current-password">
                            Current Password
                          </Label>
                          <Input
                            id="current-password"
                            type="password"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="new-password">New Password</Label>
                          <Input
                            id="new-password"
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="confirm-password">
                            Confirm New Password
                          </Label>
                          <Input
                            id="confirm-password"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                          />
                        </div>
                      </div>
                      <Button type="submit" className="btn-luxury">
                        Update Password
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Notifications Tab */}
              <TabsContent value="notifications">
                <Card>
                  <CardHeader>
                    <CardTitle>Notification Preferences</CardTitle>
                    <CardDescription>
                      Manage how and when you receive notifications
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form
                      onSubmit={handleNotificationSave}
                      className="space-y-6"
                    >
                      <div className="space-y-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium">Email Notifications</h3>
                            <p className="text-sm text-muted-foreground">
                              Receive notifications via email
                            </p>
                          </div>
                          <Switch
                            checked={notifications.emailNotifications}
                            onCheckedChange={(checked) =>
                              setNotifications({
                                ...notifications,
                                emailNotifications: checked,
                              })
                            }
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium">SMS Notifications</h3>
                            <p className="text-sm text-muted-foreground">
                              Receive notifications via SMS
                            </p>
                          </div>
                          <Switch
                            checked={notifications.smsNotifications}
                            onCheckedChange={(checked) =>
                              setNotifications({
                                ...notifications,
                                smsNotifications: checked,
                              })
                            }
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium">Promotional Emails</h3>
                            <p className="text-sm text-muted-foreground">
                              Receive emails about promotions and sales
                            </p>
                          </div>
                          <Switch
                            checked={notifications.promotionalEmails}
                            onCheckedChange={(checked) =>
                              setNotifications({
                                ...notifications,
                                promotionalEmails: checked,
                              })
                            }
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium">Weekly Newsletter</h3>
                            <p className="text-sm text-muted-foreground">
                              Receive our weekly newsletter
                            </p>
                          </div>
                          <Switch
                            checked={notifications.weeklyNewsletter}
                            onCheckedChange={(checked) =>
                              setNotifications({
                                ...notifications,
                                weeklyNewsletter: checked,
                              })
                            }
                          />
                        </div>
                      </div>
                      <Button type="submit" className="btn-luxury">
                        Save Preferences
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Payment Tab */}
              <TabsContent value="payment">
                <Card>
                  <CardHeader>
                    <CardTitle>Payment Methods</CardTitle>
                    <CardDescription>
                      Manage your payment methods and billing information
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="rounded-lg border p-4 flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="bg-luxury-black text-luxury-gold p-2 rounded">
                            <CreditCard className="h-6 w-6" />
                          </div>
                          <div>
                            <p className="font-medium">Visa ending in 4242</p>
                            <p className="text-sm text-muted-foreground">
                              Expires 12/2025
                            </p>
                          </div>
                        </div>
                        <div>
                          <Badge className="bg-green-500">Default</Badge>
                        </div>
                      </div>

                      <div className="rounded-lg border p-4 flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="bg-luxury-black text-luxury-gold p-2 rounded">
                            <CreditCard className="h-6 w-6" />
                          </div>
                          <div>
                            <p className="font-medium">
                              Mastercard ending in 5678
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Expires 08/2024
                            </p>
                          </div>
                        </div>
                        <div>
                          <Button variant="outline" size="sm">
                            Set as default
                          </Button>
                        </div>
                      </div>

                      <Button className="btn-luxury w-full">
                        Add Payment Method
                      </Button>

                      <div className="mt-8">
                        <h3 className="text-lg font-medium mb-4">Appearance</h3>
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">Dark Mode</h4>
                            <p className="text-sm text-muted-foreground">
                              Toggle between light and dark mode
                            </p>
                          </div>
                          <Switch
                            checked={theme === "dark"}
                            onCheckedChange={(checked) =>
                              setTheme(checked ? "dark" : "light")
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Settings;
