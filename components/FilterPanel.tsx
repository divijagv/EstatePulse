
import React from 'react';
import { US_GEOGRAPHY, NEIGHBORHOODS, PROPERTY_TYPES } from '../constants';
import { Filters } from '../types';

interface FilterPanelProps {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
}

const FilterPanel: React.FC<FilterPanelProps> = ({ filters, setFilters }) => {
  const states = Object.keys(US_GEOGRAPHY).sort();
  const cities = US_GEOGRAPHY[filters.state] || [];
  const neighborhoods = NEIGHBORHOODS[filters.city] || [];

  const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newState = e.target.value;
    const defaultCity = US_GEOGRAPHY[newState][0];
    setFilters(prev => ({
      ...prev,
      state: newState,
      city: defaultCity,
      neighborhood: 'All'
    }));
  };

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters(prev => ({
      ...prev,
      city: e.target.value,
      neighborhood: 'All'
    }));
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 space-y-6">
      <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
        </svg>
        Explorer Controls
      </h2>

      {/* State Selection */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">US State</label>
        <select 
          value={filters.state}
          onChange={handleStateChange}
          className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-sm"
        >
          {states.map(state => (
            <option key={state} value={state}>{state}</option>
          ))}
        </select>
      </div>

      {/* City Selection */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">City</label>
        <select 
          value={filters.city}
          onChange={handleCityChange}
          className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-sm"
        >
          {cities.map(city => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>
      </div>

      {/* Neighborhood Selection */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Neighborhood</label>
        <select 
          value={filters.neighborhood}
          onChange={(e) => setFilters(prev => ({ ...prev, neighborhood: e.target.value }))}
          className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-sm disabled:opacity-50"
          disabled={neighborhoods.length === 0}
        >
          <option value="All">All Neighborhoods</option>
          {neighborhoods.map(n => (
            <option key={n} value={n}>{n}</option>
          ))}
        </select>
      </div>

      {/* Price Slider */}
      <div className="space-y-4 pt-2">
        <div className="flex justify-between items-center">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Price Range</label>
          <span className="text-xs font-mono text-indigo-600">${(filters.priceRange[0]/1000).toFixed(0)}k - ${(filters.priceRange[1]/1000).toFixed(0)}k</span>
        </div>
        <input 
          type="range"
          min="100000"
          max="5000000"
          step="50000"
          value={filters.priceRange[1]}
          onChange={(e) => setFilters(prev => ({ ...prev, priceRange: [prev.priceRange[0], parseInt(e.target.value)] }))}
          className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
        />
      </div>

      {/* Sqft Slider */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Max Area</label>
          <span className="text-xs font-mono text-indigo-600">{filters.sqftRange[1].toLocaleString()} sqft</span>
        </div>
        <input 
          type="range"
          min="500"
          max="5000"
          step="100"
          value={filters.sqftRange[1]}
          onChange={(e) => setFilters(prev => ({ ...prev, sqftRange: [prev.sqftRange[0], parseInt(e.target.value)] }))}
          className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
        />
      </div>

      {/* Property Type Radio */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Property Type</label>
        <div className="grid grid-cols-2 gap-2">
          {['All', ...PROPERTY_TYPES].map(type => (
            <button
              key={type}
              onClick={() => setFilters(prev => ({ ...prev, propertyType: type }))}
              className={`text-[10px] uppercase tracking-tighter p-2 rounded-lg border transition-all ${
                filters.propertyType === type 
                ? 'bg-indigo-600 text-white border-indigo-600 font-bold' 
                : 'bg-white text-slate-600 border-slate-200 hover:border-indigo-300'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;
