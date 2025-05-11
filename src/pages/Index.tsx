
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import CitySearch from '@/components/CitySearch';
import Navbar from '@/components/Navbar';
import FlightCard from '@/components/FlightCard';
import { useAppContext } from '@/context/AppContext';
import { cn } from '@/lib/utils';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import Chatbot from '@/components/chatbot';
import {TailSpin} from 'react-loader-spinner';
import {PulseLoader} from 'react-spinners';
import Footer from '@/components/Footer';
import { DestinationCard } from '@/components/Destinationcard';
import { useRef } from "react"
import { useScroll } from "framer-motion"

const Index = () => {
  const { 
    departureCity,
    departureCityInput,
    departureCityCodeInput,
    arrivalCityCodeInput,
    arrivalCityInput,
    departureCityCode,
    arrivalCityCode,
    arrivalCity, 
    departureDate, 
    searchResults, 
    setDepartureCity, 
    setDepartureCityCode,
    setArrivalCityCode,
    setArrivalCity, 
    setDepartureDate,
    setSearchResults,
  } = useAppContext();  

  const [tripType, setTripType] = useState<'oneWay' | 'roundTrip'>('oneWay');
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [filterResults, setFilterResults] = useState([...searchResults]);
  const [activeStop, setActiveStop] = useState(null); 
  const [activeAirline, setActiveAirline] = useState(null);
  const [activeSort, setActiveSort] = useState(null);

  useEffect(() => {
    // When user comes back to this page
    if (location.pathname === '/' && departureCity && arrivalCity && searchResults.length > 0) {
      handleSearch(); // refetch flights to reflect updated dynamic prices
    }
  }, [location]);

  const destinations = [
    {
      route: "India - Delhi",
      city: "Delhi",
      travelClass: "Economy Class - One-way",
      image: "../../places/delhi.jpg",
    },
    {
      route: "Inida - Mumbai",
      city: "Mumbai",
      travelClass: "Business Class - One-way",
      image: "../../places/mumbai.jpg",
    },
    {
      route: "India - Kolkata",
      city: "Kolkata",
      travelClass: "Economy Class - One-way",
      image: "../../places/kolkata.jpg",
    },
    {
      route: "Inida - Hyderabad",
      city: "Hyderabad",
      travelClass: "Business Class - One-way",
      image: "../../places/hyderabad.jpg",
    },
  ]

  const handleSearch = async () => {
    try {
      setDepartureCity(departureCityInput);
      setArrivalCity(arrivalCityInput);
      setDepartureCityCode(departureCityCodeInput);
      setArrivalCityCode(arrivalCityCodeInput);
      setLoading(true);

      const response = await axios.post(`${import.meta.env.VITE_PUBLIC_BASEURL}/api/flights/save-flights`, {
        departureCity: departureCityInput,
        arrivalCity: arrivalCityInput,
        departureCityCode: departureCityCodeInput,
        arrivalCityCode: arrivalCityCodeInput,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = response.data;
      setSearchResults(data);
      setFilterResults(data);

      console.log("flights----------->", response);
    } catch (error) {
      console.error('Error fetching flight data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSwapCities = () => {
    const temp = departureCity;
    setDepartureCity(arrivalCity);
    setArrivalCity(temp);
  };


  const element = useRef(null);
  const {scrollYProgress} = useScroll({
      target: element,
      offset: ['start 0.9', 'start 0.25']
  })


  return (
    <div className="min-h-screen bg-gray-100">
      {/* Search Form */}
      <div className="pb-16 bg-[url('/sky1.jpg')] bg-cover bg-left bg-no-repeat">
        <Navbar />

        <div className="max-w-6xl mx-auto bg-white shadow-lg p-6 rounded-xl my-20 max-sm:mx-2">
          <div className="flex space-x-4 mb-6">
            <Button 
              variant={tripType === 'oneWay' ? 'default' : 'outline'}
              onClick={() => setTripType('oneWay')}
              className={tripType === 'oneWay' ? 'rounded-full bg-skyhopper-primary text-white' : 'rounded-full'}
            >
              One Way
            </Button>
            <Button 
              variant={tripType === 'roundTrip' ? 'default' : 'outline'}
              onClick={() => setTripType('roundTrip')}
              className={tripType === 'roundTrip' ? 'rounded-full bg-skyhopper-primary text-white' : 'rounded-full'}
            >
              Round Trip
            </Button>
          </div>
          
          <div className="flex max-sm:flex-col items-center gap-2 max-sm:relative">
            <div className="flex-1 max-sm:w-full">
              <CitySearch
                id="departureCity"
                label="From"
                placeholder="Enter departure city"
                selectedCity={{cityName: departureCity, cityCode: departureCityCode, name: departureCity}}
                type='departure'
                onChange={(city) => {
                  if (city) {
                    setDepartureCity(city.cityName);
                    setDepartureCityCode(city.cityCode);
                  } else {
                    setDepartureCity('');
                    setDepartureCityCode('');
                  }
                }}
              />
            </div>
            
            <div className="flex items-end justify-center max-sm:absolute max-sm:right-0 max-sm:top-[68px] max-sm:z-10">
              <Button variant="ghost" onClick={handleSwapCities} className="h-10 px-2 mt-6 max-sm:mt-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transform rotate-90"><path d="M8 3L4 7L8 11"></path><path d="M4 7H16"></path><path d="M16 21L20 17L16 13"></path><path d="M20 17H8"></path></svg>
              </Button>
            </div>
            
            <div className="flex-1 max-sm:w-full">
              <CitySearch
                id="arrivalCity"
                label="To"
                placeholder="Enter arrival city"
                selectedCity={{cityName: arrivalCity, cityCode: arrivalCityCode, name: arrivalCity}}
                type='arrival'
                onChange={(city) => {
                  if (city) {
                    setArrivalCity(city.cityName);
                    setArrivalCityCode(city.cityCode);
                  } else {
                    setDepartureCity('');
                    setDepartureCityCode('');
                  }
                }}
              />
            </div>
            
            <div className='flex-2 max-sm:w-full'>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Departure Date
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal h-12",
                      !departureDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {departureDate ? format(departureDate, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={departureDate}
                    onSelect={(date) => date && setDepartureDate(date)}
                    initialFocus
                    disabled={(date) => date < new Date()}
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            {tripType === 'roundTrip' && (
              <div className='max-sm:w-full'>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Return Date
                </label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal h-12"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      <span>Pick a date</span>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      initialFocus
                      disabled={(date) => date < departureDate}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            )}
          </div>
          
          <div className="mt-10 flex justify-center">
            <Button 
              onClick={handleSearch} 
              className="bg-skyhopper-primary w-48 rounded-full text-white hover:bg-blue-600 px-10 font-semibold h-12 text-lg"
              size="lg"
            >
              {loading ? (
                <PulseLoader size={6} color='#fff' />
              ) : 'Search Flights'}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Search Results */}
      {searchResults.length > 0 && (
        <div className="max-w-6xl mx-auto px-4 py-8">
          <h2 className="text-2xl max-sm:text-xl font-bold mb-6">
            {departureCity} to {arrivalCity} • {format(departureDate, 'EEE, dd MMM')}
          </h2>
          
          <div className="bg-white rounded-lg shadow p-4 mb-6">
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center">
                <span className="font-medium mr-2">Stops:</span>
                <div className="flex space-x-2 max-sm:space-x-1">
                  <Button
                    variant="outline"
                    size="sm"
                    className={`${activeStop === 0 ? 'bg-skyhopper-secondary text-white' : ''}`}
                    onClick={() => {
                      setActiveAirline(null);
                      setActiveStop(0);
                      setActiveSort(null);
                      setFilterResults(searchResults.filter(flight => flight.stops === 0));
                    }}
                  >
                    Non-stop
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className={`${activeStop === 1 ? 'bg-skyhopper-secondary text-white' : ''}`}
                    onClick={() => {
                      setActiveAirline(null);
                      setActiveStop(1);
                      setActiveSort(null);
                      setFilterResults(searchResults.filter(flight => flight.stops === 1));
                    }}
                  >
                    1 Stop
                  </Button>
                </div>
              </div>
              
              <div className="flex items-center">
                <span className="font-medium mr-2">Airlines:</span>
                <div className="flex space-x-2 max-sm:space-x-1">
                  <Button
                    variant="outline"
                    size="sm"
                    className={`${activeAirline === '6E' ? 'bg-skyhopper-secondary text-white' : ''}`}
                    onClick={() => {
                      setActiveStop(null);
                      setActiveAirline('6E');
                      setActiveSort(null);
                      setFilterResults(searchResults.filter(flight => flight.airline === '6E'));
                    }}
                  >
                    IndiGo
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className={`${activeAirline === 'AI' ? 'bg-skyhopper-secondary text-white' : ''}`}
                    onClick={() => {
                      setActiveStop(null);
                      setActiveAirline('AI');
                      setActiveSort(null);
                      setFilterResults(searchResults.filter(flight => flight.airline === 'AI'));
                    }}
                  >
                    AirIndia
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className={`${activeAirline === 'SG' ? 'bg-skyhopper-secondary text-white' : ''}`}
                    onClick={() => {
                      setActiveStop(null);
                      setActiveAirline('SG');
                      setActiveSort(null);
                      setFilterResults(searchResults.filter(flight => flight.airline === 'SG'));
                    }}
                  >
                    SpiceJet
                  </Button>
                </div>
              </div>

              <div className="flex items-center">
                <span className="font-medium mr-2">Prices:</span>
                <div className="flex space-x-2 max-sm:space-x-1">
                  <Button
                    variant="outline"
                    size="sm"
                    className={`${activeSort === 'LH' ? 'bg-skyhopper-secondary text-white' : ''}`}
                    onClick={() => {
                      setActiveStop(null);
                      setActiveAirline(null);
                      setActiveSort('LH');
                      const sorted = [...searchResults].sort((a,b) => a.currentPrice - b.currentPrice);
                      setFilterResults(sorted);
                    }}
                  >
                    Low to High
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className={`${activeSort === 'HL' ? 'bg-skyhopper-secondary text-white' : ''}`}
                    onClick={() => {
                      setActiveStop(null);
                      setActiveAirline(null);
                      setActiveSort('HL');
                      const sorted = [...searchResults].sort((a,b) => b.currentPrice - a.currentPrice);
                      setFilterResults(sorted);
                    }}
                  >
                    Hight to Low
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            {filterResults.map((flight) => (
              <FlightCard key={flight.id} flight={flight} />
            ))}
          </div>
        </div>
      )}
      
      {/* Initial welcome content when no search has been performed */}
      {searchResults.length === 0 && (
        <div className="max-w-6xl mx-auto px-4 py-12 bg-gray-100">
          <h1 className="text-center text-4xl font-bold mb-10">Top Places of this Month</h1>
    
          <div className="flex flex-col md:flex-row justify-center items-center gap-6" ref={element}>
            {destinations.map((destination, index) => {
              const start = index/5;
              const end = start+(1/5);
              return <DestinationCard key={index} destination={destination} range={[start, end]} progress={scrollYProgress} />
            })}
          </div>



          <section className="py-12 px-4 max-w-6xl mx-auto mt-16">
            <h2 className="text-center font-bold text-4xl mb-8">Top reviews for SkyHopper</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Testimonial 1 */}
              <div className="bg-white shadow-lg p-6 rounded-lg flex flex-col items-center">
                <div className="flex text-blue-500 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path
                      fillRule="evenodd"
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path
                      fillRule="evenodd"
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path
                      fillRule="evenodd"
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path
                      fillRule="evenodd"
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path
                      fillRule="evenodd"
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>

                <p className="text-gray-600 text-sm text-center mb-6">
                  Lorem ipsum dolor amet consectetur adipiscing elit sed eiusmod tempor incididunt ut labore et dolore magna
                  aliqua. Ut enim ad minim veniam quis nostrud exercitation ullamco laboris.
                </p>

                <div className="mt-auto">
                  <p className="font-medium text-center mb-2">Abraham Khan</p>
                  <div className="w-14 h-14 rounded-full overflow-hidden mx-auto">
                    <img src="../../woman.jpg" alt="Abraham Khan" className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>

              {/* Testimonial 2 */}
              <div className="bg-white shadow-lg p-6 rounded-lg flex flex-col items-center">
                <div className="flex text-blue-500 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path
                      fillRule="evenodd"
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path
                      fillRule="evenodd"
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path
                      fillRule="evenodd"
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path
                      fillRule="evenodd"
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path
                      fillRule="evenodd"
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>

                <p className="text-gray-600 text-sm text-center mb-6">
                  Lorem ipsum dolor amet consectetur adipiscing elit sed eiusmod tempor incididunt ut labore et dolore magna
                  aliqua. Ut enim ad minim veniam quis nostrud exercitation ullamco laboris.
                </p>

                <div className="mt-auto">
                  <p className="font-medium text-center mb-2">Mike Handson</p>
                  <div className="w-14 h-14 rounded-full overflow-hidden mx-auto">
                    <img src="../../woman.jpg" alt="Mike Handson" className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>

              {/* Testimonial 3 */}
              <div className="bg-white shadow-lg p-6 rounded-lg flex flex-col items-center">
                <div className="flex text-blue-500 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path
                      fillRule="evenodd"
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path
                      fillRule="evenodd"
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path
                      fillRule="evenodd"
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path
                      fillRule="evenodd"
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path
                      fillRule="evenodd"
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>

                <p className="text-gray-600 text-sm text-center mb-6">
                  Lorem ipsum dolor amet consectetur adipiscing elit sed eiusmod tempor incididunt ut labore et dolore magna
                  aliqua. Ut enim ad minim veniam quis nostrud exercitation ullamco laboris.
                </p>

                <div className="mt-auto">
                  <p className="font-medium text-center mb-2">Mary Chilsen</p>
                  <div className="w-14 h-14 rounded-full overflow-hidden mx-auto">
                    <img src="../../woman.jpg" alt="Mary Chilsen" className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}

      <Footer />

      <Chatbot />
    </div>
  );
};

export default Index;
