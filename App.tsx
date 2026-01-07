
import React, { useState, useMemo, useEffect } from 'react';
import { XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, ScatterChart, Scatter } from 'recharts';
import { MOCK_PROPERTIES } from './constants';
import { Property, Filters, MarketStats } from './types';
import StatsCard from './components/StatsCard';
import FilterPanel from './components/FilterPanel';
import PropertyMap from './components/PropertyMap';
import { searchLiveMarketData } from './services/geminiService';

const App: React.FC = () => {
  const [filters, setFilters] = useState<Filters>({
    state: 'California',
    city: 'San Francisco',
    neighborhood: 'All',
    priceRange: [100000, 5000000],
    sqftRange: [0, 5000],
    propertyType: 'All'
  });

  const [properties, setProperties] = useState<Property[]>([]);
  const [aiInsight, setAiInsight] = useState<string | null>(null);
  const [sources, setSources] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);

  // Initialize with mock data for the default selection
  useEffect(() => {
    const initial = MOCK_PROPERTIES.filter(p => p.city === filters.city);
    setProperties(initial);
  }, []);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        (err) => console.log("Location access denied")
      );
    }
  }, []);

  const handleLiveSearch = async () => {
    setIsLoading(true);
    setAiInsight("Analyzing market data via Google Maps grounding...");
    try {
      const result = await searchLiveMarketData(
        filters.state,
        filters.city, 
        filters.neighborhood === 'All' ? '' : filters.neighborhood,
        userLocation?.lat,
        userLocation?.lng
      );
      
      if (result.properties.length > 0) {
        setProperties(result.properties);
        setAiInsight(result.insights);
      } else {
        setAiInsight("Model grounding complete, but no structured property rows were extracted. See citations for source links.");
      }
      setSources(result.sources);
    } catch (err) {
      console.error(err);
      setAiInsight("The market search failed. Please refine your selection or try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const filteredProperties = useMemo(() => {
    return properties.filter(p => {
      const priceMatch = p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1];
      const sqftMatch = p.sqft >= filters.sqftRange[0] && p.sqft <= filters.sqftRange[1];
      const typeMatch = filters.propertyType === 'All' || p.type === filters.propertyType;
      // Also filter by current city if we have properties from multiple cities (in mock mode)
      const cityMatch = p.city === filters.city;
      return priceMatch && sqftMatch && typeMatch && cityMatch;
    });
  }, [properties, filters]);

  const stats = useMemo<MarketStats>(() => {
    if (filteredProperties.length === 0) return { avgPrice: 0, medianPrice: 0, avgSqft: 0, totalListings: 0, avgPricePerSqft: 0 };
    const totalListings = filteredProperties.length;
    const totalPrice = filteredProperties.reduce((sum, p) => sum + p.price, 0);
    const totalSqft = filteredProperties.reduce((sum, p) => sum + p.sqft, 0);
    const sortedPrices = [...filteredProperties].map(p => p.price).sort((a, b) => a - b);
    return {
      avgPrice: Math.round(totalPrice / totalListings),
      medianPrice: sortedPrices[Math.floor(totalListings / 2)],
      avgSqft: Math.round(totalSqft / totalListings),
      totalListings,
      avgPricePerSqft: totalPrice / totalSqft
    };
  }, [filteredProperties]);

  const yearBuiltData = useMemo(() => {
    const buckets: Record<string, number> = { 'Pre-1950': 0, '1950-1980': 0, '1980-2000': 0, '2000-2015': 0, '2015+': 0 };
    filteredProperties.forEach(p => {
      if (p.yearBuilt < 1950) buckets['Pre-1950']++;
      else if (p.yearBuilt < 1980) buckets['1950-1980']++;
      else if (p.yearBuilt < 2000) buckets['1980-2000']++;
      else if (p.yearBuilt < 2015) buckets['2000-2015']++;
      else buckets['2015+']++;
    });
    return Object.entries(buckets).map(([name, count]) => ({ name, count }));
  }, [filteredProperties]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-[1001] px-6 py-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-indigo-200">E</div>
          <div>
            <h1 className="text-xl font-bold text-slate-900">EstatePulse Live</h1>
            <p className="text-[10px] text-emerald-600 uppercase font-bold tracking-widest flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
              Grounding Enabled: {filters.city}, {filters.state}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
           <button 
            onClick={handleLiveSearch}
            disabled={isLoading}
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-all font-bold flex items-center gap-2 shadow-md shadow-indigo-100 disabled:opacity-50"
          >
            {isLoading ? (
              <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
            ) : null}
            {isLoading ? "Fetching USA Data..." : "Sync Live Market"}
          </button>
        </div>
      </header>

      <main className="flex-1 flex flex-col lg:flex-row p-4 lg:p-8 gap-6 max-w-[1800px] mx-auto w-full">
        <aside className="w-full lg:w-80 flex-shrink-0">
          <FilterPanel filters={filters} setFilters={setFilters} />
          
          <div className="mt-6 p-4 bg-white rounded-xl border border-slate-100">
            <h4 className="text-xs font-bold text-slate-400 uppercase mb-3">Grounding Data</h4>
            <div className="space-y-2">
              {sources.length > 0 ? sources.map((s, i) => {
                const url = s.maps?.uri || s.web?.uri || s.maps?.placeAnswerSources?.[0]?.uri;
                const title = s.maps?.title || s.web?.title || 'Market Source';
                if (!url) return null;
                return (
                  <a key={i} href={url} target="_blank" rel="noopener noreferrer" className="block text-xs text-indigo-600 hover:underline truncate">
                    🔗 {title}
                  </a>
                );
              }) : (
                <p className="text-xs text-slate-400 italic">No live sources synced for {filters.city}.</p>
              )}
            </div>
          </div>
        </aside>

        <div className="flex-1 space-y-6">
          {aiInsight && (
            <div className={`p-6 rounded-xl shadow-xl relative overflow-hidden transition-all duration-500 ${isLoading ? 'bg-slate-800' : 'bg-indigo-900'} text-white`}>
               <div className="relative z-10">
                 <h4 className="font-bold flex items-center gap-2 mb-2 text-indigo-300">
                   <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"/></svg>
                   Market Intelligence ({filters.city})
                 </h4>
                 <div className="text-sm leading-relaxed opacity-90 whitespace-pre-wrap">{aiInsight}</div>
               </div>
               <div className={`absolute -right-10 -bottom-10 w-40 h-40 rounded-full blur-3xl opacity-20 transition-colors ${isLoading ? 'bg-slate-400' : 'bg-indigo-500'}`}></div>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            <StatsCard label="Market Average" value={`$${stats.avgPrice.toLocaleString()}`} icon={<span className="text-xl">💰</span>} />
            <StatsCard label="Inventory Size" value={stats.totalListings} icon={<span className="text-xl">📊</span>} />
            <StatsCard label="Avg Price/Sqft" value={`$${stats.avgPricePerSqft.toFixed(2)}`} icon={<span className="text-xl">📐</span>} />
            <StatsCard label="Median Value" value={`$${stats.medianPrice.toLocaleString()}`} icon={<span className="text-xl">🎯</span>} />
          </div>

          <PropertyMap properties={filteredProperties} filters={filters} />

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl border border-slate-100 h-[350px]">
              <h3 className="font-bold text-slate-900 mb-4">Construction Era Profile</h3>
              <ResponsiveContainer width="100%" height="90%">
                <BarChart data={yearBuiltData}>
                  <XAxis dataKey="name" tick={{fontSize: 10}} />
                  <YAxis tick={{fontSize: 10}} />
                  <Tooltip cursor={{fill: 'transparent'}} />
                  <Bar dataKey="count" fill="#6366f1" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            <div className="bg-white p-6 rounded-xl border border-slate-100 h-[350px]">
              <h3 className="font-bold text-slate-900 mb-4">Space vs Investment</h3>
              <ResponsiveContainer width="100%" height="90%">
                <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                  <XAxis type="number" dataKey="sqft" name="Sqft" unit="sqft" tick={{fontSize: 10}} />
                  <YAxis type="number" dataKey="price" name="Price" unit="$" tick={{fontSize: 10}} tickFormatter={v => `$${v/1000}k`} />
                  <Tooltip />
                  <Scatter name="Market Listings" data={filteredProperties} fill="#8b5cf6" fillOpacity={0.6} />
                </ScatterChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
