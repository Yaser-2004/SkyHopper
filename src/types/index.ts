
// City info with airport code
// export interface City {
//   cityCode: string;
//   cityName: string;
//   name: string;
// }

// Flight details
export interface Flight {
  id: string;
  airline: string;
  flightNumber: string;
  departureCity: string;
  departureCityCode: string;
  arrivalCityCode: string;
  arrivalCity: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  price: number;
  currentPrice: number;
  stops: number;
}

// User booking
export interface Booking {
  id: string;
  flightId: string;
  flight: Flight;
  bookingDate: string;
  price: number;
  status: 'confirmed' | 'cancelled';
}

// User profile
export interface User {
  name: string;
  email: string;
  wallet: number;
  bookings: Booking[];
}
