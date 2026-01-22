import { useState, useEffect, useRef } from "react";
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
  Camera,
  Loader2,
} from "lucide-react";
import { AppLayout } from "@/components/songy/AppLayout";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { PlayButton } from "@/components/songy/PlayButton";
import { toast } from "sonner";

const ProfilePage = () => {
  const { t, language } = useLanguage();
  const isArabic = language === "ar";
  const { user: authUser, signOut } = useAuth();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [profile, setProfile] = useState<{
    full_name: string | null;
    avatar_url: string | null;
    phone: string | null;
  } | null>(null);
  const [ordersCount, setOrdersCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!authUser) {
        setLoading(false);
        return;
      }

      try {
        // Fetch profile
        const { data: profileData } = await supabase
          .from("profiles")
          .select("full_name, avatar_url, phone")
          .eq("id", authUser.id)
          .maybeSingle();

        setProfile(profileData);

        // Fetch orders count
        const { count } = await supabase
          .from("orders")
          .select("*", { count: "exact", head: true })
          .eq("user_id", authUser.id);

        setOrdersCount(count || 0);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [authUser]);

  const handleLogout = async () => {
    await signOut();
    navigate("/auth");
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !authUser) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error(isArabic ? "يرجى اختيار صورة" : "Please select an image file");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error(isArabic ? "حجم الصورة كبير جداً (الحد الأقصى 5MB)" : "Image too large (max 5MB)");
      return;
    }

    setUploading(true);

    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${authUser.id}/avatar.${fileExt}`;

      // Upload to storage
      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(fileName, file, { upsert: true });

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: urlData } = supabase.storage
        .from("avatars")
        .getPublicUrl(fileName);

      const avatarUrl = `${urlData.publicUrl}?t=${Date.now()}`;

      // Update profile
      const { error: updateError } = await supabase
        .from("profiles")
        .update({ avatar_url: avatarUrl })
        .eq("id", authUser.id);

      if (updateError) throw updateError;

      setProfile((prev) => prev ? { ...prev, avatar_url: avatarUrl } : null);
      toast.success(isArabic ? "تم تحديث الصورة بنجاح" : "Avatar updated successfully");
    } catch (error) {
      console.error("Error uploading avatar:", error);
      toast.error(isArabic ? "فشل تحميل الصورة" : "Failed to upload avatar");
    } finally {
      setUploading(false);
    }
  };

  if (!authUser) {
    return (
      <AppLayout>
        <div className="px-4 py-8 text-center">
          <p className="text-muted-foreground mb-4">
            {isArabic ? "يرجى تسجيل الدخول لعرض ملفك الشخصي" : "Please login to view your profile"}
          </p>
          <Link to="/auth">
            <Button>{isArabic ? "تسجيل الدخول" : "Login"}</Button>
          </Link>
        </div>
      </AppLayout>
    );
  }

  const menuItems = [
    {
      icon: ShoppingCart,
      labelKey: "profile.menuOrders",
      descriptionKey: "profile.menuOrders.desc",
      href: "/orders",
    },
    {
      icon: Heart,
      labelKey: "profile.menuFavorites",
      descriptionKey: "profile.menuFavorites.desc",
      href: "/favorites",
    },
    {
      icon: CreditCard,
      labelKey: "profile.menuPayments",
      descriptionKey: "profile.menuPayments.desc",
      href: "/payments",
    },
    {
      icon: Bell,
      labelKey: "profile.menuNotifications",
      descriptionKey: "profile.menuNotifications.desc",
      href: "/notifications",
    },
    {
      icon: Globe,
      labelKey: "profile.menuLanguage",
      descriptionKey: "profile.menuLanguage.desc",
      href: "/settings",
    },
    {
      icon: Settings,
      labelKey: "profile.menuSettings",
      descriptionKey: "profile.menuSettings.desc",
      href: "/settings",
    },
  ];

  return (
    <AppLayout>
      <div className="px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Profile Header */}
          <div className="bg-gradient-to-br from-primary/20 to-accent/10 rounded-3xl p-6 mb-8">
            <div className="flex items-start gap-4">
              {/* Editable Avatar */}
              <div className="relative group">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*"
                  className="hidden"
                />
                <button
                  onClick={handleAvatarClick}
                  disabled={uploading}
                  className="relative w-20 h-20 rounded-2xl overflow-hidden ring-4 ring-primary/20 focus:outline-none focus:ring-primary/50 transition-all"
                >
                  {profile?.avatar_url ? (
                    <img
                      src={profile.avatar_url}
                      alt={profile.full_name || "User"}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-primary/20 flex items-center justify-center">
                      <User className="w-10 h-10 text-primary" />
                    </div>
                  )}
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    {uploading ? (
                      <Loader2 className="w-6 h-6 text-white animate-spin" />
                    ) : (
                      <Camera className="w-6 h-6 text-white" />
                    )}
                  </div>
                </button>
                <div className="absolute -bottom-2 -end-2">
                  <PlayButton size="sm" />
                </div>
              </div>

              <div className="flex-1">
                <h1 className="text-xl font-bold">
                  {profile?.full_name || (isArabic ? "مستخدم" : "User")}
                </h1>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                  <Mail className="w-4 h-4" />
                  <span>{authUser.email}</span>
                </div>
                {profile?.phone && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mt-0.5">
                    <Phone className="w-4 h-4" />
                    <span dir="ltr">{profile.phone}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Stats */}
            <div className="flex gap-4 mt-6">
              <div className="flex-1 bg-card/50 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-primary">
                  {ordersCount}
                </div>
                <div className="text-xs text-muted-foreground">
                  {t("profile.orders")}
                </div>
              </div>
              <div className="flex-1 bg-card/50 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-primary">
                  0
                </div>
                <div className="text-xs text-muted-foreground">
                  {t("profile.favorites")}
                </div>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="space-y-2">
            {menuItems.map((item) => (
              <Link
                key={item.labelKey}
                to={item.href}
                className="w-full flex items-center gap-4 p-4 rounded-xl bg-card border border-border hover:bg-muted/50 transition-colors text-start"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="font-medium">{t(item.labelKey)}</div>
                  <div className="text-sm text-muted-foreground">
                    {t(item.descriptionKey)}
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground rtl:rotate-180" />
              </Link>
            ))}

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-muted/50 transition-colors text-start mt-4"
            >
              <LogOut className="w-5 h-5 text-muted-foreground" />
              <span className="font-medium text-muted-foreground">
                {isArabic ? "تسجيل الخروج" : "Log Out"}
              </span>
            </button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default ProfilePage;
