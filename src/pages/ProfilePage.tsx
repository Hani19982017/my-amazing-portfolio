import { useState } from "react";
import {
  User,
  Mail,
  Phone,
  Edit,
  Heart,
  ShoppingCart,
  Settings,
  LogOut,
  ChevronRight,
  Bell,
  Globe,
  CreditCard,
} from "lucide-react";
import { AppLayout } from "@/components/songy/AppLayout";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const menuItems = [
  {
    icon: ShoppingCart,
    label: "My Orders",
    description: "Track your song orders",
    href: "/orders",
  },
  {
    icon: Heart,
    label: "Favorites",
    description: "Saved singers and studios",
    href: "/favorites",
  },
  {
    icon: CreditCard,
    label: "Payment Methods",
    description: "Manage your payment options",
    href: "/payments",
  },
  {
    icon: Bell,
    label: "Notifications",
    description: "Notification preferences",
    href: "/notifications",
  },
  {
    icon: Globe,
    label: "Language",
    description: "English",
    href: "/language",
  },
  {
    icon: Settings,
    label: "Settings",
    description: "App preferences",
    href: "/settings",
  },
];

const ProfilePage = () => {
  const [user] = useState({
    name: "Abdullah Al-Saud",
    email: "abdullah@example.com",
    phone: "+966 50 123 4567",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
    ordersCount: 12,
    favoritesCount: 8,
  });

  return (
    <AppLayout>
      <div className="px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Profile Header */}
          <div className="bg-gradient-to-br from-primary/20 to-accent/10 rounded-3xl p-6 mb-8">
            <div className="flex items-start gap-4">
              <div className="relative">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-20 h-20 rounded-2xl object-cover ring-4 ring-primary/20"
                />
                <button className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                  <Edit className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="flex-1">
                <h1 className="text-xl font-bold">{user.name}</h1>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                  <Mail className="w-4 h-4" />
                  <span>{user.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mt-0.5">
                  <Phone className="w-4 h-4" />
                  <span>{user.phone}</span>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="flex gap-4 mt-6">
              <div className="flex-1 bg-card/50 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-primary">
                  {user.ordersCount}
                </div>
                <div className="text-xs text-muted-foreground">Orders</div>
              </div>
              <div className="flex-1 bg-card/50 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-primary">
                  {user.favoritesCount}
                </div>
                <div className="text-xs text-muted-foreground">Favorites</div>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.label}
                className="w-full flex items-center gap-4 p-4 rounded-xl bg-card border border-border hover:bg-muted/50 transition-colors text-left"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="font-medium">{item.label}</div>
                  <div className="text-sm text-muted-foreground">
                    {item.description}
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </button>
            ))}
          </div>

          {/* Logout */}
          <Button
            variant="outline"
            className="w-full mt-8 border-destructive/50 text-destructive hover:bg-destructive/10"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Log Out
          </Button>
        </div>
      </div>
    </AppLayout>
  );
};

export default ProfilePage;
