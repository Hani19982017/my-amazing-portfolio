import { useState } from "react";
import { Clock, CheckCircle, XCircle, Package, Play, Pause, Download } from "lucide-react";
import { AppLayout } from "@/components/songy/AppLayout";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const orders = [
  {
    id: "ORD-001",
    singerName: "Ahmed Al-Rashid",
    singerNameAr: "أحمد الراشد",
    singerImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    songType: "Wedding Song",
    songTypeAr: "أغنية زفاف",
    status: "in_progress",
    date: "2026-01-15",
    price: "SAR 750",
    estimatedDelivery: "Jan 20, 2026",
    estimatedDeliveryAr: "20 يناير 2026",
    recipientName: "Mohammad & Fatima",
    recipientNameAr: "محمد وفاطمة",
  },
  {
    id: "ORD-002",
    singerName: "Sarah Mohammed",
    singerNameAr: "سارة محمد",
    singerImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    songType: "Birthday Song",
    songTypeAr: "أغنية عيد ميلاد",
    status: "completed",
    date: "2026-01-10",
    price: "SAR 450",
    estimatedDelivery: "Jan 14, 2026",
    estimatedDeliveryAr: "14 يناير 2026",
    recipientName: "Ahmad",
    recipientNameAr: "أحمد",
    songUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  },
  {
    id: "ORD-003",
    singerName: "Khalid Omar",
    singerNameAr: "خالد عمر",
    singerImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    songType: "Shilat",
    songTypeAr: "شيلة",
    status: "pending",
    date: "2026-01-18",
    price: "SAR 550",
    estimatedDelivery: "Jan 25, 2026",
    estimatedDeliveryAr: "25 يناير 2026",
    recipientName: "Abdullah",
    recipientNameAr: "عبدالله",
  },
];

const OrdersPage = () => {
  const { t, language } = useLanguage();
  const isArabic = language === "ar";
  const [selectedOrder, setSelectedOrder] = useState<typeof orders[0] | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio] = useState(() => new Audio());

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

  const handleOrderClick = (order: typeof orders[0]) => {
    if (order.status === "completed" && order.songUrl) {
      setSelectedOrder(order);
      audio.src = order.songUrl;
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
  };

  const handleDownload = () => {
    if (selectedOrder?.songUrl) {
      const link = document.createElement("a");
      link.href = selectedOrder.songUrl;
      link.download = `${selectedOrder.id}-song.mp3`;
      link.click();
    }
  };

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
          <div className="space-y-4">
            {orders.map((order) => {
              const status = statusConfig[order.status as keyof typeof statusConfig];
              const StatusIcon = status.icon;
              const isCompleted = order.status === "completed";

              return (
                <div
                  key={order.id}
                  onClick={() => handleOrderClick(order)}
                  className={cn(
                    "bg-card border border-border rounded-2xl p-4 md:p-6 transition-all",
                    isCompleted && "cursor-pointer hover:border-primary/50 hover:bg-card/80"
                  )}
                >
                  <div className="flex items-start gap-4">
                    {/* Singer Image */}
                    <div className="relative">
                      <img
                        src={order.singerImage}
                        alt={order.singerName}
                        className="w-16 h-16 rounded-xl object-cover"
                      />
                      {isCompleted && (
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
                            {isArabic ? order.songTypeAr : order.songType}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {t("orders.by")} {isArabic ? order.singerNameAr : order.singerName}
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
                        <span>{t("orders.orderId")} #{order.id}</span>
                        <span>•</span>
                        <span>{order.date}</span>
                      </div>

                      {/* Footer */}
                      <div className="mt-4 flex items-center justify-between pt-3 border-t border-border">
                        <div>
                          <p className="text-xs text-muted-foreground">
                            {t("orders.estDelivery")}
                          </p>
                          <p className="text-sm font-medium">
                            {isArabic ? order.estimatedDeliveryAr : order.estimatedDelivery}
                          </p>
                        </div>
                        <div className="text-end">
                          <p className="text-xs text-muted-foreground">{t("orders.total")}</p>
                          <p className="text-lg font-bold text-primary">
                            {order.price}
                          </p>
                        </div>
                      </div>

                      {/* Tap to listen hint for completed orders */}
                      {isCompleted && (
                        <p className="mt-2 text-xs text-primary text-center">
                          {isArabic ? "اضغط للاستماع" : "Tap to listen"}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {orders.length === 0 && (
            <div className="text-center py-16">
              <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">{t("orders.noOrders")}</h3>
              <p className="text-muted-foreground">
                {t("orders.noOrdersDesc")}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Song Player Dialog */}
      <Dialog open={!!selectedOrder} onOpenChange={handleDialogClose}>
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
                src={selectedOrder.singerImage}
                alt={selectedOrder.singerName}
                className="w-24 h-24 rounded-2xl object-cover shadow-lg"
              />

              {/* Song Info */}
              <div className="text-center">
                <h3 className="font-semibold text-lg">
                  {isArabic ? selectedOrder.songTypeAr : selectedOrder.songType}
                </h3>
                <p className="text-muted-foreground">
                  {t("orders.by")} {isArabic ? selectedOrder.singerNameAr : selectedOrder.singerName}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  {isArabic ? "إلى: " : "To: "}
                  {isArabic ? selectedOrder.recipientNameAr : selectedOrder.recipientName}
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
    </AppLayout>
  );
};

export default OrdersPage;
