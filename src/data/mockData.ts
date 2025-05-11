
import { Flight, User } from '@/types';
import axios from 'axios';

// Popular Cities
export const popularCities = [
  { cityCode: 'DEL', cityName: 'DELHI', name: 'Delhi - Indira Gandhi International Airport' },
  { cityCode: 'BOM', cityName: 'MUMBAI', name: 'Mumbai - Chhatrapati Shivaji Maharaj International Airport' },
  { cityCode: 'BLR', cityName: 'BANGALORE', name: 'Bangalore - Kempegowda International Airport' },
  { cityCode: 'HYD', cityName: 'HYDERABAD', name: 'Hyderabad - Rajiv Gandhi International Airport' },
  { cityCode: 'MAA', cityName: 'CHENNAI', name: 'Chennai - Chennai International Airport' },
  { cityCode: 'CCU', cityName: 'KOLKATA', name: 'Kolkata - Netaji Subhas Chandra Bose International Airport' },
  { cityCode: 'PNQ', cityName: 'PUNE', name: 'Pune - Pune Airport' },
  { cityCode: 'AMD', cityName: 'AHMEDABAD', name: 'Ahmedabad - Sardar Vallabhbhai Patel International Airport' },
  { cityCode: 'GOI', cityName: 'GOA', name: 'Goa - Dabolim Airport' },
  { cityCode: 'COK', cityName: 'KOCHI', name: 'Kochi - Cochin International Airport' }
];

export const airlineNames: Record<string, string> = {
    "6E": "IndiGo",
    "AI": "AirIndia",
    "VS": "Vistara",
    "SG": "SpiceJet",
  };

// Generate mock flights
export const fetchFlightOffers = async (
  from: string,
  to: string,
  date: string,
  token: string
) => {
  try {
    const response = await axios.get('https://test.api.amadeus.com/v2/shopping/flight-offers', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        originLocationCode: from,
        destinationLocationCode: to,
        departureDate: date,
        adults: 1,
        max: 10,
      },
    });

    console.log('Flight offers response:', response.data.data); // Log the response data
    return response.data.data;
  } catch (error) {
    console.error('Error fetching flight offers:', error);
    return [];
  }
};



// Initial mock user with wallet
// export const mockUser: User = {
//   name: "Demo User",
//   wallet: {
//     balance: 50000, // ₹50,000 initial balance
//   },
//   bookings: []
// };
