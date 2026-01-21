import { useParams, Link } from "react-router-dom";
import { Star, Heart, Share2, MapPin, Clock, Music, Mic2, Calendar } from "lucide-react";
import { AppLayout } from "@/components/songy/AppLayout";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { PlayButton } from "@/components/songy/PlayButton";

// Sample singer data - in a real app this would come from an API/database
const singersData: Record<string, {
  id: string;
  name: string;
  nameAr: string;
  image: string;
  coverImage: string;
  rating: number;
  reviewCount: number;
  genres: string[];
  genresAr: string[];
  priceRange: string;
  bio: string;
  bioAr: string;
  location: string;
  locationAr: string;
  responseTime: string;
  responseTimeAr: string;
  completedOrders: number;
  sampleTracks: { title: string; titleAr: string; duration: string }[];
}> = {
  "1": {
    id: "1",
    name: "Ahmed Al-Farsi",
    nameAr: "أحمد الفارسي",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400",
    coverImage: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=1200",
    rating: 4.9,
    reviewCount: 128,
    genres: ["Pop", "R&B", "Weddings"],
    genresAr: ["بوب", "آر أند بي", "أعراس"],
    priceRange: "SAR 500+",
    bio: "Professional singer with over 10 years of experience in Arabic music. Specialized in wedding songs and romantic ballads.",
    bioAr: "مغني محترف بخبرة تزيد عن 10 سنوات في الموسيقى العربية. متخصص في أغاني الأفراح والأغاني الرومانسية.",
    location: "Riyadh, Saudi Arabia",
    locationAr: "الرياض، المملكة العربية السعودية",
    responseTime: "Usually responds within 2 hours",
    responseTimeAr: "عادة يرد خلال ساعتين",
    completedOrders: 342,
    sampleTracks: [
      { title: "Wedding Song Demo", titleAr: "عينة أغنية زفاف", duration: "2:45" },
      { title: "Birthday Celebration", titleAr: "احتفال عيد ميلاد", duration: "3:12" },
      { title: "Love Ballad", titleAr: "أغنية حب", duration: "4:01" },
    ],
  },
  "2": {
    id: "2",
    name: "Layla Hassan",
    nameAr: "ليلى حسن",
    image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=400",
    coverImage: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=1200",
    rating: 4.8,
    reviewCount: 89,
    genres: ["Traditional", "Khaleeji", "Occasions"],
    genresAr: ["تراثي", "خليجي", "مناسبات"],
    priceRange: "SAR 300+",
    bio: "Talented female vocalist specializing in traditional Arabic and Khaleeji music. Perfect for cultural events and celebrations.",
    bioAr: "مغنية موهوبة متخصصة في الموسيقى العربية التقليدية والخليجية. مثالية للفعاليات الثقافية والاحتفالات.",
    location: "Jeddah, Saudi Arabia",
    locationAr: "جدة، المملكة العربية السعودية",
    responseTime: "Usually responds within 4 hours",
    responseTimeAr: "عادة ترد خلال 4 ساعات",
    completedOrders: 215,
    sampleTracks: [
      { title: "Traditional Melody", titleAr: "لحن تراثي", duration: "3:22" },
      { title: "Khaleeji Song", titleAr: "أغنية خليجية", duration: "2:55" },
    ],
  },
  "3": {
    id: "3",
    name: "Omar Khalil",
    nameAr: "عمر خليل",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    coverImage: "https://images.unsplash.com/photo-1598387993441-a364f854c3e1?w=1200",
    rating: 4.7,
    reviewCount: 156,
    genres: ["Classical", "Tarab", "Poetry"],
    genresAr: ["كلاسيكي", "طرب", "شعر"],
    priceRange: "SAR 800+",
    bio: "Master of classical Arabic music and Tarab. Known for emotional performances and poetic interpretations.",
    bioAr: "أستاذ في الموسيقى العربية الكلاسيكية والطرب. معروف بالأداء العاطفي والتفسيرات الشعرية.",
    location: "Dubai, UAE",
    locationAr: "دبي، الإمارات",
    responseTime: "Usually responds within 1 day",
    responseTimeAr: "عادة يرد خلال يوم واحد",
    completedOrders: 189,
    sampleTracks: [
      { title: "Tarab Classic", titleAr: "طرب كلاسيكي", duration: "5:10" },
      { title: "Poetry Recital", titleAr: "إلقاء شعري", duration: "4:33" },
    ],
  },
  "4": {
    id: "4",
    name: "Sara Mohamed",
    nameAr: "سارة محمد",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
    coverImage: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1200",
    rating: 4.8,
    reviewCount: 89,
    genres: ["Pop", "R&B", "Weddings"],
    genresAr: ["بوب", "آر أند بي", "أعراس"],
    priceRange: "SAR 400+",
    bio: "Young and vibrant singer with a modern touch. Specializes in contemporary Arabic pop and wedding entertainment.",
    bioAr: "مغنية شابة ونابضة بالحياة بلمسة عصرية. متخصصة في البوب العربي المعاصر وحفلات الزفاف.",
    location: "Riyadh, Saudi Arabia",
    locationAr: "الرياض، المملكة العربية السعودية",
    responseTime: "Usually responds within 3 hours",
    responseTimeAr: "عادة ترد خلال 3 ساعات",
    completedOrders: 156,
    sampleTracks: [
      { title: "Pop Hit", titleAr: "أغنية بوب", duration: "3:05" },
      { title: "Wedding Song", titleAr: "أغنية زفاف", duration: "4:12" },
    ],
  },
};

const SingerDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { language } = useLanguage();
  const isArabic = language === "ar";

  const singer = singersData[id || "1"] || singersData["1"];

  const displayName = isArabic ? singer.nameAr : singer.name;
  const displayBio = isArabic ? singer.bioAr : singer.bio;
  const displayLocation = isArabic ? singer.locationAr : singer.location;
  const displayResponseTime = isArabic ? singer.responseTimeAr : singer.responseTime;
  const displayGenres = isArabic ? singer.genresAr : singer.genres;

  return (
    <AppLayout>
      <div className="pb-8">
        {/* Cover Image */}
        <div className="relative h-48 md:h-64 overflow-hidden">
          <img
            src={singer.coverImage}
            alt={displayName}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
          
          {/* Action Buttons */}
          <div className="absolute top-4 end-4 flex gap-2">
            <button className="w-10 h-10 rounded-full bg-background/80 backdrop-blur flex items-center justify-center hover:bg-primary/20 transition-colors">
              <Heart className="w-5 h-5 text-foreground" />
            </button>
            <button className="w-10 h-10 rounded-full bg-background/80 backdrop-blur flex items-center justify-center hover:bg-primary/20 transition-colors">
              <Share2 className="w-5 h-5 text-foreground" />
            </button>
          </div>
        </div>

        {/* Profile Section */}
        <div className="px-4 -mt-16 relative z-10">
          <div className="flex items-end gap-4 mb-6">
            {/* Profile Image */}
            <div className="relative">
              <img
                src={singer.image}
                alt={displayName}
                className="w-28 h-28 rounded-2xl object-cover ring-4 ring-background shadow-xl"
              />
              <div className="absolute -bottom-2 -end-2">
                <PlayButton size="sm" />
              </div>
            </div>

            {/* Name and Rating */}
            <div className="flex-1 pb-2">
              <h1 className="text-2xl font-bold text-foreground">{displayName}</h1>
              <div className="flex items-center gap-2 mt-1">
                <Star className="w-5 h-5 text-primary fill-primary" />
                <span className="font-semibold text-foreground">{singer.rating}</span>
                <span className="text-muted-foreground">
                  ({singer.reviewCount} {isArabic ? "تقييم" : "reviews"})
                </span>
              </div>
            </div>
          </div>

          {/* Genre Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {displayGenres.map((genre) => (
              <span
                key={genre}
                className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20"
              >
                {genre}
              </span>
            ))}
          </div>

          {/* Quick Info */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-card border border-border">
              <MapPin className="w-5 h-5 text-primary" />
              <span className="text-sm text-muted-foreground truncate">{displayLocation}</span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-card border border-border">
              <Clock className="w-5 h-5 text-primary" />
              <span className="text-sm text-muted-foreground truncate">
                {isArabic ? "يرد بسرعة" : "Quick response"}
              </span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-card border border-border">
              <Music className="w-5 h-5 text-primary" />
              <span className="text-sm text-muted-foreground">
                {singer.completedOrders} {isArabic ? "أغنية" : "songs"}
              </span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-card border border-border">
              <Calendar className="w-5 h-5 text-primary" />
              <span className="text-sm text-muted-foreground">
                {isArabic ? "متاح للحجز" : "Available"}
              </span>
            </div>
          </div>

          {/* Bio */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-3">
              {isArabic ? "نبذة" : "About"}
            </h2>
            <p className="text-muted-foreground leading-relaxed">{displayBio}</p>
          </div>

          {/* Sample Tracks */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-3">
              {isArabic ? "نماذج الأعمال" : "Sample Tracks"}
            </h2>
            <div className="space-y-2">
              {singer.sampleTracks.map((track, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 rounded-xl bg-card border border-border hover:bg-muted/50 transition-colors"
                >
                  <PlayButton size="sm" />
                  <div className="flex-1">
                    <p className="font-medium text-foreground">
                      {isArabic ? track.titleAr : track.title}
                    </p>
                  </div>
                  <span className="text-sm text-muted-foreground">{track.duration}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing & Book Button */}
          <div className="sticky bottom-20 md:bottom-4 bg-background/95 backdrop-blur-lg rounded-2xl p-4 border border-border shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  {isArabic ? "يبدأ من" : "Starting from"}
                </p>
                <p className="text-2xl font-bold text-primary">{singer.priceRange}</p>
              </div>
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 px-8"
                asChild
              >
                <Link
                  to={`/order?singerId=${singer.id}&singerName=${encodeURIComponent(singer.name)}&singerNameAr=${encodeURIComponent(singer.nameAr)}&price=${encodeURIComponent(singer.priceRange)}`}
                >
                  {isArabic ? "احجز الآن" : "Book Now"}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default SingerDetailPage;