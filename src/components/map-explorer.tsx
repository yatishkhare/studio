"use client";

import { useState, useMemo, useCallback } from "react";
import { Filter } from "lucide-react";

import MapView from "@/components/map-view";
import FilterPanel from "@/components/filter-panel";
import PropertySheet from "@/components/property-sheet";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import { properties as allProperties } from "@/lib/mock-data";
import type { Property, Filters } from "@/types";

export default function MapExplorer() {
  const [filters, setFilters] = useState<Filters>({
    budget: 500,
    rating: 3,
    tags: [],
  });
  const [isFilterPanelOpen, setFilterPanelOpen] = useState(false);
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(null);

  const filteredProperties = useMemo(() => {
    return allProperties.filter((property) => {
      const { budget, rating, tags } = filters;
      if (property.price > budget) return false;
      if (property.rating < rating) return false;
      if (tags.length > 0 && !tags.every(tag => property.tags.includes(tag))) {
        return false;
      }
      return true;
    });
  }, [filters]);

  const selectedProperty = useMemo(() => {
    return allProperties.find(p => p.id === selectedPropertyId) || null;
  }, [selectedPropertyId]);
  
  const handleSelectProperty = useCallback((id: string | null) => {
    setSelectedPropertyId(id);
  }, []);

  const closePropertySheet = useCallback(() => {
    setSelectedPropertyId(null);
  }, []);

  return (
    <>
      <header className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between p-4 bg-gradient-to-b from-background/80 to-transparent">
        <Logo />
        <Button variant="secondary" size="icon" onClick={() => setFilterPanelOpen(true)}>
          <Filter className="h-5 w-5" />
          <span className="sr-only">Open Filters</span>
        </Button>
      </header>

      <MapView 
        properties={filteredProperties}
        onSelectProperty={handleSelectProperty}
        selectedPropertyId={selectedPropertyId}
      />

      <FilterPanel
        open={isFilterPanelOpen}
        onOpenChange={setFilterPanelOpen}
        filters={filters}
        setFilters={setFilters}
        onApply={() => setFilterPanelOpen(false)}
      />

      <PropertySheet
        property={selectedProperty}
        open={!!selectedProperty}
        onOpenChange={(isOpen) => {
          if (!isOpen) {
            closePropertySheet();
          }
        }}
      />
    </>
  );
}
