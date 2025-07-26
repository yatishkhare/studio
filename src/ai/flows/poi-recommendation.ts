'use server';

/**
 * @fileOverview A Point-of-Interest (POI) recommendation AI agent.
 *
 * - recommendPOIs - A function that handles the POI recommendation process.
 * - RecommendPOIsInput - The input type for the recommendPOIs function.
 * - RecommendPOIsOutput - The return type for the recommendPOIs function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RecommendPOIsInputSchema = z.object({
  propertyDetails: z
    .string()
    .describe('Details of the selected property including name, price, and rating.'),
  userPreferences: z
    .string()
    .describe('The users stated preferences for restaurants.'),
  nearbyRestaurants: z
    .string()
    .describe('A list of nearby restaurants from Google Places.'),
});
export type RecommendPOIsInput = z.infer<typeof RecommendPOIsInputSchema>;

const RecommendPOIsOutputSchema = z.object({
  recommendations: z
    .string()
    .describe('A curated list of the top 3 nearby restaurants personalized to the user preferences.'),
});
export type RecommendPOIsOutput = z.infer<typeof RecommendPOIsOutputSchema>;

export async function recommendPOIs(input: RecommendPOIsInput): Promise<RecommendPOIsOutput> {
  return recommendPOIsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'recommendPOIsPrompt',
  input: {schema: RecommendPOIsInputSchema},
  output: {schema: RecommendPOIsOutputSchema},
  prompt: `You are an expert in recommending restaurants based on user preferences and property details.\n\nYou will receive the property details, user preferences, and a list of nearby restaurants. You will use this information to curate a list of the top 3 nearby restaurants that are most likely to appeal to the user.\n\nProperty Details: {{{propertyDetails}}}\nUser Preferences: {{{userPreferences}}}\nNearby Restaurants: {{{nearbyRestaurants}}}\n\nRecommendations:`,
});

const recommendPOIsFlow = ai.defineFlow(
  {
    name: 'recommendPOIsFlow',
    inputSchema: RecommendPOIsInputSchema,
    outputSchema: RecommendPOIsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
