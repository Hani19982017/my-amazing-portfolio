import { useState, useEffect } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { Music, User, MessageSquare, Send, ChevronDown, Building2, LogIn } from "lucide-react";
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
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

// Sample data - in real app would come from database
const defaultSingers = [
  { id: "1", name: "Ahmed Hassan", nameAr: "أحمد حسن", price: "SAR 500+", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop" },
  { id: "2", name: "Sara Abdullah", nameAr: "سارة عبدالله", price: "SAR 750+", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop" },
  { id: "3", name: "Mohammed Ali", nameAr: "محمد علي", price: "SAR 600+", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop" },
  { id: "4", name: "Nora Khalid", nameAr: "نورة خالد", price: "SAR 800+", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop" },
  { id: "5", name: "Omar Saeed", nameAr: "عمر سعيد", price: "SAR 450+", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop" },
];

const defaultStudios = [
  { id: "1", name: "Golden Voice Studio", nameAr: "استوديو الصوت الذهبي", price: "Starting from SAR 500" },
  { id: "2", name: "Melody Masters", nameAr: "أساتذة اللحن", price: "Starting from SAR 750" },
  { id: "3", name: "Sound Wave Studios", nameAr: "استوديوهات موجة الصوت", price: "Starting from SAR 400" },
  { id: "4", name: "Royal Music House", nameAr: "دار الموسيقى الملكية", price: "Starting from SAR 1500" },
  { id: "5", name: "Nada Studios", nameAr: "استوديوهات ندى", price: "Starting from SAR 350" },
  { id: "6", name: "Harmony Lab", nameAr: "مختبر الهارموني", price: "Starting from SAR 600" },
];

const categories = [
  { id: "wedding", labelKey: "category.wedding", labelAr: "زفاف" },
  { id: "birthday", labelKey: "category.birthday", labelAr: "عيد ميلاد" },
  { id: "newborn", labelKey: "category.newborn", labelAr: "مولود جديد" },
  { id: "graduation", labelKey: "category.graduation", labelAr: "تخرج" },
  { id: "celebration", labelKey: "category.celebration", labelAr: "احتفال" },
  { id: "shilat", labelKey: "category.shilat", labelAr: "شيلات" },
  { id: "love", labelKey: "category.love", labelAr: "حب" },
  { id: "kids", labelKey: "category.kids", labelAr: "أطفال" },
  { id: "mothersDay", labelKey: "category.mothersDay", labelAr: "عيد الأم" },
  { id: "fathersDay", labelKey: "category.fathersDay", labelAr: "عيد الأب" },
];

const OrderFormPage = () => {
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user, isLoading: authLoading } = useAuth();
  const [searchParams] = useSearchParams();
  const isArabic = language === "ar";

  // Get singer info from URL params (from SingerCard click)
  const urlSingerId = searchParams.get("singerId");
  const urlSingerName = searchParams.get("singerName");
  const urlSingerNameAr = searchParams.get("singerNameAr");
  const urlPrice = searchParams.get("price");

  // Get studio info from URL params (from StudioDetailPage click)
  const urlStudioId = searchParams.get("studioId");
  const urlStudioName = searchParams.get("studioName");
  const urlStudioNameAr = searchParams.get("studioNameAr");
  const urlStudioPrice = searchParams.get("studioPrice");

  // Create singers list including URL singer if not already in list
  const singers = urlSingerId && urlSingerName && !defaultSingers.find(s => s.id === urlSingerId)
    ? [...defaultSingers, { id: urlSingerId, name: urlSingerName, nameAr: urlSingerNameAr || "", price: urlPrice || "", image: "" }]
    : defaultSingers;

  // Create studios list including URL studio if not already in list
  const studios = urlStudioId && urlStudioName && !defaultStudios.find(s => s.id === urlStudioId)
    ? [...defaultStudios, { id: urlStudioId, name: urlStudioName, nameAr: urlStudioNameAr || "", price: urlStudioPrice || "" }]
    : defaultStudios;

  const [formData, setFormData] = useState({
    singerId: urlSingerId || "",
    studioId: urlStudioId || "",
    category: "",
    recipientName: "",
    message: "",
  });

  // Update form when URL params change
  useEffect(() => {
    if (urlSingerId) {
      setFormData(prev => ({ ...prev, singerId: urlSingerId }));
    }
    if (urlStudioId) {
      setFormData(prev => ({ ...prev, studioId: urlStudioId }));
    }
  }, [urlSingerId, urlStudioId]);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast({
        title: isArabic ? "يجب تسجيل الدخول" : "Login Required",
        description: isArabic ? "يرجى تسجيل الدخول لإرسال الطلب" : "Please sign in to submit an order",
        variant: "destructive",
      });
      navigate("/auth");
      return;
    }

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

    try {
      const selectedSinger = singers.find((s) => s.id === formData.singerId);
      const selectedStudio = studios.find((s) => s.id === formData.studioId);
      const selectedCategory = categories.find((c) => c.id === formData.category);

      // Calculate estimated delivery (7 days from now)
      const estimatedDelivery = new Date();
      estimatedDelivery.setDate(estimatedDelivery.getDate() + 7);

      const { error } = await supabase.from("orders").insert({
        user_id: user.id,
        singer_id: formData.singerId,
        singer_name: selectedSinger?.name || "",
        singer_name_ar: selectedSinger?.nameAr || null,
        singer_image: selectedSinger?.image || null,
        studio_id: formData.studioId || null,
        studio_name: selectedStudio?.name || null,
        studio_name_ar: selectedStudio?.nameAr || null,
        category: formData.category,
        category_ar: selectedCategory?.labelAr || null,
        recipient_name: formData.recipientName,
        message: formData.message || null,
        status: "pending",
        price: selectedSinger?.price || null,
        estimated_delivery: estimatedDelivery.toISOString().split("T")[0],
      });

      if (error) throw error;

      toast({
        title: t("orderForm.success"),
        description: t("orderForm.successDesc"),
      });

      navigate("/orders");
    } catch (error: any) {
      toast({
        title: t("orderForm.error"),
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedSinger = singers.find((s) => s.id === formData.singerId);
  const selectedStudio = studios.find((s) => s.id === formData.studioId);

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
                ? "يرجى تسجيل الدخول أو إنشاء حساب لطلب أغنية مخصصة"
                : "Please sign in or create an account to order a custom song"}
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

          {/* Studio Selection */}
          <div className="space-y-2">
            <Label htmlFor="studio" className="flex items-center gap-2 text-foreground">
              <Building2 className="w-4 h-4 text-primary" />
              {isArabic ? "اختر الاستوديو" : "Select Studio"}
            </Label>
            <Select
              value={formData.studioId}
              onValueChange={(value) => setFormData({ ...formData, studioId: value })}
            >
              <SelectTrigger className="w-full bg-card border-border">
                <SelectValue placeholder={isArabic ? "اختر استوديو..." : "Choose a studio..."} />
              </SelectTrigger>
              <SelectContent>
                {studios.map((studio) => (
                  <SelectItem key={studio.id} value={studio.id}>
                    <div className="flex items-center justify-between w-full gap-4">
                      <span>{isArabic ? studio.nameAr : studio.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {selectedStudio && (
              <p className="text-sm text-primary">
                {selectedStudio.price}
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
