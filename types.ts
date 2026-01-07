
export interface Property {
  id: string;
  city: string;
  state: string;
  neighborhood: string;
  price: number;
  sqft: number;
  yearBuilt: number;
  bedrooms: number;
  bathrooms: number;
  type: 'Single Family' | 'Condo' | 'Townhouse' | 'Multi-Family' | 'Other';
  listingDate: string;
  lat: number;
  lng: number;
  sourceUrl?: string;
}

export interface Filters {
  state: string;
  city: string;
  neighborhood: string;
  priceRange: [number, number];
  sqftRange: [number, number];
  propertyType: string;
}

export interface MarketStats {
  avgPrice: number;
  medianPrice: number;
  avgSqft: number;
  totalListings: number;
  avgPricePerSqft: number;
}
