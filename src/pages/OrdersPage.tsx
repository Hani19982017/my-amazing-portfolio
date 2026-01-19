import { Clock, CheckCircle, XCircle, Package } from "lucide-react";
import { AppLayout } from "@/components/songy/AppLayout";
import { cn } from "@/lib/utils";

const orders = [
  {
    id: "ORD-001",
    singerName: "Ahmed Al-Rashid",
    singerImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    songType: "Wedding Song",
    status: "in_progress",
    date: "2026-01-15",
    price: "SAR 750",
    estimatedDelivery: "Jan 20, 2026",
  },
  {
    id: "ORD-002",
    singerName: "Sarah Mohammed",
    singerImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    songType: "Birthday Song",
    status: "completed",
    date: "2026-01-10",
    price: "SAR 450",
    estimatedDelivery: "Jan 14, 2026",
  },
  {
    id: "ORD-003",
    singerName: "Khalid Omar",
    singerImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    songType: "Shilat",
    status: "pending",
    date: "2026-01-18",
    price: "SAR 550",
    estimatedDelivery: "Jan 25, 2026",
  },
];

const statusConfig = {
  pending: {
    icon: Clock,
    label: "Pending",
    color: "text-yellow-500",
    bg: "bg-yellow-500/10",
  },
  in_progress: {
    icon: Package,
    label: "In Progress",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  completed: {
    icon: CheckCircle,
    label: "Completed",
    color: "text-green-500",
    bg: "bg-green-500/10",
  },
  cancelled: {
    icon: XCircle,
    label: "Cancelled",
    color: "text-red-500",
    bg: "bg-red-500/10",
  },
};

const OrdersPage = () => {
  return (
    <AppLayout>
      <div className="px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold">My Orders</h1>
            <p className="text-muted-foreground mt-2">
              Track and manage your song orders
            </p>
          </div>

          {/* Orders List */}
          <div className="space-y-4">
            {orders.map((order) => {
              const status = statusConfig[order.status as keyof typeof statusConfig];
              const StatusIcon = status.icon;

              return (
                <div
                  key={order.id}
                  className="bg-card border border-border rounded-2xl p-4 md:p-6"
                >
                  <div className="flex items-start gap-4">
                    {/* Singer Image */}
                    <img
                      src={order.singerImage}
                      alt={order.singerName}
                      className="w-16 h-16 rounded-xl object-cover"
                    />

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className="font-semibold">{order.songType}</h3>
                          <p className="text-sm text-muted-foreground">
                            by {order.singerName}
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
                          {status.label}
                        </div>
                      </div>

                      {/* Meta */}
                      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                        <span>Order #{order.id}</span>
                        <span>•</span>
                        <span>{order.date}</span>
                      </div>

                      {/* Footer */}
                      <div className="mt-4 flex items-center justify-between pt-3 border-t border-border">
                        <div>
                          <p className="text-xs text-muted-foreground">
                            Est. Delivery
                          </p>
                          <p className="text-sm font-medium">
                            {order.estimatedDelivery}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-muted-foreground">Total</p>
                          <p className="text-lg font-bold text-primary">
                            {order.price}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {orders.length === 0 && (
            <div className="text-center py-16">
              <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No orders yet</h3>
              <p className="text-muted-foreground">
                Start creating your personalized songs today!
              </p>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default OrdersPage;
