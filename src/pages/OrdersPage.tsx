import { useState, useEffect } from "react";
import { Clock, CheckCircle, XCircle, Package, Play, Pause, Download, LogIn } from "lucide-react";
import { Link } from "react-router-dom";
import { AppLayout } from "@/components/songy/AppLayout";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface Order {
  id: string;
  singer_name: string;
  singer_name_ar: string | null;
  singer_image: string | null;
  category: string;
  category_ar: string | null;
  status: string;
  created_at: string;
  price: string | null;
  estimated_delivery: string | null;
  recipient_name: string;
  recipient_name_ar: string | null;
  song_url: string | null;
  message: string | null;
}

const OrdersPage = () => {
  const { t, language } = useLanguage();
  const { user, isLoading: authLoading } = useAuth();
  const isArabic = language === "ar";
  
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [dialogType, setDialogType] = useState<"song" | "status" | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio] = useState(() => new Audio());

  useEffect(() => {
    if (user) {
      fetchOrders();
    } else if (!authLoading) {
      setIsLoading(false);
    }
  }, [user, authLoading]);

  useEffect(() => {
    audio.addEventListener("ended", () => setIsPlaying(false));
    return () => {
      audio.removeEventListener("ended", () => setIsPlaying(false));
      audio.pause();
    };
  }, [audio]);

  const fetchOrders = async () => {
    try {
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setOrders(data || []);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const statusConfig = {
    pending: {
      icon: Clock,
      labelKey: "orders.status.pending",
      color: "text-yellow-500",
      bg: "bg-yellow-500/10",
    },
    in_progress: {
      icon: Package,
      labelKey: "orders.status.inProgress",
      color: "text-primary",
      bg: "bg-primary/10",
    },
    completed: {
      icon: CheckCircle,
      labelKey: "orders.status.completed",
      color: "text-green-500",
      bg: "bg-green-500/10",
    },
    cancelled: {
      icon: XCircle,
      labelKey: "orders.status.cancelled",
      color: "text-red-500",
      bg: "bg-red-500/10",
    },
  };

  const getCategoryLabel = (order: Order) => {
    const categoryMap: Record<string, { en: string; ar: string }> = {
      wedding: { en: "Wedding Song", ar: "أغنية زفاف" },
      birthday: { en: "Birthday Song", ar: "أغنية عيد ميلاد" },
      newborn: { en: "Newborn Song", ar: "أغنية مولود" },
      graduation: { en: "Graduation Song", ar: "أغنية تخرج" },
      celebration: { en: "Celebration Song", ar: "أغنية احتفال" },
      shilat: { en: "Shilat", ar: "شيلة" },
      love: { en: "Love Song", ar: "أغنية حب" },
      kids: { en: "Kids Song", ar: "أغنية أطفال" },
      mothersDay: { en: "Mother's Day Song", ar: "أغنية عيد الأم" },
      fathersDay: { en: "Father's Day Song", ar: "أغنية عيد الأب" },
    };
    const cat = categoryMap[order.category];
    if (cat) {
      return isArabic ? cat.ar : cat.en;
    }
    return isArabic && order.category_ar ? order.category_ar : order.category;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    if (isArabic) {
      return date.toLocaleDateString("ar-SA", { day: "numeric", month: "long", year: "numeric" });
    }
    return date.toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" });
  };

  const handleOrderClick = (order: Order) => {
    setSelectedOrder(order);
    if (order.status === "completed" && order.song_url) {
      setDialogType("song");
      audio.src = order.song_url;
    } else {
      setDialogType("status");
    }
  };

  const togglePlay = () => {
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleDialogClose = () => {
    audio.pause();
    setIsPlaying(false);
    setSelectedOrder(null);
    setDialogType(null);
  };

  const handleDownload = () => {
    if (selectedOrder?.song_url) {
      const link = document.createElement("a");
      link.href = selectedOrder.song_url;
      link.download = `${selectedOrder.id}-song.mp3`;
      link.click();
    }
  };

  // Show login prompt if not authenticated
  if (!authLoading && !user) {
    return (
      <AppLayout>
        <div className="min-h-[60vh] flex flex-col items-center justify-center p-4">
          <div className="text-center max-w-md">
            <LogIn className="w-16 h-16 text-primary mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-2">
              {isArabic ? "يجب تسجيل الدخول" : "Sign In Required"}
            </h1>
            <p className="text-muted-foreground mb-6">
              {isArabic 
                ? "يرجى تسجيل الدخول لعرض طلباتك"
                : "Please sign in to view your orders"}
            </p>
            <Button asChild className="w-full">
              <Link to="/auth">
                {isArabic ? "تسجيل الدخول" : "Sign In"}
              </Link>
            </Button>
          </div>
        </div>
      </AppLayout>
    );
  }

  if (isLoading) {
    return (
      <AppLayout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold">{t("orders.title")}</h1>
            <p className="text-muted-foreground mt-2">
              {t("orders.subtitle")}
            </p>
          </div>

          {/* Orders List */}
          {orders.length > 0 ? (
            <div className="space-y-4">
              {orders.map((order) => {
                const status = statusConfig[order.status as keyof typeof statusConfig] || statusConfig.pending;
                const StatusIcon = status.icon;
                const isCompleted = order.status === "completed";

                return (
                  <div
                    key={order.id}
                    onClick={() => handleOrderClick(order)}
                    className="bg-card border border-border rounded-2xl p-4 md:p-6 transition-all cursor-pointer hover:border-primary/50 hover:bg-card/80"
                  >
                    <div className="flex items-start gap-4">
                      {/* Singer Image */}
                      <div className="relative">
                        <img
                          src={order.singer_image || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop"}
                          alt={order.singer_name}
                          className="w-16 h-16 rounded-xl object-cover"
                        />
                        {isCompleted && order.song_url && (
                          <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-xl">
                            <Play className="w-6 h-6 text-foreground fill-foreground" />
                          </div>
                        )}
                      </div>

                      {/* Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h3 className="font-semibold">
                              {getCategoryLabel(order)}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {t("orders.by")} {isArabic && order.singer_name_ar ? order.singer_name_ar : order.singer_name}
                            </p>
                          </div>

                          {/* Status Badge */}
                          <div
                            className={cn(
                              "flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium",
                              status.bg,
                              status.color
                            )}
                          >
                            <StatusIcon className="w-3 h-3" />
                            {t(status.labelKey)}
                          </div>
                        </div>

                        {/* Meta */}
                        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                          <span>{t("orders.orderId")} #{order.id.slice(0, 8)}</span>
                          <span>•</span>
                          <span>{formatDate(order.created_at)}</span>
                        </div>

                        {/* Footer */}
                        <div className="mt-4 flex items-center justify-between pt-3 border-t border-border">
                          <div>
                            <p className="text-xs text-muted-foreground">
                              {t("orders.estDelivery")}
                            </p>
                            <p className="text-sm font-medium">
                              {order.estimated_delivery ? formatDate(order.estimated_delivery) : "-"}
                            </p>
                          </div>
                          <div className="text-end">
                            <p className="text-xs text-muted-foreground">{t("orders.total")}</p>
                            <p className="text-lg font-bold text-primary">
                              {order.price || "-"}
                            </p>
                          </div>
                        </div>

                        {/* Tap hint */}
                        <p className="mt-2 text-xs text-primary text-center">
                          {isCompleted && order.song_url
                            ? (isArabic ? "اضغط للاستماع" : "Tap to listen")
                            : (isArabic ? "اضغط لعرض التفاصيل" : "Tap for details")
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16">
              <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">{t("orders.noOrders")}</h3>
              <p className="text-muted-foreground mb-6">
                {t("orders.noOrdersDesc")}
              </p>
              <Button asChild>
                <Link to="/singers">
                  {isArabic ? "تصفح المطربين" : "Browse Singers"}
                </Link>
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Song Player Dialog (for completed orders) */}
      <Dialog open={dialogType === "song"} onOpenChange={handleDialogClose}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">
              {isArabic ? "أغنيتك جاهزة!" : "Your Song is Ready!"}
            </DialogTitle>
          </DialogHeader>
          
          {selectedOrder && (
            <div className="flex flex-col items-center gap-6 py-4">
              {/* Singer Image */}
              <img
                src={selectedOrder.singer_image || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop"}
                alt={selectedOrder.singer_name}
                className="w-24 h-24 rounded-2xl object-cover shadow-lg"
              />

              {/* Song Info */}
              <div className="text-center">
                <h3 className="font-semibold text-lg">
                  {getCategoryLabel(selectedOrder)}
                </h3>
                <p className="text-muted-foreground">
                  {t("orders.by")} {isArabic && selectedOrder.singer_name_ar ? selectedOrder.singer_name_ar : selectedOrder.singer_name}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  {isArabic ? "إلى: " : "To: "}
                  {isArabic && selectedOrder.recipient_name_ar ? selectedOrder.recipient_name_ar : selectedOrder.recipient_name}
                </p>
              </div>

              {/* Play Button */}
              <button
                onClick={togglePlay}
                className="w-20 h-20 rounded-full bg-primary flex items-center justify-center shadow-lg hover:bg-primary/90 transition-colors"
              >
                {isPlaying ? (
                  <Pause className="w-10 h-10 text-primary-foreground" />
                ) : (
                  <Play className="w-10 h-10 text-primary-foreground ms-1" />
                )}
              </button>

              {/* Download Button */}
              <Button
                variant="outline"
                onClick={handleDownload}
                className="gap-2"
              >
                <Download className="w-4 h-4" />
                {isArabic ? "تحميل الأغنية" : "Download Song"}
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Status Dialog (for non-completed orders) */}
      <Dialog open={dialogType === "status"} onOpenChange={handleDialogClose}>
        <DialogContent className="sm:max-w-md">
          {selectedOrder && (() => {
            const status = statusConfig[selectedOrder.status as keyof typeof statusConfig] || statusConfig.pending;
            const StatusIcon = status.icon;
            
            const statusMessages = {
              pending: {
                title: isArabic ? "طلبك قيد الانتظار" : "Your Order is Pending",
                description: isArabic 
                  ? "طلبك في انتظار المراجعة والتأكيد من المطرب. سيتم إعلامك فور البدء في العمل عليه."
                  : "Your order is waiting for review and confirmation from the singer. You'll be notified once they start working on it.",
              },
              in_progress: {
                title: isArabic ? "جاري العمل على طلبك" : "Your Order is In Progress",
                description: isArabic 
                  ? "المطرب يعمل حالياً على أغنيتك! سيتم تسليمها في الموعد المحدد."
                  : "The singer is currently working on your song! It will be delivered by the estimated date.",
              },
              cancelled: {
                title: isArabic ? "تم إلغاء الطلب" : "Order Cancelled",
                description: isArabic 
                  ? "تم إلغاء هذا الطلب. يمكنك طلب أغنية جديدة في أي وقت."
                  : "This order has been cancelled. You can place a new order anytime.",
              },
              completed: {
                title: isArabic ? "تم الانتهاء" : "Completed",
                description: isArabic ? "تم الانتهاء من طلبك." : "Your order is complete.",
              },
            };

            const message = statusMessages[selectedOrder.status as keyof typeof statusMessages] || statusMessages.pending;

            return (
              <>
                <DialogHeader>
                  <DialogTitle className="text-center">
                    {message?.title}
                  </DialogTitle>
                </DialogHeader>
                
                <div className="flex flex-col items-center gap-6 py-4">
                  {/* Status Icon */}
                  <div className={cn("w-20 h-20 rounded-full flex items-center justify-center", status.bg)}>
                    <StatusIcon className={cn("w-10 h-10", status.color)} />
                  </div>

                  {/* Singer Info */}
                  <div className="flex items-center gap-3">
                    <img
                      src={selectedOrder.singer_image || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop"}
                      alt={selectedOrder.singer_name}
                      className="w-12 h-12 rounded-xl object-cover"
                    />
                    <div>
                      <h4 className="font-medium">
                        {getCategoryLabel(selectedOrder)}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {t("orders.by")} {isArabic && selectedOrder.singer_name_ar ? selectedOrder.singer_name_ar : selectedOrder.singer_name}
                      </p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-center text-muted-foreground text-sm">
                    {message?.description}
                  </p>

                  {/* Estimated Delivery */}
                  {selectedOrder.status !== "cancelled" && selectedOrder.estimated_delivery && (
                    <div className="text-center p-3 rounded-xl bg-muted/50 w-full">
                      <p className="text-xs text-muted-foreground">
                        {t("orders.estDelivery")}
                      </p>
                      <p className="font-semibold text-primary">
                        {formatDate(selectedOrder.estimated_delivery)}
                      </p>
                    </div>
                  )}

                  {/* Close Button */}
                  <Button
                    variant="outline"
                    onClick={handleDialogClose}
                    className="w-full"
                  >
                    {isArabic ? "إغلاق" : "Close"}
                  </Button>
                </div>
              </>
            );
          })()}
        </DialogContent>
      </Dialog>
    </AppLayout>
  );
};

export default OrdersPage;
