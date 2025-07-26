"use client";

import { APIProvider } from "@vis.gl/react-google-maps";
import { config } from "@/lib/config";

export function MapProvider({ children }: { children: React.ReactNode }) {
  const apiKey = config.googleMapsApiKey;

  if (!apiKey) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-background text-foreground">
        <div className="text-center">
          <h2 className="text-2xl font-bold font-headline">Google Maps API Key is missing.</h2>
          <p className="mt-2 text-muted-foreground">Please add NEXT_PUBLIC_GOOGLE_MAPS_API_KEY to your .env.local file.</p>
        </div>
      </div>
    );
  }

  return <APIProvider apiKey={apiKey}>{children}</APIProvider>;
}
