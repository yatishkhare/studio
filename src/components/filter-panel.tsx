"use client";

import type { FC } from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import type { Filters } from '@/types';

interface FilterPanelProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  filters: Filters;
  setFilters: (filters: Filters | ((prev: Filters) => Filters)) => void;
  onApply: () => void;
}

const travelerTypes = [
  { id: 'family-friendly', label: 'Family-Friendly' },
  { id: 'solo-traveler', label: 'Solo Traveler' },
  { id: 'couples', label: 'Couples' },
  { id: 'business', label: 'Business' },
];

const FilterPanel: FC<FilterPanelProps> = ({ open, onOpenChange, filters, setFilters, onApply }) => {
  
  const handleBudgetChange = (value: number[]) => {
    setFilters(prev => ({ ...prev, budget: value[0] }));
  };

  const handleRatingChange = (value: string) => {
    setFilters(prev => ({ ...prev, rating: Number(value) }));
  };

  const handleTagChange = (tagId: string) => (checked: boolean) => {
    setFilters(prev => {
      const newTags = new Set(prev.tags);
      if (checked) {
        newTags.add(tagId);
      } else {
        newTags.delete(tagId);
      }
      return { ...prev, tags: Array.from(newTags) };
    });
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="flex flex-col">
        <SheetHeader>
          <SheetTitle>Filter Properties</SheetTitle>
          <SheetDescription>
            Adjust the filters to find the perfect stay.
          </SheetDescription>
        </SheetHeader>
        <div className="flex-1 space-y-6 overflow-y-auto py-4">
          <div className="space-y-4">
            <Label htmlFor="budget" className="text-base font-headline">Max Budget: ${filters.budget}/night</Label>
            <Slider
              id="budget"
              min={50}
              max={1000}
              step={10}
              value={[filters.budget]}
              onValueChange={handleBudgetChange}
            />
          </div>

          <div className="space-y-4">
            <Label className="text-base font-headline">Minimum Rating</Label>
            <RadioGroup value={String(filters.rating)} onValueChange={handleRatingChange} className="flex space-x-2">
              {[1, 2, 3, 4].map(rating => (
                <div key={rating} className="flex items-center space-x-2">
                  <RadioGroupItem value={String(rating)} id={`rating-${rating}`} />
                  <Label htmlFor={`rating-${rating}`} className="flex items-center">
                    {rating}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="space-y-4">
            <Label className="text-base font-headline">Traveler Type</Label>
            <div className="space-y-2">
              {travelerTypes.map(tag => (
                <div key={tag.id} className="flex items-center space-x-2">
                  <Checkbox 
                    id={tag.id}
                    checked={filters.tags.includes(tag.id)}
                    onCheckedChange={(checked) => handleTagChange(tag.id)(Boolean(checked))}
                  />
                  <Label htmlFor={tag.id}>{tag.label}</Label>
                </div>
              ))}
            </div>
          </div>
        </div>
        <SheetFooter>
          <Button onClick={onApply} className="w-full">Apply Filters</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default FilterPanel;
