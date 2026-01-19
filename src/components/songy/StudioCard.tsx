import { Star, MapPin, Clock, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface StudioCardProps {
  id: string;
  name: string;
  nameAr?: string;
  image: string;
  rating: number;
  reviewCount: number;
  location: string;
  services: string[];
  isVerified?: boolean;
  turnaround: string;
}

export const StudioCard = ({
  id,
  name,
  nameAr,
  image,
  rating,
  reviewCount,
  location,
  services,
  isVerified = false,
  turnaround,
}: StudioCardProps) => {
  return (
    <div className="group relative rounded-2xl overflow-hidden card-hover bg-card border border-border">
      {/* Verified Badge */}
      {isVerified && (
        <div className="absolute top-3 left-3 z-10 px-2 py-1 rounded-full bg-green-500/90 text-white text-xs font-semibold flex items-center gap-1">
          <CheckCircle className="w-3 h-3" />
          Verified
        </div>
      )}

      {/* Image */}
      <div className="relative aspect-video overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        <div>
          <h3 className="font-semibold text-foreground">{name}</h3>
          {nameAr && (
            <p className="text-sm text-primary/80">{nameAr}</p>
          )}
        </div>

        {/* Location & Turnaround */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            <span>{location}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{turnaround}</span>
          </div>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-primary fill-primary" />
            <span className="text-sm font-medium">{rating}</span>
          </div>
          <span className="text-xs text-muted-foreground">
            ({reviewCount} reviews)
          </span>
        </div>

        {/* Services */}
        <div className="flex flex-wrap gap-1.5">
          {services.slice(0, 3).map((service) => (
            <span
              key={service}
              className="px-2 py-0.5 rounded-full bg-primary/10 text-xs text-primary"
            >
              {service}
            </span>
          ))}
          {services.length > 3 && (
            <span className="px-2 py-0.5 rounded-full bg-muted text-xs text-muted-foreground">
              +{services.length - 3} more
            </span>
          )}
        </div>

        {/* Action */}
        <Button className="w-full bg-gradient-to-r from-primary to-accent text-primary-foreground hover:opacity-90">
          View Studio
        </Button>
      </div>
    </div>
  );
};
