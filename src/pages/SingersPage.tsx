import { useState } from "react";
import { Search, Filter, ChevronDown } from "lucide-react";
import { AppLayout } from "@/components/songy/AppLayout";
import { SingerCard } from "@/components/songy/SingerCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const allSingers = [
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
    id: "2",
    name: "Sarah Mohammed",
    nameAr: "سارة محمد",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    rating: 4.8,
    reviewCount: 89,
    genres: ["Pop", "R&B", "Wedding"],
    priceRange: "SAR 400+",
  },
  {
    id: "3",
    name: "Khalid Omar",
    nameAr: "خالد عمر",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
    rating: 4.7,
    reviewCount: 203,
    genres: ["Shilat", "Traditional", "Celebration"],
    priceRange: "SAR 350+",
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
    id: "5",
    name: "Mohammed Ali",
    nameAr: "محمد علي",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    rating: 4.6,
    reviewCount: 134,
    genres: ["Arabic", "Wedding", "Romantic"],
    priceRange: "SAR 450+",
  },
  {
    id: "6",
    name: "Nora Abdullah",
    nameAr: "نورة عبدالله",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop",
    rating: 4.8,
    reviewCount: 92,
    genres: ["Pop", "Birthday", "Graduation"],
    priceRange: "SAR 380+",
  },
  {
    id: "7",
    name: "Faisal Khaled",
    nameAr: "فيصل خالد",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop",
    rating: 4.7,
    reviewCount: 167,
    genres: ["Shilat", "Traditional", "Celebration"],
    priceRange: "SAR 400+",
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
    isFeatured: true,
  },
];

const SingersPage = () => {
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("all");
  const [sortBy, setSortBy] = useState("rating");

  const filteredSingers = allSingers.filter((singer) => {
    const matchesSearch =
      singer.name.toLowerCase().includes(search.toLowerCase()) ||
      singer.nameAr?.includes(search);
    const matchesGenre =
      genre === "all" ||
      singer.genres.some((g) => g.toLowerCase() === genre.toLowerCase());
    return matchesSearch && matchesGenre;
  });

  return (
    <AppLayout>
      <div className="px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold">Discover Singers</h1>
            <p className="text-muted-foreground mt-2">
              Browse our talented artists and find your perfect voice
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search singers..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 bg-card border-border"
              />
            </div>

            <Select value={genre} onValueChange={setGenre}>
              <SelectTrigger className="w-full md:w-48 bg-card border-border">
                <SelectValue placeholder="Genre" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Genres</SelectItem>
                <SelectItem value="arabic">Arabic</SelectItem>
                <SelectItem value="pop">Pop</SelectItem>
                <SelectItem value="wedding">Wedding</SelectItem>
                <SelectItem value="shilat">Shilat</SelectItem>
                <SelectItem value="kids songs">Kids Songs</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full md:w-48 bg-card border-border">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="reviews">Most Reviews</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Results count */}
          <p className="text-sm text-muted-foreground mb-6">
            Showing {filteredSingers.length} singers
          </p>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredSingers.map((singer) => (
              <SingerCard key={singer.id} {...singer} />
            ))}
          </div>

          {filteredSingers.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground">
                No singers found matching your criteria
              </p>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default SingersPage;
