import { Bell, CheckCircle, Gift, Music, ShoppingCart } from "lucide-react";
import { AppLayout } from "@/components/songy/AppLayout";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

const notifications = [
  {
    id: "1",
    type: "order",
    icon: ShoppingCart,
    title: "Order Completed",
    titleAr: "تم إكمال الطلب",
    message: "Your wedding song by Ahmed Al-Rashid is ready!",
    messageAr: "أغنية الزفاف الخاصة بك من أحمد الراشد جاهزة!",
    time: "2 hours ago",
    timeAr: "منذ ساعتين",
    isRead: false,
    group: "today",
  },
  {
    id: "2",
    type: "promo",
    icon: Gift,
    title: "Special Offer",
    titleAr: "عرض خاص",
    message: "Get 20% off on your next birthday song order!",
    messageAr: "احصل على خصم 20% على طلب أغنية عيد ميلادك القادم!",
    time: "5 hours ago",
    timeAr: "منذ 5 ساعات",
    isRead: false,
    group: "today",
  },
  {
    id: "3",
    type: "update",
    icon: Music,
    title: "New Singer Added",
    titleAr: "تمت إضافة مطرب جديد",
    message: "Check out Omar Ali - specializing in Shilat!",
    messageAr: "اكتشف عمر علي - متخصص في الشيلات!",
    time: "Yesterday",
    timeAr: "أمس",
    isRead: true,
    group: "yesterday",
  },
  {
    id: "4",
    type: "order",
    icon: CheckCircle,
    title: "Order Delivered",
    titleAr: "تم تسليم الطلب",
    message: "Your graduation song has been delivered successfully.",
    messageAr: "تم تسليم أغنية التخرج الخاصة بك بنجاح.",
    time: "2 days ago",
    timeAr: "منذ يومين",
    isRead: true,
    group: "earlier",
  },
];

const NotificationsPage = () => {
  const { t, language } = useLanguage();
  const isArabic = language === "ar";

  const groupedNotifications = {
    today: notifications.filter((n) => n.group === "today"),
    yesterday: notifications.filter((n) => n.group === "yesterday"),
    earlier: notifications.filter((n) => n.group === "earlier"),
  };

  const getGroupLabel = (group: string) => {
    switch (group) {
      case "today":
        return t("notifications.today");
      case "yesterday":
        return t("notifications.yesterday");
      case "earlier":
        return t("notifications.earlier");
      default:
        return group;
    }
  };

  return (
    <AppLayout>
      <div className="px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">
                {t("notifications.title")}
              </h1>
              <p className="text-muted-foreground mt-2">
                {t("notifications.subtitle")}
              </p>
            </div>
            <Button variant="outline" size="sm">
              {t("notifications.markAllRead")}
            </Button>
          </div>

          {/* Notifications List */}
          {notifications.length > 0 ? (
            <div className="space-y-8">
              {Object.entries(groupedNotifications).map(
                ([group, items]) =>
                  items.length > 0 && (
                    <div key={group}>
                      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                        {getGroupLabel(group)}
                      </h3>

                      <div className="space-y-3">
                        {items.map((notification) => (
                          <div
                            key={notification.id}
                            className={cn(
                              "flex gap-4 p-4 rounded-2xl bg-card border border-border transition-colors",
                              !notification.isRead && "bg-primary/5 border-primary/20"
                            )}
                          >
                            <div
                              className={cn(
                                "w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0",
                                notification.type === "order" &&
                                  "bg-green-500/10 text-green-500",
                                notification.type === "promo" &&
                                  "bg-primary/10 text-primary",
                                notification.type === "update" &&
                                  "bg-blue-500/10 text-blue-500"
                              )}
                            >
                              <notification.icon className="w-5 h-5" />
                            </div>

                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2">
                                <h4 className="font-semibold">
                                  {isArabic ? notification.titleAr : notification.title}
                                </h4>
                                {!notification.isRead && (
                                  <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-2" />
                                )}
                              </div>
                              <p className="text-sm text-muted-foreground mt-1">
                                {isArabic ? notification.messageAr : notification.message}
                              </p>
                              <p className="text-xs text-muted-foreground mt-2">
                                {isArabic ? notification.timeAr : notification.time}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )
              )}
            </div>
          ) : (
            <div className="text-center py-16">
              <Bell className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">
                {t("notifications.noNotifications")}
              </h3>
              <p className="text-muted-foreground">
                {t("notifications.noNotificationsDesc")}
              </p>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default NotificationsPage;
