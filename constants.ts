
import { Property } from './types';

const CITIES = ['San Francisco', 'New York', 'Austin', 'Miami', 'Seattle'];

const CITY_COORDS: Record<string, [number, number]> = {
  'San Francisco': [37.7749, -122.4194],
  'New York': [40.7128, -74.0060],
  'Austin': [30.2672, -97.7431],
  'Miami': [25.7617, -80.1918],
  'Seattle': [47.6062, -122.3321]
};

const NEIGHBORHOODS: Record<string, string[]> = {
  'San Francisco': ['Mission District', 'Pacific Heights', 'Noe Valley', 'SOMA', 'Sunset'],
  'New York': ['Manhattan', 'Brooklyn', 'Queens', 'The Bronx', 'Staten Island'],
  'Austin': ['Downtown', 'South Lamar', 'Zilker', 'East Austin', 'Mueller'],
  'Miami': ['Brickell', 'Coconut Grove', 'Wynwood', 'Coral Gables', 'South Beach'],
  'Seattle': ['Capitol Hill', 'Ballard', 'Queen Anne', 'Fremont', 'Wallingford']
};

const PROPERTY_TYPES: Property['type'][] = ['Single Family', 'Condo', 'Townhouse', 'Multi-Family'];

const generateMockData = (): Property[] => {
  const data: Property[] = [];
  const now = new Date();

  for (let i = 0; i < 500; i++) {
    const city = CITIES[Math.floor(Math.random() * CITIES.length)];
    const neighborhoods = NEIGHBORHOODS[city];
    const neighborhood = neighborhoods[Math.floor(Math.random() * neighborhoods.length)];
    const type = PROPERTY_TYPES[Math.floor(Math.random() * PROPERTY_TYPES.length)];
    
    // Coordinates
    const baseCoords = CITY_COORDS[city];
    const lat = baseCoords[0] + (Math.random() - 0.5) * 0.05;
    const lng = baseCoords[1] + (Math.random() - 0.5) * 0.05;

    // Logic for realistic pricing based on city and type
    let basePrice = 400000;
    if (city === 'San Francisco') basePrice = 900000;
    if (city === 'New York') basePrice = 800000;
    if (city === 'Austin') basePrice = 500000;

    const sqft = Math.floor(Math.random() * 3500) + 500;
    const price = basePrice + (sqft * (200 + Math.random() * 300)) + (Math.random() * 200000);
    const yearBuilt = Math.floor(Math.random() * 100) + 1920;
    
    const listingDate = new Date(now);
    listingDate.setMonth(now.getMonth() - Math.floor(Math.random() * 12));

    data.push({
      id: `prop-${i}`,
      city,
      neighborhood,
      price: Math.round(price),
      sqft,
      yearBuilt,
      bedrooms: Math.floor(Math.random() * 4) + 1,
      bathrooms: Math.floor(Math.random() * 3) + 1,
      type,
      listingDate: listingDate.toISOString().split('T')[0],
      lat,
      lng
    });
  }
  return data;
};

export const MOCK_PROPERTIES = generateMockData();
export { CITIES, NEIGHBORHOODS, PROPERTY_TYPES, CITY_COORDS };
