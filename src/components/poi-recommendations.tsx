"use client";

import { useState, useTransition, type FC } from 'react';
import { UtensilsCrossed, Lightbulb } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { recommendPOIs } from '@/ai/flows/poi-recommendation';
import type { Property } from '@/types';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';

interface PoiRecommendationsProps {
  property: Property;
}

const PoiRecommendations: FC<PoiRecommendationsProps> = ({ property }) => {
  const [isPending, startTransition] = useTransition();
  const [preferences, setPreferences] = useState('');
  const [recommendations, setRecommendations] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSubmit = async () => {
    if (!preferences) {
      toast({
        variant: "destructive",
        title: "Preferences needed",
        description: "Please enter your dining preferences.",
      });
      return;
    }
    
    startTransition(async () => {
      const propertyDetails = `Name: ${property.name}, Price range: $${property.price}/night, Rating: ${property.rating}/5`;
      const nearbyRestaurants = JSON.stringify(property.nearbyRestaurants);

      try {
        const result = await recommendPOIs({
          propertyDetails,
          userPreferences: preferences,
          nearbyRestaurants,
        });
        setRecommendations(result.recommendations);
      } catch (error) {
        console.error("Failed to get recommendations:", error);
        toast({
          variant: "destructive",
          title: "AI Error",
          description: "Could not fetch restaurant recommendations.",
        });
      }
    });
  };

  return (
    <div className="space-y-4">
      <h3 className="font-headline font-semibold text-lg flex items-center gap-2">
        <UtensilsCrossed className="w-5 h-5 text-primary" />
        Nearby Restaurant Recommendations
      </h3>
      <div className="space-y-2">
        <Textarea
          placeholder="e.g., 'I'm looking for a quiet place with vegetarian options' or 'a lively spot for cocktails and seafood'"
          value={preferences}
          onChange={(e) => setPreferences(e.target.value)}
          rows={3}
        />
        <Button onClick={handleSubmit} disabled={isPending} className="w-full">
          {isPending ? 'Getting Recommendations...' : 'Get AI Recommendations'}
        </Button>
      </div>

      {isPending && (
        <Card>
          <CardHeader>
            <CardTitle>
              <Skeleton className="h-6 w-3/4" />
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-full" />
          </CardContent>
        </Card>
      )}

      {recommendations && !isPending && (
        <Alert>
          <Lightbulb className="h-4 w-4" />
          <AlertTitle className="font-headline">Personalized Suggestions</AlertTitle>
          <AlertDescription className="whitespace-pre-wrap font-body">
            {recommendations}
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default PoiRecommendations;
