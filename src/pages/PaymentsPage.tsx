import { CreditCard, Plus, Trash2 } from "lucide-react";
import { AppLayout } from "@/components/songy/AppLayout";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

const paymentMethods = [
  {
    id: "1",
    type: "visa",
    last4: "4242",
    expiryMonth: "12",
    expiryYear: "2027",
    isDefault: true,
    brand: "Visa",
  },
  {
    id: "2",
    type: "mastercard",
    last4: "5678",
    expiryMonth: "08",
    expiryYear: "2026",
    isDefault: false,
    brand: "Mastercard",
  },
  {
    id: "3",
    type: "mada",
    last4: "9012",
    expiryMonth: "03",
    expiryYear: "2025",
    isDefault: false,
    brand: "Mada",
  },
];

const PaymentsPage = () => {
  const { t } = useLanguage();

  const getCardIcon = (type: string) => {
    switch (type) {
      case "visa":
        return (
          <div className="w-12 h-8 bg-gradient-to-br from-blue-600 to-blue-800 rounded flex items-center justify-center text-white text-xs font-bold">
            VISA
          </div>
        );
      case "mastercard":
        return (
          <div className="w-12 h-8 bg-gradient-to-br from-red-500 to-orange-500 rounded flex items-center justify-center">
            <div className="w-4 h-4 bg-red-400 rounded-full -mr-1" />
            <div className="w-4 h-4 bg-yellow-400 rounded-full -ml-1" />
          </div>
        );
      case "mada":
        return (
          <div className="w-12 h-8 bg-gradient-to-br from-teal-500 to-green-600 rounded flex items-center justify-center text-white text-xs font-bold">
            mada
          </div>
        );
      default:
        return <CreditCard className="w-8 h-8 text-muted-foreground" />;
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
                {t("payments.title")}
              </h1>
              <p className="text-muted-foreground mt-2">
                {t("payments.subtitle")}
              </p>
            </div>
            <Button className="bg-gradient-to-r from-primary to-accent text-primary-foreground">
              <Plus className="w-4 h-4 mr-2" />
              {t("payments.addNew")}
            </Button>
          </div>

          {/* Payment Methods List */}
          {paymentMethods.length > 0 ? (
            <div className="space-y-4">
              {paymentMethods.map((method) => (
                <div
                  key={method.id}
                  className={cn(
                    "flex items-center gap-4 p-4 rounded-2xl bg-card border transition-colors",
                    method.isDefault
                      ? "border-primary/50 bg-primary/5"
                      : "border-border"
                  )}
                >
                  {/* Card Icon */}
                  {getCardIcon(method.type)}

                  {/* Card Details */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{method.brand}</span>
                      <span className="text-muted-foreground">
                        •••• {method.last4}
                      </span>
                      {method.isDefault && (
                        <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium">
                          {t("payments.default")}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {t("payments.expires")} {method.expiryMonth}/
                      {method.expiryYear}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    {!method.isDefault && (
                      <Button variant="ghost" size="sm">
                        {t("payments.setDefault")}
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-destructive hover:text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <CreditCard className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">
                {t("payments.noMethods")}
              </h3>
              <p className="text-muted-foreground mb-4">
                {t("payments.noMethodsDesc")}
              </p>
              <Button className="bg-gradient-to-r from-primary to-accent text-primary-foreground">
                <Plus className="w-4 h-4 mr-2" />
                {t("payments.addNew")}
              </Button>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default PaymentsPage;
