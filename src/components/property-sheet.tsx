"use client";

import type { FC } from "react";
import Image from "next/image";
import { Star, Train, DollarSign, MapPin } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import PoiRecommendations from "./poi-recommendations";
import type { Property } from "@/types";

interface PropertySheetProps {
  property: Property | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const PropertySheet: FC<PropertySheetProps> = ({ property, open, onOpenChange }) => {
  if (!property) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:w-3/4 md:w-1/2 lg:w-[450px] flex flex-col p-0">
        <div className="relative">
          <Image
            src={property.imageUrl}
            alt={property.name}
            width={450}
            height={250}
            className="object-cover w-full h-[250px]"
            data-ai-hint="hotel room"
          />
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
            <h2 className="text-2xl font-bold font-headline text-white">{property.name}</h2>
            <p className="text-sm text-primary-foreground/90 flex items-center gap-2"><MapPin size={14}/>{property.locationName}</p>
          </div>
        </div>

        <div className="p-6 flex-1 overflow-y-auto">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-accent fill-accent" />
              <span className="font-bold text-lg">{property.rating.toFixed(1)}</span>
            </div>
            <div className="flex items-center gap-1">
                <DollarSign className="w-5 h-5 text-foreground"/>
              <span className="font-bold text-lg">{property.price}</span>
              <span className="text-sm text-muted-foreground">/ night</span>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 mt-4">
            {property.tags.map(tag => (
              <Badge key={tag} variant="secondary">{tag}</Badge>
            ))}
          </div>

          <Separator className="my-6" />

          <PoiRecommendations property={property} />

          <Separator className="my-6" />

          <div className="space-y-4">
             <h3 className="font-headline font-semibold text-lg flex items-center gap-2">
              <Train className="w-5 h-5 text-primary" />
              Nearest Metro Stations
            </h3>
            <ul className="space-y-2">
              {property.nearbyMetroStations.map(station => (
                <li key={station.name} className="flex justify-between items-center text-sm">
                  <span>{station.name}</span>
                  <span className="text-muted-foreground">{station.distance}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default PropertySheet;
