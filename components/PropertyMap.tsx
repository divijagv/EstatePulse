
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from 'react-leaflet';
import { Property } from '../types';
import { CITY_COORDS } from '../constants';

interface PropertyMapProps {
  properties: Property[];
  selectedCity: string;
}

const ChangeMapView: React.FC<{ coords: [number, number] }> = ({ coords }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(coords, 12);
  }, [coords, map]);
  return null;
};

const getPriceColor = (price: number) => {
  if (price < 750000) return '#10b981'; // Emerald 500
  if (price < 1250000) return '#3b82f6'; // Blue 500
  if (price < 2000000) return '#f59e0b'; // Amber 500
  return '#ef4444'; // Red 500
};

const PropertyMap: React.FC<PropertyMapProps> = ({ properties, selectedCity }) => {
  const center = CITY_COORDS[selectedCity] || [37.7749, -122.4194];

  return (
    <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm h-[500px] overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-slate-900">Geographic Distribution</h3>
        <div className="flex gap-4 text-[10px] font-bold">
          <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#10b981]"></span> &lt;750k</div>
          <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#3b82f6]"></span> 750k-1.25M</div>
          <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#f59e0b]"></span> 1.25M-2M</div>
          <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#ef4444]"></span> 2M+</div>
        </div>
      </div>
      <div className="relative h-[410px]">
        <MapContainer 
          center={center} 
          zoom={12} 
          scrollWheelZoom={false}
          className="rounded-lg"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <ChangeMapView coords={center} />
          {properties.slice(0, 300).map((property) => (
            <CircleMarker
              key={property.id}
              center={[property.lat, property.lng]}
              radius={8}
              pathOptions={{
                fillColor: getPriceColor(property.price),
                color: '#fff',
                weight: 2,
                opacity: 1,
                fillOpacity: 0.8
              }}
            >
              <Popup className="custom-popup">
                <div className="p-3">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{property.type}</span>
                    <span className="text-xs font-bold text-indigo-600">${property.price.toLocaleString()}</span>
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm mb-1">{property.neighborhood}</h4>
                  <p className="text-xs text-slate-500 mb-2">{property.city}</p>
                  <div className="flex justify-between border-t border-slate-100 pt-2 text-[10px]">
                    <span className="flex items-center gap-1"><span className="font-bold text-slate-700">{property.bedrooms}</span> Bed</span>
                    <span className="flex items-center gap-1"><span className="font-bold text-slate-700">{property.bathrooms}</span> Bath</span>
                    <span className="flex items-center gap-1"><span className="font-bold text-slate-700">{property.sqft}</span> Sqft</span>
                  </div>
                </div>
              </Popup>
            </CircleMarker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default PropertyMap;
