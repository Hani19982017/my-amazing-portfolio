import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Music, User, MessageSquare, Send, ChevronDown } from "lucide-react";
import { AppLayout } from "@/components/songy/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";

// Sample data - in real app would come from database
const singers = [
  { id: "1", name: "Ahmed Hassan", nameAr: "أحمد حسن", price: "SAR 500+" },
  { id: "2", name: "Sara Abdullah", nameAr: "سارة عبدالله", price: "SAR 750+" },
  { id: "3", name: "Mohammed Ali", nameAr: "محمد علي", price: "SAR 600+" },
  { id: "4", name: "Nora Khalid", nameAr: "نورة خالد", price: "SAR 800+" },
  { id: "5", name: "Omar Saeed", nameAr: "عمر سعيد", price: "SAR 450+" },
];

const categories = [
  { id: "wedding", labelKey: "category.wedding" },
  { id: "birthday", labelKey: "category.birthday" },
  { id: "newborn", labelKey: "category.newborn" },
  { id: "graduation", labelKey: "category.graduation" },
  { id: "celebration", labelKey: "category.celebration" },
  { id: "shilat", labelKey: "category.shilat" },
  { id: "love", labelKey: "category.love" },
  { id: "kids", labelKey: "category.kids" },
  { id: "mothersDay", labelKey: "category.mothersDay" },
  { id: "fathersDay", labelKey: "category.fathersDay" },
];

const OrderFormPage = () => {
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const navigate = useNavigate();
  const isArabic = language === "ar";

  const [formData, setFormData] = useState({
    singerId: "",
    category: "",
    recipientName: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.singerId || !formData.category || !formData.recipientName.trim()) {
      toast({
        title: t("orderForm.error"),
        description: t("orderForm.fillRequired"),
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate order submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast({
      title: t("orderForm.success"),
      description: t("orderForm.successDesc"),
    });

    setIsSubmitting(false);
    navigate("/orders");
  };

  const selectedSinger = singers.find((s) => s.id === formData.singerId);

  return (
    <AppLayout>
      <div className="p-4 md:p-8 max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            {t("orderForm.title")}
          </h1>
          <p className="text-muted-foreground">
            {t("orderForm.subtitle")}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Singer Selection */}
          <div className="space-y-2">
            <Label htmlFor="singer" className="flex items-center gap-2 text-foreground">
              <Music className="w-4 h-4 text-primary" />
              {t("orderForm.selectSinger")} *
            </Label>
            <Select
              value={formData.singerId}
              onValueChange={(value) => setFormData({ ...formData, singerId: value })}
            >
              <SelectTrigger className="w-full bg-card border-border">
                <SelectValue placeholder={t("orderForm.chooseSinger")} />
              </SelectTrigger>
              <SelectContent>
                {singers.map((singer) => (
                  <SelectItem key={singer.id} value={singer.id}>
                    <div className="flex items-center justify-between w-full gap-4">
                      <span>{isArabic ? singer.nameAr : singer.name}</span>
                      <span className="text-muted-foreground text-sm">{singer.price}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {selectedSinger && (
              <p className="text-sm text-primary">
                {t("orderForm.priceStarting")}: {selectedSinger.price}
              </p>
            )}
          </div>

          {/* Category Selection */}
          <div className="space-y-2">
            <Label htmlFor="category" className="flex items-center gap-2 text-foreground">
              <ChevronDown className="w-4 h-4 text-primary" />
              {t("orderForm.selectCategory")} *
            </Label>
            <Select
              value={formData.category}
              onValueChange={(value) => setFormData({ ...formData, category: value })}
            >
              <SelectTrigger className="w-full bg-card border-border">
                <SelectValue placeholder={t("orderForm.chooseCategory")} />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {t(category.labelKey)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Recipient Name */}
          <div className="space-y-2">
            <Label htmlFor="recipientName" className="flex items-center gap-2 text-foreground">
              <User className="w-4 h-4 text-primary" />
              {t("orderForm.recipientName")} *
            </Label>
            <Input
              id="recipientName"
              type="text"
              placeholder={t("orderForm.recipientPlaceholder")}
              value={formData.recipientName}
              onChange={(e) => setFormData({ ...formData, recipientName: e.target.value })}
              className="bg-card border-border"
              maxLength={100}
            />
            <p className="text-xs text-muted-foreground">
              {t("orderForm.recipientHint")}
            </p>
          </div>

          {/* Custom Message */}
          <div className="space-y-2">
            <Label htmlFor="message" className="flex items-center gap-2 text-foreground">
              <MessageSquare className="w-4 h-4 text-primary" />
              {t("orderForm.customMessage")}
            </Label>
            <Textarea
              id="message"
              placeholder={t("orderForm.messagePlaceholder")}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="bg-card border-border min-h-[120px] resize-none"
              maxLength={500}
            />
            <p className="text-xs text-muted-foreground text-end">
              {formData.message.length}/500
            </p>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary text-white hover:bg-primary/90 h-12 text-lg"
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                {t("orderForm.submitting")}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Send className="w-5 h-5" />
                {t("orderForm.submit")}
              </div>
            )}
          </Button>
        </form>

        {/* Order Info */}
        <div className="mt-8 p-4 rounded-xl bg-card border border-border">
          <h3 className="font-semibold text-foreground mb-2">
            {t("orderForm.whatHappens")}
          </h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• {t("orderForm.step1")}</li>
            <li>• {t("orderForm.step2")}</li>
            <li>• {t("orderForm.step3")}</li>
            <li>• {t("orderForm.step4")}</li>
          </ul>
        </div>
      </div>
    </AppLayout>
  );
};

export default OrderFormPage;
