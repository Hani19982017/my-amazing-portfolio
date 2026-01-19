import { useState } from "react";
import { Search, MapPin } from "lucide-react";
import { AppLayout } from "@/components/songy/AppLayout";
import { StudioCard } from "@/components/songy/StudioCard";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const allStudios = [
  {
    id: "1",
    name: "Golden Voice Studio",
    nameAr: "استوديو الصوت الذهبي",
    image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=600&h=400&fit=crop",
    rating: 4.9,
    reviewCount: 234,
    location: "Riyadh",
    services: ["Song Production", "Mixing", "Mastering", "Video"],
    isVerified: true,
    turnaround: "3-5 days",
  },
  {
    id: "2",
    name: "Melody Masters",
    nameAr: "أساتذة اللحن",
    image: "https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?w=600&h=400&fit=crop",
    rating: 4.8,
    reviewCount: 189,
    location: "Jeddah",
    services: ["Recording", "Composition", "Arrangement"],
    isVerified: true,
    turnaround: "2-4 days",
  },
  {
    id: "3",
    name: "Sound Wave Studios",
    nameAr: "استوديوهات موجة الصوت",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=400&fit=crop",
    rating: 4.7,
    reviewCount: 156,
    location: "Dammam",
    services: ["Production", "Dubbing", "Voice Over"],
    isVerified: false,
    turnaround: "4-7 days",
  },
  {
    id: "4",
    name: "Royal Music House",
    nameAr: "دار الموسيقى الملكية",
    image: "https://images.unsplash.com/photo-1598653222000-6b7b7a552625?w=600&h=400&fit=crop",
    rating: 4.9,
    reviewCount: 312,
    location: "Riyadh",
    services: ["Full Production", "Live Recording", "Orchestra"],
    isVerified: true,
    turnaround: "5-10 days",
  },
  {
    id: "5",
    name: "Nada Studios",
    nameAr: "استوديوهات ندى",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop",
    rating: 4.6,
    reviewCount: 98,
    location: "Mecca",
    services: ["Recording", "Mixing", "Shilat"],
    isVerified: true,
    turnaround: "3-5 days",
  },
  {
    id: "6",
    name: "Harmony Lab",
    nameAr: "مختبر الهارموني",
    image: "https://images.unsplash.com/photo-1509336858407-5ca10db13eb2?w=600&h=400&fit=crop",
    rating: 4.8,
    reviewCount: 145,
    location: "Jeddah",
    services: ["Production", "Composition", "Video Production"],
    isVerified: false,
    turnaround: "2-5 days",
  },
];

const StudiosPage = () => {
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("all");

  const filteredStudios = allStudios.filter((studio) => {
    const matchesSearch =
      studio.name.toLowerCase().includes(search.toLowerCase()) ||
      studio.nameAr?.includes(search);
    const matchesLocation =
      location === "all" ||
      studio.location.toLowerCase() === location.toLowerCase();
    return matchesSearch && matchesLocation;
  });

  return (
    <AppLayout>
      <div className="px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold">
              Professional Studios
            </h1>
            <p className="text-muted-foreground mt-2">
              Partner with top recording studios for professional quality
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search studios..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 bg-card border-border"
              />
            </div>

            <Select value={location} onValueChange={setLocation}>
              <SelectTrigger className="w-full md:w-48 bg-card border-border">
                <MapPin className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                <SelectItem value="riyadh">Riyadh</SelectItem>
                <SelectItem value="jeddah">Jeddah</SelectItem>
                <SelectItem value="dammam">Dammam</SelectItem>
                <SelectItem value="mecca">Mecca</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Results count */}
          <p className="text-sm text-muted-foreground mb-6">
            Showing {filteredStudios.length} studios
          </p>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStudios.map((studio) => (
              <StudioCard key={studio.id} {...studio} />
            ))}
          </div>

          {filteredStudios.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground">
                No studios found matching your criteria
              </p>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default StudiosPage;
