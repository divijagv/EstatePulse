
import React, { useState, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, ScatterChart, Scatter, Cell, PieChart, Pie, Legend } from 'recharts';
import { MOCK_PROPERTIES, CITIES } from './constants';
import { Property, Filters, MarketStats } from './types';
import StatsCard from './components/StatsCard';
import FilterPanel from './components/FilterPanel';
import PropertyMap from './components/PropertyMap';
import { getMarketInsights } from './services/geminiService';

const App: React.FC = () => {
  const [filters, setFilters] = useState<Filters>({
    city: 'San Francisco',
    neighborhood: 'All',
    priceRange: [100000, 5000000],
    sqftRange: [0, 5000],
    propertyType: 'All'
  });

  const [aiInsight, setAiInsight] = useState<string | null>(null);
  const [isGeneratingInsight, setIsGeneratingInsight] = useState(false);

  // Filtering Logic
  const filteredProperties = useMemo(() => {
    return MOCK_PROPERTIES.filter(p => {
      const cityMatch = p.city === filters.city;
      const neighborhoodMatch = filters.neighborhood === 'All' || p.neighborhood === filters.neighborhood;
      const priceMatch = p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1];
      const sqftMatch = p.sqft >= filters.sqftRange[0] && p.sqft <= filters.sqftRange[1];
      const typeMatch = filters.propertyType === 'All' || p.type === filters.propertyType;
      return cityMatch && neighborhoodMatch && priceMatch && sqftMatch && typeMatch;
    });
  }, [filters]);

  // Dashboard Statistics
  const stats = useMemo<MarketStats>(() => {
    if (filteredProperties.length === 0) return { avgPrice: 0, medianPrice: 0, avgSqft: 0, totalListings: 0, avgPricePerSqft: 0 };
    
    const totalListings = filteredProperties.length;
    const totalPrice = filteredProperties.reduce((sum, p) => sum + p.price, 0);
    const totalSqft = filteredProperties.reduce((sum, p) => sum + p.sqft, 0);
    const sortedPrices = [...filteredProperties].map(p => p.price).sort((a, b) => a - b);
    const medianPrice = sortedPrices[Math.floor(totalListings / 2)];
    
    return {
      avgPrice: Math.round(totalPrice / totalListings),
      medianPrice,
      avgSqft: Math.round(totalSqft / totalListings),
      totalListings,
      avgPricePerSqft: totalPrice / totalSqft
    };
  }, [filteredProperties]);

  // Chart Data Preparation
  const priceTrendData = useMemo(() => {
    const months: Record<string, { total: number, count: number }> = {};
    filteredProperties.forEach(p => {
      const monthYear = p.listingDate.substring(0, 7);
      if (!months[monthYear]) months[monthYear] = { total: 0, count: 0 };
      months[monthYear].total += p.price;
      months[monthYear].count += 1;
    });
    return Object.entries(months)
      .map(([name, { total, count }]) => ({ name, avg: Math.round(total / count) }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [filteredProperties]);

  const yearBuiltData = useMemo(() => {
    const buckets: Record<string, number> = {
      'Pre-1950': 0,
      '1950-1970': 0,
      '1970-1990': 0,
      '1990-2010': 0,
      '2010+': 0
    };
    filteredProperties.forEach(p => {
      if (p.yearBuilt < 1950) buckets['Pre-1950']++;
      else if (p.yearBuilt < 1970) buckets['1950-1970']++;
      else if (p.yearBuilt < 1990) buckets['1970-1990']++;
      else if (p.yearBuilt < 2010) buckets['1990-2010']++;
      else buckets['2010+']++;
    });
    return Object.entries(buckets).map(([name, count]) => ({ name, count }));
  }, [filteredProperties]);

  const propertyTypePieData = useMemo(() => {
    const counts: Record<string, number> = {};
    filteredProperties.forEach(p => counts[p.type] = (counts[p.type] || 0) + 1);
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [filteredProperties]);

  const COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#f43f5e', '#f97316'];

  const generateAIInsight = async () => {
    setIsGeneratingInsight(true);
    const insight = await getMarketInsights(filteredProperties, stats, filters.city, filters.neighborhood);
    setAiInsight(insight);
    setIsGeneratingInsight(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 px-6 py-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-indigo-200">
            E
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">EstatePulse</h1>
            <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Real Estate Intelligence</p>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          <a href="#" className="text-indigo-600 hover:text-indigo-700 border-b-2 border-indigo-600 pb-1">Explorer</a>
          <a href="#" className="hover:text-indigo-600 transition-colors">Compare Markets</a>
          <a href="#" className="hover:text-indigo-600 transition-colors">Portfolio</a>
          <button className="bg-slate-900 text-white px-5 py-2 rounded-lg hover:bg-slate-800 transition-all font-semibold">
            Export Data
          </button>
        </div>
      </header>

      <main className="flex-1 flex flex-col md:flex-row p-4 md:p-8 gap-6 max-w-[1600px] mx-auto w-full">
        {/* Sidebar Filters */}
        <aside className="w-full md:w-80 flex-shrink-0">
          <FilterPanel filters={filters} setFilters={setFilters} />
          
          <div className="mt-6 bg-indigo-900 text-white p-6 rounded-xl shadow-lg overflow-hidden relative">
            <div className="relative z-10">
              <h3 className="text-lg font-bold mb-2">Need a custom report?</h3>
              <p className="text-indigo-200 text-sm mb-4">Leverage Gemini AI to generate a detailed market sentiment analysis based on current filters.</p>
              <button 
                onClick={generateAIInsight}
                disabled={isGeneratingInsight}
                className="w-full bg-white text-indigo-900 font-bold py-2.5 rounded-lg hover:bg-indigo-50 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isGeneratingInsight ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4 text-indigo-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Analyzing...
                  </span>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                    </svg>
                    Generate AI Insight
                  </>
                )}
              </button>
            </div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-indigo-500 rounded-full blur-2xl opacity-20"></div>
          </div>
        </aside>

        {/* Dashboard Content */}
        <div className="flex-1 space-y-6">
          {/* AI Insight Box */}
          {aiInsight && (
            <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-xl animate-in fade-in slide-in-from-top-4 duration-500">
              <div className="flex items-center gap-2 mb-3 text-emerald-800">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <h4 className="font-bold">Market Intelligence Report</h4>
              </div>
              <div className="text-emerald-900 whitespace-pre-line text-sm leading-relaxed prose prose-sm max-w-none">
                {aiInsight}
              </div>
            </div>
          )}

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatsCard 
              label="Avg. Listing Price" 
              value={`$${stats.avgPrice.toLocaleString()}`} 
              icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
              trend={{ value: 4.2, isPositive: true }}
            />
            <StatsCard 
              label="Median Price" 
              value={`$${stats.medianPrice.toLocaleString()}`} 
              icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>}
            />
            <StatsCard 
              label="Avg Price/Sqft" 
              value={`$${stats.avgPricePerSqft.toFixed(2)}`} 
              icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" /></svg>}
              trend={{ value: 1.8, isPositive: false }}
            />
            <StatsCard 
              label="Total Listings" 
              value={stats.totalListings} 
              icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>}
            />
          </div>

          {/* Interactive Map */}
          <PropertyMap properties={filteredProperties} selectedCity={filters.city} />

          {/* Charts Area */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Price Trend Line Chart */}
            <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm h-[400px]">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-slate-900">Historical Price Trends</h3>
                <span className="text-xs bg-indigo-50 text-indigo-700 px-2 py-1 rounded font-semibold">Monthly Avg</span>
              </div>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={priceTrendData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748b' }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748b' }} tickFormatter={(val) => `$${(val/1000)}k`} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #f1f5f9', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                      formatter={(val: number) => [`$${val.toLocaleString()}`, 'Average Price']}
                    />
                    <Line type="monotone" dataKey="avg" stroke="#6366f1" strokeWidth={3} dot={{ fill: '#6366f1', strokeWidth: 2, r: 4 }} activeDot={{ r: 6, strokeWidth: 0 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Price vs Sqft Scatter Chart */}
            <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm h-[400px]">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-slate-900">Price vs. Square Footage</h3>
                <span className="text-xs bg-amber-50 text-amber-700 px-2 py-1 rounded font-semibold">Market Density</span>
              </div>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis type="number" dataKey="sqft" name="Sqft" unit=" sqft" axisLine={false} tickLine={false} tick={{ fontSize: 10 }} />
                    <YAxis type="number" dataKey="price" name="Price" unit="$" axisLine={false} tickLine={false} tick={{ fontSize: 10 }} tickFormatter={(val) => `$${(val/1000)}k`} />
                    <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                    <Scatter name="Properties" data={filteredProperties} fill="#8b5cf6" fillOpacity={0.6} />
                  </ScatterChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Year Built Bar Chart */}
            <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm h-[400px]">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-slate-900">Inventory by Era</h3>
                <span className="text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded font-semibold">Construction Year</span>
              </div>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={yearBuiltData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748b' }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748b' }} />
                    <Tooltip contentStyle={{ borderRadius: '8px' }} cursor={{ fill: '#f8fafc' }} />
                    <Bar dataKey="count" fill="#6366f1" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Property Type Pie Chart */}
            <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm h-[400px]">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-slate-900">Property Type Breakdown</h3>
                <span className="text-xs bg-rose-50 text-rose-700 px-2 py-1 rounded font-semibold">Mix</span>
              </div>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={propertyTypePieData}
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {propertyTypePieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend verticalAlign="bottom" height={36}/>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Data Table Preview */}
          <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-bold text-slate-900">Property List Preview</h3>
              <p className="text-xs text-slate-500">Showing top 5 of {filteredProperties.length} listings</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-slate-600 font-semibold uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="px-6 py-3">Property ID</th>
                    <th className="px-6 py-3">Type</th>
                    <th className="px-6 py-3">Neighborhood</th>
                    <th className="px-6 py-3 text-right">Sqft</th>
                    <th className="px-6 py-3 text-right">Price</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {filteredProperties.slice(0, 5).map(p => (
                    <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 font-mono text-xs">{p.id}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          p.type === 'Condo' ? 'bg-indigo-50 text-indigo-600' :
                          p.type === 'Single Family' ? 'bg-emerald-50 text-emerald-600' :
                          'bg-amber-50 text-amber-600'
                        }`}>
                          {p.type}
                        </span>
                      </td>
                      <td className="px-6 py-4">{p.neighborhood}</td>
                      <td className="px-6 py-4 text-right font-medium">{p.sqft.toLocaleString()}</td>
                      <td className="px-6 py-4 text-right font-bold text-slate-900">${p.price.toLocaleString()}</td>
                    </tr>
                  ))}
                  {filteredProperties.length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-6 py-8 text-center text-slate-400 italic">
                        No properties match your current filters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-slate-50 border-t border-slate-200 p-8 text-center">
        <p className="text-slate-500 text-sm">© 2024 EstatePulse Analytics. Data simulated for demonstration purposes.</p>
        <div className="mt-4 flex justify-center gap-6">
          <a href="#" className="text-slate-400 hover:text-indigo-600 text-xs">Privacy Policy</a>
          <a href="#" className="text-slate-400 hover:text-indigo-600 text-xs">Terms of Service</a>
          <a href="#" className="text-slate-400 hover:text-indigo-600 text-xs">API Documentation</a>
        </div>
      </footer>
    </div>
  );
};

export default App;
