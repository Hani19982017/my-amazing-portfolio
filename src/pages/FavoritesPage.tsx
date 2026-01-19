import { Heart, Trash2 } from "lucide-react";
import { AppLayout } from "@/components/songy/AppLayout";
import { SingerCard } from "@/components/songy/SingerCard";

const favorites = [
  {
    id: "1",
    name: "Ahmed Al-Rashid",
    nameAr: "أحمد الراشد",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    rating: 4.9,
    reviewCount: 156,
    genres: ["Arabic", "Khaleeji", "Pop"],
    priceRange: "SAR 500+",
    isFeatured: true,
  },
  {
    id: "4",
    name: "Layla Hassan",
    nameAr: "ليلى حسن",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
    rating: 4.9,
    reviewCount: 178,
    genres: ["Kids Songs", "Birthday", "Pop"],
    priceRange: "SAR 300+",
    isFeatured: true,
  },
  {
    id: "8",
    name: "Reem Saad",
    nameAr: "ريم سعد",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop",
    rating: 4.9,
    reviewCount: 211,
    genres: ["Kids Songs", "Newborn", "Lullaby"],
    priceRange: "SAR 350+",
  },
];

const FavoritesPage = () => {
  return (
    <AppLayout>
      <div className="px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold">Favorites</h1>
            <p className="text-muted-foreground mt-2">
              Your saved singers and studios
            </p>
          </div>

          {/* Grid */}
          {favorites.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {favorites.map((singer) => (
                <SingerCard key={singer.id} {...singer} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Heart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No favorites yet</h3>
              <p className="text-muted-foreground">
                Save your favorite singers and studios for quick access
              </p>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default FavoritesPage;
