
import { Property } from './types';

export const US_GEOGRAPHY: Record<string, string[]> = {
  'Alabama': ['Birmingham', 'Montgomery', 'Mobile', 'Huntsville', 'Tuscaloosa', 'Hoover', 'Auburn', 'Dothan', 'Madison', 'Decatur'],
  'Alaska': ['Anchorage', 'Fairbanks', 'Juneau', 'Wasilla', 'Sitka', 'Ketchikan', 'Kenai', 'Kodiak'],
  'Arizona': ['Phoenix', 'Scottsdale', 'Tucson', 'Mesa', 'Chandler', 'Gilbert', 'Glendale', 'Tempe', 'Peoria', 'Surprise', 'Yuma', 'Flagstaff'],
  'Arkansas': ['Little Rock', 'Fort Smith', 'Fayetteville', 'Springdale', 'Jonesboro', 'Rogers', 'Conway', 'Bentonville', 'Pine Bluff'],
  'California': ['San Francisco', 'Los Angeles', 'San Diego', 'San Jose', 'Sacramento', 'Fresno', 'Oakland', 'Bakersfield', 'Anaheim', 'Santa Ana', 'Riverside', 'Stockton', 'Irvine', 'Fremont', 'San Bernardino', 'Modesto', 'Fontana', 'Oxnard', 'Huntington Beach', 'Glendale', 'Santa Clarita', 'Garden Grove', 'Oceanside', 'Santa Rosa', 'Rancho Cucamonga', 'Ontario', 'Lancaster', 'Elk Grove', 'Palmdale', 'Coronado'],
  'Colorado': ['Denver', 'Boulder', 'Colorado Springs', 'Aurora', 'Fort Collins', 'Lakewood', 'Thornton', 'Arvada', 'Westminster', 'Pueblo', 'Centennial', 'Greeley'],
  'Connecticut': ['Bridgeport', 'New Haven', 'Hartford', 'Stamford', 'Waterbury', 'Norwalk', 'Danbury', 'New Britain', 'Greenwich'],
  'Delaware': ['Wilmington', 'Dover', 'Newark', 'Middletown', 'Smyrna', 'Milford', 'Seaford'],
  'Florida': ['Miami', 'Orlando', 'Tampa', 'Jacksonville', 'Tallahassee', 'St. Petersburg', 'Hialeah', 'Port St. Lucie', 'Cape Coral', 'Fort Lauderdale', 'Pembroke Pines', 'Hollywood', 'Miramar', 'Gainesville', 'Coral Springs', 'Clearwater', 'Brandon', 'Palm Bay', 'Pompano Beach', 'West Palm Beach'],
  'Georgia': ['Atlanta', 'Savannah', 'Augusta', 'Columbus', 'Macon', 'Athens', 'Sandy Springs', 'Roswell', 'Johns Creek', 'Warner Robins', 'Alpharetta', 'Marietta'],
  'Hawaii': ['Honolulu', 'Hilo', 'Kailua', 'Kapolei', 'Kaneohe', 'Waipahu', 'Pearl City'],
  'Idaho': ['Boise', 'Nampa', 'Meridian', 'Idaho Falls', 'Pocatello', 'Caldwell', 'Coeur d\'Alene', 'Twin Falls'],
  'Illinois': ['Chicago', 'Naperville', 'Aurora', 'Springfield', 'Rockford', 'Joliet', 'Peoria', 'Elgin', 'Waukegan', 'Champaign', 'Bloomington', 'Decatur'],
  'Indiana': ['Indianapolis', 'Fort Wayne', 'Evansville', 'South Bend', 'Carmel', 'Fishers', 'Bloomington', 'Hammond', 'Lafayette', 'Gary', 'Muncie'],
  'Iowa': ['Des Moines', 'Cedar Rapids', 'Davenport', 'Sioux City', 'Iowa City', 'Waterloo', 'Ames', 'Council Bluffs', 'Dubuque'],
  'Kansas': ['Wichita', 'Overland Park', 'Kansas City', 'Topeka', 'Olathe', 'Lawrence', 'Shawnee', 'Manhattan', 'Lenexa', 'Salina'],
  'Kentucky': ['Louisville', 'Lexington', 'Bowling Green', 'Owensboro', 'Covington', 'Hopkinsville', 'Richmond', 'Florence', 'Georgetown'],
  'Louisiana': ['New Orleans', 'Baton Rouge', 'Shreveport', 'Metairie', 'Lafayette', 'Lake Charles', 'Kenner', 'Bossier City', 'Monroe'],
  'Maine': ['Portland', 'Lewiston', 'Bangor', 'South Portland', 'Auburn', 'Biddeford', 'Augusta', 'Saco'],
  // Fixed syntax error here: removed extra 'Maryland:'
  'Maryland': ['Baltimore', 'Frederick', 'Gaithersburg', 'Rockville', 'Bowie', 'Hagerstown', 'Annapolis', 'Salisbury', 'College Park', 'Greenbelt'],
  'Massachusetts': ['Boston', 'Cambridge', 'Worcester', 'Springfield', 'Lowell', 'Brockton', 'Quincy', 'Lynn', 'New Bedford', 'Fall River', 'Newton', 'Somerville'],
  'Michigan': ['Detroit', 'Grand Rapids', 'Warren', 'Lansing', 'Sterling Heights', 'Ann Arbor', 'Flint', 'Dearborn', 'Livonia', 'Clinton', 'Canton', 'Troy'],
  'Minnesota': ['Minneapolis', 'Saint Paul', 'Rochester', 'Duluth', 'Bloomington', 'Brooklyn Park', 'Plymouth', 'Woodbury', 'Eagan', 'Maple Grove', 'St. Cloud'],
  'Mississippi': ['Jackson', 'Gulfport', 'Southaven', 'Biloxi', 'Hattiesburg', 'Olive Branch', 'Tupelo', 'Meridian', 'Clinton'],
  'Missouri': ['Kansas City', 'Saint Louis', 'Springfield', 'Columbia', 'Independence', 'Lee\'s Summit', 'O\'Fallon', 'St. Joseph', 'St. Charles', 'Blue Springs'],
  'Montana': ['Billings', 'Missoula', 'Great Falls', 'Bozeman', 'Butte', 'Helena', 'Kalispell', 'Havre'],
  'Nebraska': ['Omaha', 'Lincoln', 'Bellevue', 'Grand Island', 'Kearney', 'Fremont', 'Hastings', 'Norfolk'],
  'Nevada': ['Las Vegas', 'Henderson', 'Reno', 'North Las Vegas', 'Sparks', 'Carson City', 'Fernley', 'Elko'],
  'New Hampshire': ['Manchester', 'Nashua', 'Concord', 'Derry', 'Dover', 'Rochester', 'Salem', 'Merrimack', 'Hudson'],
  'New Jersey': ['Newark', 'Jersey City', 'Paterson', 'Trenton', 'Elizabeth', 'Clifton', 'Camden', 'Passaic', 'Union City', 'Bayonne', 'East Orange', 'Vineland'],
  'New Mexico': ['Albuquerque', 'Las Cruces', 'Rio Rancho', 'Santa Fe', 'Roswell', 'Farmington', 'South Valley', 'Clovis', 'Hobbs'],
  'New York': ['New York City', 'Buffalo', 'Rochester', 'Albany', 'Yonkers', 'Syracuse', 'New Rochelle', 'Mount Vernon', 'Schenectady', 'Utica', 'White Plains', 'Troy', 'Niagara Falls'],
  'North Carolina': ['Charlotte', 'Raleigh', 'Greensboro', 'Durham', 'Winston-Salem', 'Fayetteville', 'Cary', 'Wilmington', 'High Point', 'Concord', 'Asheville', 'Gastonia', 'Jacksonville'],
  'North Dakota': ['Fargo', 'Bismarck', 'Grand Forks', 'Minot', 'West Fargo', 'Williston', 'Dickinson'],
  'Ohio': ['Columbus', 'Cleveland', 'Cincinnati', 'Toledo', 'Akron', 'Dayton', 'Parma', 'Canton', 'Youngstown', 'Lorain', 'Hamilton', 'Springfield', 'Kettering'],
  'Oklahoma': ['Oklahoma City', 'Tulsa', 'Norman', 'Broken Arrow', 'Lawton', 'Edmond', 'Moore', 'Midwest City', 'Enid', 'Stillwater'],
  'Oregon': ['Portland', 'Salem', 'Eugene', 'Gresham', 'Hillsboro', 'Beaverton', 'Bend', 'Medford', 'Springfield', 'Corvallis', 'Albany', 'Tigard'],
  'Pennsylvania': ['Philadelphia', 'Pittsburgh', 'Allentown', 'Erie', 'Reading', 'Scranton', 'Bethlehem', 'Lancaster', 'Harrisburg', 'York', 'Altoona'],
  'Rhode Island': ['Providence', 'Warwick', 'Cranston', 'Pawtucket', 'East Providence', 'Woonsocket', 'Newport', 'Central Falls'],
  'South Carolina': ['Charleston', 'Columbia', 'North Charleston', 'Mount Pleasant', 'Rock Hill', 'Greenville', 'Summerville', 'Goose Creek', 'Hilton Head Island', 'Sumter', 'Florence'],
  'South Dakota': ['Sioux Falls', 'Rapid City', 'Aberdeen', 'Brookings', 'Watertown', 'Mitchell', 'Yankton', 'Pierre'],
  'Tennessee': ['Nashville', 'Memphis', 'Knoxville', 'Chattanooga', 'Clarksville', 'Murfreesboro', 'Franklin', 'Jackson', 'Johnson City', 'Hendersonville', 'Bartlett'],
  'Texas': ['Austin', 'Houston', 'Dallas', 'San Antonio', 'Fort Worth', 'El Paso', 'Arlington', 'Corpus Christi', 'Plano', 'Laredo', 'Lubbock', 'Garland', 'Irving', 'Amarillo', 'Grand Prairie', 'Brownsville', 'Pasadena', 'McKinney', 'Mesquite', 'Killeen', 'Frisco', 'McAllen', 'Waco', 'Carrollton', 'Denton', 'Midland', 'Abilene', 'Beaumont', 'Round Rock', 'Odessa', 'Tyler'],
  'Utah': ['Salt Lake City', 'West Valley City', 'Provo', 'West Jordan', 'Orem', 'Sandy', 'Ogden', 'St. George', 'Layton', 'South Jordan', 'Taylorsville', 'Lehi', 'Logan'],
  'Vermont': ['Burlington', 'South Burlington', 'Rutland', 'Barre', 'Montpelier', 'Winooski', 'St. Albans', 'Newport'],
  'Virginia': ['Virginia Beach', 'Norfolk', 'Chesapeake', 'Richmond', 'Newport News', 'Alexandria', 'Hampton', 'Roanoke', 'Portsmouth', 'Suffolk', 'Lynchburg', 'Harrisonburg'],
  'Washington': ['Seattle', 'Bellevue', 'Tacoma', 'Spokane', 'Olympia', 'Vancouver', 'Kent', 'Everett', 'Renton', 'Federal Way', 'Yakima', 'Spokane Valley', 'Kirkland', 'Bellingham', 'Kennewick', 'Auburn', 'Pasco', 'Redmond', 'Marysville'],
  'West Virginia': ['Charleston', 'Huntington', 'Morgantown', 'Parkersburg', 'Wheeling', 'Fairmont', 'West Virginia', 'Weirton', 'Martinsburg', 'Beckley'],
  'Wisconsin': ['Milwaukee', 'Madison', 'Green Bay', 'Kenosha', 'Racine', 'Appleton', 'Waukesha', 'Eau Claire', 'Oshkosh', 'Janesville', 'West Allis', 'La Crosse'],
  'Wyoming': ['Cheyenne', 'Casper', 'Laramie', 'Gillette', 'Rock Springs', 'Sheridan', 'Green River', 'Evanston']
};

export const CITY_COORDS: Record<string, [number, number]> = {
  // Coordinates for major cities to center the map
  'Birmingham': [33.5186, -86.8104],
  'Anchorage': [61.2181, -149.9003],
  'Phoenix': [33.4484, -112.0740],
  'Little Rock': [34.7465, -92.2896],
  'San Francisco': [37.7749, -122.4194],
  'Los Angeles': [34.0522, -118.2437],
  'San Diego': [32.7157, -117.1611],
  'Denver': [39.7392, -104.9903],
  'Bridgeport': [41.1792, -73.1894],
  'Wilmington': [39.7447, -75.5484],
  'Miami': [25.7617, -80.1918],
  'Orlando': [28.5383, -81.3792],
  'Atlanta': [33.7490, -84.3880],
  'Honolulu': [21.3069, -157.8583],
  'Boise': [43.6150, -116.2023],
  'Chicago': [41.8781, -87.6298],
  'Indianapolis': [39.7684, -86.1581],
  'Des Moines': [41.5868, -93.6250],
  'Wichita': [37.6872, -97.3301],
  'Louisville': [38.2527, -85.7585],
  'New Orleans': [29.9511, -90.0715],
  'Portland': [43.6591, -70.2568], // Maine
  'Baltimore': [39.2904, -76.6122],
  'Boston': [42.3601, -71.0589],
  'Detroit': [42.3314, -83.0458],
  'Minneapolis': [44.9778, -93.2650],
  'Jackson': [32.2988, -90.1848],
  'Kansas City': [39.0997, -94.5786], // Missouri
  'Billings': [45.7833, -108.5007],
  'Omaha': [41.2565, -95.9345],
  'Las Vegas': [36.1716, -115.1391],
  'Manchester': [42.9956, -71.4548],
  'Newark': [40.7357, -74.1724],
  'Albuquerque': [35.0844, -106.6504],
  'New York City': [40.7128, -74.0060],
  'Charlotte': [35.2271, -80.8431],
  'Fargo': [46.8772, -96.7898],
  'Columbus': [39.9612, -82.9988],
  'Oklahoma City': [35.4676, -97.5164],
  'Portland_OR': [45.5152, -122.6784],
  'Philadelphia': [39.9526, -75.1652],
  'Providence': [41.8240, -71.4128],
  'Charleston': [32.7765, -79.9311],
  'Sioux Falls': [43.5460, -96.7313],
  'Nashville': [36.1627, -86.7816],
  'Austin': [30.2672, -97.7431],
  'Houston': [29.7604, -95.3698],
  'Salt Lake City': [40.7608, -111.8910],
  'Burlington': [44.4759, -73.2121],
  'Virginia Beach': [36.8529, -75.9780],
  'Seattle': [47.6062, -122.3321],
  'Charleston_WV': [38.3498, -81.6326],
  'Milwaukee': [43.0389, -87.9065],
  'Cheyenne': [41.1400, -104.8202]
};

export const NEIGHBORHOODS: Record<string, string[]> = {
  'San Francisco': ['Mission District', 'Pacific Heights', 'Noe Valley', 'SOMA', 'Sunset'],
  'New York City': ['Manhattan', 'Brooklyn', 'Queens', 'The Bronx', 'Staten Island'],
  'Austin': ['Downtown', 'South Lamar', 'Zilker', 'East Austin', 'Mueller'],
  'Miami': ['Brickell', 'Coconut Grove', 'Wynwood', 'Coral Gables', 'South Beach'],
  'Seattle': ['Capitol Hill', 'Ballard', 'Queen Anne', 'Fremont', 'Wallingford'],
  'Los Angeles': ['Santa Monica', 'Hollywood', 'Silver Lake', 'Venice'],
  'Chicago': ['Lincoln Park', 'The Loop', 'Wicker Park', 'Logan Square']
};

const PROPERTY_TYPES: Property['type'][] = ['Single Family', 'Condo', 'Townhouse', 'Multi-Family'];

const generateMockData = (): Property[] => {
  const data: Property[] = [];
  const now = new Date();
  const states = Object.keys(US_GEOGRAPHY);

  for (let i = 0; i < 500; i++) {
    const state = states[Math.floor(Math.random() * states.length)];
    const cities = US_GEOGRAPHY[state];
    const city = cities[Math.floor(Math.random() * cities.length)];
    const neighborhoods = NEIGHBORHOODS[city] || ['Downtown', 'Suburbs', 'Riverside', 'East Side', 'West Side', 'Central'];
    const neighborhood = neighborhoods[Math.floor(Math.random() * neighborhoods.length)];
    const type = PROPERTY_TYPES[Math.floor(Math.random() * PROPERTY_TYPES.length)];
    
    let cityKey = city;
    if (city === 'Portland' && state === 'Oregon') cityKey = 'Portland_OR';
    if (city === 'Charleston' && state === 'West Virginia') cityKey = 'Charleston_WV';

    const baseCoords = CITY_COORDS[cityKey] || [39.8283, -98.5795];
    const lat = baseCoords[0] + (Math.random() - 0.5) * 0.15;
    const lng = baseCoords[1] + (Math.random() - 0.5) * 0.15;

    const basePrice = (city === 'San Francisco' || city === 'New York City' || city === 'Boston') ? 950000 : 380000;
    const sqft = Math.floor(Math.random() * 4000) + 600;
    const price = basePrice + (sqft * (180 + Math.random() * 350)) + (Math.random() * 250000);
    const yearBuilt = Math.floor(Math.random() * 110) + 1910;
    
    const listingDate = new Date(now);
    listingDate.setMonth(now.getMonth() - Math.floor(Math.random() * 12));

    data.push({
      id: `prop-${i}-${Math.random().toString(36).substr(2, 9)}`,
      state,
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
export { PROPERTY_TYPES };
