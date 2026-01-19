import { useParams, Link } from "react-router-dom";
import { Star, MapPin, Clock, CheckCircle, ArrowLeft, ArrowRight, Phone, Mail, Music, Mic, Video, Headphones } from "lucide-react";
import { AppLayout } from "@/components/songy/AppLayout";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

// Sample data - in real app would come from database
const studiosData: Record<string, {
  id: string;
  name: string;
  nameAr: string;
  image: string;
  gallery: string[];
  rating: number;
  reviewCount: number;
  location: string;
  locationAr: string;
  services: string[];
  servicesAr: string[];
  isVerified: boolean;
  turnaround: string;
  turnaroundAr: string;
  description: string;
  descriptionAr: string;
  price: string;
  priceAr: string;
  equipment: string[];
  equipmentAr: string[];
  phone: string;
  email: string;
}> = {
  "1": {
    id: "1",
    name: "Golden Voice Studio",
    nameAr: "استوديو الصوت الذهبي",
    image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&h=500&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=400&fit=crop",
    ],
    rating: 4.9,
    reviewCount: 234,
    location: "Riyadh",
    locationAr: "الرياض",
    services: ["Song Production", "Mixing", "Mastering", "Video"],
    servicesAr: ["إنتاج أغاني", "ميكسينج", "ماسترينج", "فيديو"],
    isVerified: true,
    turnaround: "3-5 days",
    turnaroundAr: "3-5 أيام",
    description: "Golden Voice Studio is a premium recording facility equipped with state-of-the-art technology. We specialize in Arabic music production, offering complete services from recording to final mastering.",
    descriptionAr: "استوديو الصوت الذهبي هو مرفق تسجيل متميز مجهز بأحدث التقنيات. نحن متخصصون في إنتاج الموسيقى العربية، ونقدم خدمات كاملة من التسجيل إلى الماسترينج النهائي.",
    price: "Starting from SAR 500",
    priceAr: "تبدأ من 500 ريال",
    equipment: ["Pro Tools HD", "Neumann U87", "SSL Console", "Yamaha HS8"],
    equipmentAr: ["برو تولز HD", "نيومان U87", "كونسول SSL", "ياماها HS8"],
    phone: "+966 50 123 4567",
    email: "info@goldenvoice.sa",
  },
  "2": {
    id: "2",
    name: "Melody Masters",
    nameAr: "أساتذة اللحن",
    image: "https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?w=800&h=500&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=600&h=400&fit=crop",
    ],
    rating: 4.8,
    reviewCount: 189,
    location: "Jeddah",
    locationAr: "جدة",
    services: ["Recording", "Composition", "Arrangement"],
    servicesAr: ["تسجيل", "تأليف", "توزيع"],
    isVerified: true,
    turnaround: "2-4 days",
    turnaroundAr: "2-4 أيام",
    description: "Melody Masters brings your musical vision to life with expert composition and arrangement services. Our team of experienced musicians crafts unique melodies tailored to your needs.",
    descriptionAr: "أساتذة اللحن يحولون رؤيتك الموسيقية إلى واقع مع خدمات التأليف والتوزيع المتخصصة. فريقنا من الموسيقيين ذوي الخبرة يصنعون ألحاناً فريدة مصممة لاحتياجاتك.",
    price: "Starting from SAR 750",
    priceAr: "تبدأ من 750 ريال",
    equipment: ["Logic Pro X", "AKG C414", "Universal Audio", "Adam A7X"],
    equipmentAr: ["لوجيك برو X", "AKG C414", "يونيفرسال أوديو", "آدم A7X"],
    phone: "+966 55 987 6543",
    email: "contact@melodymasters.sa",
  },
  "3": {
    id: "3",
    name: "Sound Wave Studios",
    nameAr: "استوديوهات موجة الصوت",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=500&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop",
    ],
    rating: 4.7,
    reviewCount: 156,
    location: "Dammam",
    locationAr: "الدمام",
    services: ["Production", "Dubbing", "Voice Over"],
    servicesAr: ["إنتاج", "دوبلاج", "تعليق صوتي"],
    isVerified: false,
    turnaround: "4-7 days",
    turnaroundAr: "4-7 أيام",
    description: "Sound Wave Studios specializes in voice-over work and dubbing services. Perfect for commercials, documentaries, and audiobook productions.",
    descriptionAr: "استوديوهات موجة الصوت متخصصة في أعمال التعليق الصوتي والدوبلاج. مثالية للإعلانات والأفلام الوثائقية وإنتاج الكتب الصوتية.",
    price: "Starting from SAR 400",
    priceAr: "تبدأ من 400 ريال",
    equipment: ["Ableton Live", "Shure SM7B", "Focusrite", "KRK Rokit"],
    equipmentAr: ["أبلتون لايف", "شور SM7B", "فوكسرايت", "KRK Rokit"],
    phone: "+966 53 456 7890",
    email: "hello@soundwave.sa",
  },
  "4": {
    id: "4",
    name: "Royal Music House",
    nameAr: "دار الموسيقى الملكية",
    image: "https://images.unsplash.com/photo-1598653222000-6b7b7a552625?w=800&h=500&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1598653222000-6b7b7a552625?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=600&h=400&fit=crop",
    ],
    rating: 4.9,
    reviewCount: 312,
    location: "Riyadh",
    locationAr: "الرياض",
    services: ["Full Production", "Live Recording", "Orchestra"],
    servicesAr: ["إنتاج كامل", "تسجيل مباشر", "أوركسترا"],
    isVerified: true,
    turnaround: "5-10 days",
    turnaroundAr: "5-10 أيام",
    description: "Royal Music House is the premier destination for full-scale music production. Our large live room can accommodate full orchestras and choirs for spectacular recordings.",
    descriptionAr: "دار الموسيقى الملكية هي الوجهة الأولى للإنتاج الموسيقي الشامل. يمكن لغرفتنا الحية الكبيرة استيعاب أوركسترات وجوقات كاملة لتسجيلات رائعة.",
    price: "Starting from SAR 1500",
    priceAr: "تبدأ من 1500 ريال",
    equipment: ["Avid S6", "Telefunken U47", "API 500", "Genelec 8351"],
    equipmentAr: ["أفيد S6", "تليفنكن U47", "API 500", "جينيليك 8351"],
    phone: "+966 50 111 2222",
    email: "royal@musichouse.sa",
  },
  "5": {
    id: "5",
    name: "Nada Studios",
    nameAr: "استوديوهات ندى",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=500&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1509336858407-5ca10db13eb2?w=600&h=400&fit=crop",
    ],
    rating: 4.6,
    reviewCount: 98,
    location: "Mecca",
    locationAr: "مكة",
    services: ["Recording", "Mixing", "Shilat"],
    servicesAr: ["تسجيل", "ميكسينج", "شيلات"],
    isVerified: true,
    turnaround: "3-5 days",
    turnaroundAr: "3-5 أيام",
    description: "Nada Studios specializes in traditional Arabic Shilat and poetry recordings. We preserve the authentic sound while using modern recording techniques.",
    descriptionAr: "استوديوهات ندى متخصصة في تسجيلات الشيلات والشعر العربي التقليدي. نحافظ على الصوت الأصيل مع استخدام تقنيات التسجيل الحديثة.",
    price: "Starting from SAR 350",
    priceAr: "تبدأ من 350 ريال",
    equipment: ["Cubase Pro", "Rode NT1-A", "PreSonus", "JBL 305P"],
    equipmentAr: ["كيوبيس برو", "رود NT1-A", "بريسونس", "JBL 305P"],
    phone: "+966 54 333 4444",
    email: "info@nadastudios.sa",
  },
  "6": {
    id: "6",
    name: "Harmony Lab",
    nameAr: "مختبر الهارموني",
    image: "https://images.unsplash.com/photo-1509336858407-5ca10db13eb2?w=800&h=500&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1509336858407-5ca10db13eb2?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?w=600&h=400&fit=crop",
    ],
    rating: 4.8,
    reviewCount: 145,
    location: "Jeddah",
    locationAr: "جدة",
    services: ["Production", "Composition", "Video Production"],
    servicesAr: ["إنتاج", "تأليف", "إنتاج فيديو"],
    isVerified: false,
    turnaround: "2-5 days",
    turnaroundAr: "2-5 أيام",
    description: "Harmony Lab combines audio and video production under one roof. Create complete music videos and promotional content with our talented team.",
    descriptionAr: "مختبر الهارموني يجمع بين الإنتاج الصوتي والمرئي تحت سقف واحد. أنشئ فيديوهات موسيقية كاملة ومحتوى ترويجي مع فريقنا الموهوب.",
    price: "Starting from SAR 600",
    priceAr: "تبدأ من 600 ريال",
    equipment: ["FL Studio", "Audio-Technica AT4050", "RME", "Dynaudio"],
    equipmentAr: ["FL Studio", "أوديو تكنيكا AT4050", "RME", "داينوديو"],
    phone: "+966 55 555 6666",
    email: "studio@harmonylab.sa",
  },
};

const serviceIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  "Song Production": Music,
  "إنتاج أغاني": Music,
  "Recording": Mic,
  "تسجيل": Mic,
  "Mixing": Headphones,
  "ميكسينج": Headphones,
  "Video": Video,
  "فيديو": Video,
  "Video Production": Video,
  "إنتاج فيديو": Video,
};

const StudioDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { t, language } = useLanguage();
  const isArabic = language === "ar";

  const studio = id ? studiosData[id] : null;

  if (!studio) {
    return (
      <AppLayout>
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
          <h1 className="text-2xl font-bold mb-4">
            {isArabic ? "الاستوديو غير موجود" : "Studio Not Found"}
          </h1>
          <Button asChild>
            <Link to="/studios">
              {isArabic ? "العودة إلى الاستوديوهات" : "Back to Studios"}
            </Link>
          </Button>
        </div>
      </AppLayout>
    );
  }

  const BackArrow = isArabic ? ArrowRight : ArrowLeft;
  const displayServices = isArabic ? studio.servicesAr : studio.services;
  const displayEquipment = isArabic ? studio.equipmentAr : studio.equipment;

  return (
    <AppLayout>
      <div className="px-4 py-6 md:py-8">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Link
            to="/studios"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
          >
            <BackArrow className="w-4 h-4" />
            {isArabic ? "العودة إلى الاستوديوهات" : "Back to Studios"}
          </Link>

          {/* Hero Image */}
          <div className="relative rounded-2xl overflow-hidden mb-6">
            <img
              src={studio.image}
              alt={isArabic ? studio.nameAr : studio.name}
              className="w-full aspect-video object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
            
            {/* Verified Badge */}
            {studio.isVerified && (
              <div className="absolute top-4 start-4 px-3 py-1.5 rounded-full bg-green-500/90 text-white text-sm font-semibold flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4" />
                {t("studios.verified")}
              </div>
            )}
          </div>

          {/* Studio Info */}
          <div className="space-y-6">
            {/* Header */}
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">
                {isArabic ? studio.nameAr : studio.name}
              </h1>
              {!isArabic && (
                <p className="text-lg text-foreground/80 mt-1">{studio.nameAr}</p>
              )}
            </div>

            {/* Quick Info */}
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>{isArabic ? studio.locationAr : studio.location}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span>{isArabic ? studio.turnaroundAr : studio.turnaround}</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-foreground fill-foreground" />
                <span className="font-medium">{studio.rating}</span>
                <span className="text-muted-foreground">
                  ({studio.reviewCount} {t("singers.reviews")})
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="p-4 rounded-xl bg-primary/10 border border-primary/20">
              <p className="text-sm text-muted-foreground">
                {isArabic ? "السعر" : "Price"}
              </p>
              <p className="text-xl font-bold text-primary">
                {isArabic ? studio.priceAr : studio.price}
              </p>
            </div>

            {/* Description */}
            <div>
              <h2 className="text-lg font-semibold mb-2">
                {isArabic ? "عن الاستوديو" : "About the Studio"}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {isArabic ? studio.descriptionAr : studio.description}
              </p>
            </div>

            {/* Services */}
            <div>
              <h2 className="text-lg font-semibold mb-3">
                {isArabic ? "الخدمات" : "Services"}
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {displayServices.map((service) => {
                  const IconComponent = serviceIcons[service] || Music;
                  return (
                    <div
                      key={service}
                      className="flex items-center gap-2 p-3 rounded-xl bg-card border border-border"
                    >
                      <IconComponent className="w-5 h-5 text-primary" />
                      <span className="text-sm">{service}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Equipment */}
            <div>
              <h2 className="text-lg font-semibold mb-3">
                {isArabic ? "المعدات" : "Equipment"}
              </h2>
              <div className="flex flex-wrap gap-2">
                {displayEquipment.map((item) => (
                  <span
                    key={item}
                    className="px-3 py-1.5 rounded-full bg-muted text-sm"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Gallery */}
            {studio.gallery.length > 1 && (
              <div>
                <h2 className="text-lg font-semibold mb-3">
                  {isArabic ? "معرض الصور" : "Gallery"}
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {studio.gallery.map((img, index) => (
                    <div key={index} className="rounded-xl overflow-hidden">
                      <img
                        src={img}
                        alt={`${studio.name} ${index + 1}`}
                        className="w-full aspect-video object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Contact */}
            <div>
              <h2 className="text-lg font-semibold mb-3">
                {isArabic ? "التواصل" : "Contact"}
              </h2>
              <div className="space-y-2">
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Phone className="w-4 h-4" />
                  <span dir="ltr">{studio.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Mail className="w-4 h-4" />
                  <span>{studio.email}</span>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button
                size="lg"
                className="flex-1 bg-gradient-to-r from-primary to-accent text-primary-foreground"
              >
                {isArabic ? "احجز الآن" : "Book Now"}
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="flex-1"
                asChild
              >
                <a href={`mailto:${studio.email}`}>
                  {isArabic ? "تواصل معنا" : "Contact Us"}
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default StudioDetailPage;
