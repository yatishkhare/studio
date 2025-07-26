"use client";

import type { FC } from 'react';
import { Map, AdvancedMarker } from "@vis.gl/react-google-maps";
import { Hotel } from 'lucide-react';
import type { Property } from '@/types';
import { cn } from '@/lib/utils';

interface MapViewProps {
  properties: Property[];
  onSelectProperty: (id: string | null) => void;
  selectedPropertyId: string | null;
}

const MapView: FC<MapViewProps> = ({ properties, onSelectProperty, selectedPropertyId }) => {
  const defaultCenter = { lat: 40.7128, lng: -74.0060 }; // Default to NYC

  return (
    <div className="h-full w-full">
      <Map
        defaultCenter={defaultCenter}
        defaultZoom={12}
        mapId="mmt-map-style"
        disableDefaultUI={true}
        gestureHandling="greedy"
        style={{ width: '100%', height: '100%' }}
        styles={[
          {
            "featureType": "all",
            "elementType": "labels.text.fill",
            "stylers": [
              { "color": "#7c93a3" },
              { "lightness": "-10" }
            ]
          },
          {
            "featureType": "administrative.country",
            "elementType": "geometry",
            "stylers": [
              { "visibility": "on" }
            ]
          },
          {
            "featureType": "administrative.country",
            "elementType": "geometry.stroke",
            "stylers": [
              { "color": "#a0a4a5" }
            ]
          },
          {
            "featureType": "administrative.province",
            "elementType": "geometry.stroke",
            "stylers": [
              { "color": "#6283a3" }
            ]
          },
          {
            "featureType": "landscape",
            "elementType": "geometry.fill",
            "stylers": [
              { "color": "#f3f4f4" }
            ]
          },
          {
            "featureType": "landscape.man_made",
            "elementType": "geometry.stroke",
            "stylers": [
              { "color": "#e9e5dc" }
            ]
          },
          {
            "featureType": "poi",
            "elementType": "all",
            "stylers": [
              { "visibility": "off" }
            ]
          },
          {
            "featureType": "road",
            "elementType": "all",
            "stylers": [
              { "color": "#ffffff" }
            ]
          },
          {
            "featureType": "road",
            "elementType": "labels",
            "stylers": [
              { "visibility": "off" }
            ]
          },
          {
            "featureType": "road.highway",
            "elementType": "geometry.fill",
            "stylers": [
              { "color": "#f7c669" },
              { "lightness": "25" }
            ]
          },
          {
            "featureType": "road.highway",
            "elementType": "geometry.stroke",
            "stylers": [
              { "color": "#f7c669" },
              { "lightness": "-10" }
            ]
          },
          {
            "featureType": "road.arterial",
            "elementType": "geometry",
            "stylers": [
              { "color": "#ffffff" }
            ]
          },
          {
            "featureType": "road.local",
            "elementType": "geometry",
            "stylers": [
              { "color": "#ffffff" }
            ]
          },
          {
            "featureType": "transit",
            "elementType": "all",
            "stylers": [
              { "visibility": "off" }
            ]
          },
          {
            "featureType": "water",
            "elementType": "all",
            "stylers": [
              { "color": "#dde1e1" }
            ]
          }
        ]}
      >
        {properties.map((property) => (
          <AdvancedMarker
            key={property.id}
            position={property.position}
            onClick={() => onSelectProperty(property.id)}
          >
            <button className="focus:outline-none">
              <div className={cn(
                "w-auto h-10 px-4 rounded-full flex items-center justify-center shadow-lg transition-all duration-200",
                selectedPropertyId === property.id
                  ? 'bg-primary text-primary-foreground scale-110'
                  : 'bg-background text-foreground hover:bg-secondary'
              )}>
                <span className="font-bold text-sm">${property.price}</span>
              </div>
            </button>
          </AdvancedMarker>
        ))}
      </Map>
    </div>
  );
};

export default MapView;
