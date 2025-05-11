
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Flight, Booking, User } from '@/types';
import { popularCities, fetchFlightOffers } from '@/data/mockData';
import { toast } from '@/components/ui/sonner';
import axios from 'axios';

interface AppContextType {
  user: User | null;
  departureCity: null;
  departureCityInput: null;
  departureCityCodeInput: null;
  arrivalCityCodeInput: null;
  arrivalCityInput: null;
  departureCityCode: null;
  arrivalCityCode: null;
  arrivalCity: null;
  token: string | null;
  departureDate: Date;
  searchResults: Flight[];
  selectedFlight: Flight | null;
  setDepartureCity: (city: string) => void;
  setDepartureCityInput: (city: string) => void;
  setDepartureCityCodeInput: (code: string) => void;
  setArrivalCityCodeInput: (code: string) => void;
  setArrivalCityInput: (city: string) => void;
  setArrivalCityCode: (code: string) => void;
  setDepartureCityCode: (code: string) => void;
  setArrivalCity: (city: string) => void;
  setToken: (token: string | null) => void;
  setDepartureDate: (date: Date) => void;
  selectFlight: (flight: Flight) => void;
  setSearchResults: (flights: Flight[]) => void;
  bookFlight: (flight: Flight) => Promise<boolean>;
  getBookings: () => Booking[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>(null);
  const [departureCity, setDepartureCity] = useState(null);
  const [departureCityInput, setDepartureCityInput] = useState(null);
  const [departureCityCodeInput, setDepartureCityCodeInput] = useState(null);
  const [arrivalCityCodeInput, setArrivalCityCodeInput] = useState(null);
  const [arrivalCityInput, setArrivalCityInput] = useState(null);
  const [departureCityCode, setDepartureCityCode] = useState(null);
  const [arrivalCity, setArrivalCity] = useState(null);
  const [arrivalCityCode, setArrivalCityCode] = useState(null);
  const [token, setToken] = useState<string | null>(null);
  const [departureDate, setDepartureDate] = useState<Date>(new Date());
  const [searchResults, setSearchResults] = useState<Flight[]>([]);
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_PUBLIC_BASEURL}/api/user`);
        console.log('User data------------------------>', res.data); // Log the user data
        
        setUser(res.data);
      } catch (err) {
        console.error('Failed to fetch user data:', err);
      }
    };
  
    fetchUserData();
  }, []);
  

  const selectFlight = (flight: Flight) => {
    setSelectedFlight(flight);
  };

  const bookFlight = async (flight: Flight): Promise<boolean> => {
    if (!user) {
      toast.error("User not found");
      return false;
    }
  
    if (user.wallet < flight.price) {
      toast.error("Insufficient wallet balance");
      return false;
    }
  
    try {
      const response = await axios.post(`${import.meta.env.VITE_PUBLIC_BASEURL}/api/book`, {
        flight: flight
      });
  
      toast.success("Booking confirmed!");
  
      setUser((prevUser) => ({
        ...prevUser!,
        wallet: prevUser!.wallet - flight.price,
        bookings: [...prevUser!.bookings, response.data.booking],
      }));
      
      console.log("----------------->",response);
      
      return true;
  
    } catch (error) {
      console.error("Booking failed:", error);
      toast.error("Booking failed. Try again later.");
      return false;
    }
  };
  
  

  const getBookings = () => {
    return user.bookings;
  };

  const contextValue: AppContextType = {
    user,
    departureCity,
    departureCityInput,
    departureCityCodeInput,
    arrivalCityCodeInput,
    arrivalCityInput,
    departureCityCode,
    arrivalCityCode,
    arrivalCity,
    token,
    departureDate,
    searchResults,
    selectedFlight,
    setDepartureCity,
    setDepartureCityInput,
    setDepartureCityCodeInput,
    setArrivalCityCodeInput,
    setArrivalCityInput,
    setArrivalCity,
    setDepartureCityCode,
    setArrivalCityCode,
    setToken,
    setDepartureDate,
    selectFlight,
    setSearchResults,
    bookFlight,
    getBookings
  };

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
