
export interface Property {
  id: string;
  city: string;
  neighborhood: string;
  price: number;
  sqft: number;
  yearBuilt: number;
  bedrooms: number;
  bathrooms: number;
  type: 'Single Family' | 'Condo' | 'Townhouse' | 'Multi-Family';
  listingDate: string;
  lat: number;
  lng: number;
}

export interface Filters {
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
