import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, User, Eye, EyeOff } from "lucide-react";
import { AppLayout } from "@/components/songy/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const AuthPage = () => {
  const { language } = useLanguage();
  const { toast } = useToast();
  const navigate = useNavigate();
  const isArabic = language === "ar";

  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fullName: "",
  });

  useEffect(() => {
    // Check if user is already logged in
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate("/");
      }
    };
    checkUser();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        navigate("/");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });

        if (error) throw error;

        toast({
          title: isArabic ? "تم تسجيل الدخول بنجاح" : "Logged in successfully",
          description: isArabic ? "مرحباً بك مجدداً!" : "Welcome back!",
        });
      } else {
        const { error } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            emailRedirectTo: window.location.origin,
            data: {
              full_name: formData.fullName,
            },
          },
        });

        if (error) throw error;

        toast({
          title: isArabic ? "تم إنشاء الحساب بنجاح" : "Account created successfully",
          description: isArabic ? "مرحباً بك في سونجي!" : "Welcome to SONGY!",
        });
      }
    } catch (error: any) {
      toast({
        title: isArabic ? "خطأ" : "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AppLayout>
      <div className="min-h-[80vh] flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">
              {isLogin
                ? (isArabic ? "تسجيل الدخول" : "Sign In")
                : (isArabic ? "إنشاء حساب" : "Create Account")}
            </h1>
            <p className="text-muted-foreground">
              {isLogin
                ? (isArabic ? "أهلاً بعودتك! سجل الدخول للمتابعة" : "Welcome back! Sign in to continue")
                : (isArabic ? "انضم إلى سونجي اليوم" : "Join SONGY today")}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="fullName" className="flex items-center gap-2">
                  <User className="w-4 h-4 text-primary" />
                  {isArabic ? "الاسم الكامل" : "Full Name"}
                </Label>
                <Input
                  id="fullName"
                  type="text"
                  placeholder={isArabic ? "أدخل اسمك" : "Enter your name"}
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="bg-card border-border"
                  required={!isLogin}
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary" />
                {isArabic ? "البريد الإلكتروني" : "Email"}
              </Label>
              <Input
                id="email"
                type="email"
                placeholder={isArabic ? "أدخل بريدك الإلكتروني" : "Enter your email"}
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="bg-card border-border"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-primary" />
                {isArabic ? "كلمة المرور" : "Password"}
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder={isArabic ? "أدخل كلمة المرور" : "Enter your password"}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="bg-card border-border pe-10"
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute end-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-12"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : isLogin ? (
                isArabic ? "تسجيل الدخول" : "Sign In"
              ) : (
                isArabic ? "إنشاء حساب" : "Create Account"
              )}
            </Button>
          </form>

          {/* Toggle */}
          <div className="mt-6 text-center">
            <p className="text-muted-foreground">
              {isLogin
                ? (isArabic ? "ليس لديك حساب؟" : "Don't have an account?")
                : (isArabic ? "لديك حساب بالفعل؟" : "Already have an account?")}
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-primary hover:underline ms-2 font-medium"
              >
                {isLogin
                  ? (isArabic ? "إنشاء حساب" : "Sign Up")
                  : (isArabic ? "تسجيل الدخول" : "Sign In")}
              </button>
            </p>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default AuthPage;
