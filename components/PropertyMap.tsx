
import React, { useEffect, useMemo } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from 'react-leaflet';
import { Property, Filters } from '../types';
import { CITY_COORDS } from '../constants';

interface PropertyMapProps {
  properties: Property[];
  filters: Filters;
}

const ChangeMapView: React.FC<{ coords: [number, number], zoom?: number }> = ({ coords, zoom = 12 }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(coords, zoom);
  }, [coords, zoom, map]);
  return null;
};

const getPriceColor = (price: number) => {
  if (price < 500000) return '#10b981'; 
  if (price < 1000000) return '#3b82f6';
  if (price < 2000000) return '#f59e0b';
  return '#ef4444';
};

const PropertyMap: React.FC<PropertyMapProps> = ({ properties, filters }) => {
  const { city, state } = filters;

  const center = useMemo<[number, number]>(() => {
    if (properties.length > 0) {
      const lat = properties.reduce((s, p) => s + p.lat, 0) / properties.length;
      const lng = properties.reduce((s, p) => s + p.lng, 0) / properties.length;
      return [lat, lng];
    }

    let cityKey = city;
    if (city === 'Portland' && state === 'Oregon') cityKey = 'Portland_OR';
    if (city === 'Charleston' && state === 'West Virginia') cityKey = 'Charleston_WV';

    const defaultCoords = CITY_COORDS[cityKey];
    if (defaultCoords) return defaultCoords;
    return [37.7749, -122.4194]; // US Default fallback
  }, [properties, city, state]);

  return (
    <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm h-[500px] overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-slate-900">USA Geographic Distribution</h3>
        <div className="flex gap-4 text-[9px] font-bold uppercase tracking-tight text-slate-400">
          <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#10b981]"></span> &lt;500k</div>
          <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#3b82f6]"></span> 500k-1M</div>
          <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#ef4444]"></span> 2M+</div>
        </div>
      </div>
      <div className="relative h-[410px]">
        <MapContainer center={center} zoom={11} scrollWheelZoom={false} className="rounded-lg">
          <TileLayer attribution='&copy; OpenStreetMap' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <ChangeMapView coords={center} zoom={properties.length > 0 ? 11 : 11} />
          {properties.map((property) => (
            <CircleMarker
              key={property.id}
              center={[property.lat, property.lng]}
              radius={property.price > 1500000 ? 10 : 7}
              pathOptions={{
                fillColor: getPriceColor(property.price),
                color: '#fff',
                weight: 1.5,
                opacity: 1,
                fillOpacity: 0.8
              }}
            >
              <Popup className="custom-popup">
                <div className="p-3">
                  <div className="text-[10px] font-bold text-indigo-600 mb-1">${property.price.toLocaleString()}</div>
                  <h4 className="font-bold text-slate-900 text-sm">{property.neighborhood}</h4>
                  <div className="text-[10px] text-slate-500 mt-2 flex justify-between">
                    <span>{property.sqft} sqft</span>
                    <span>{property.type}</span>
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
