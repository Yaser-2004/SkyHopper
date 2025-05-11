
import React, { useState } from 'react';
import { Flight } from '@/types';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '@/context/AppContext';
import { Clock, Ticket } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { airlineLogos } from '../../public/logos/airlineLogos.ts'
import { airlineNames } from '@/data/mockData.ts';
import axios from 'axios';
import {PulseLoader} from 'react-spinners';

interface FlightCardProps {
  flight: Flight;
  showBookButton?: boolean;
}

const FlightCard = ({ flight, showBookButton = true }: FlightCardProps) => {
  const navigate = useNavigate();
  const { selectFlight } = useAppContext();
  const [loading, setLoading] = useState(false);
  

  const handleBookNow = async () => {
    console.log("Booking flight:", flight);
    selectFlight(flight);
    setLoading(true);

    try {
      const response = await axios.post(`${import.meta.env.VITE_PUBLIC_BASEURL}/api/book/${flight.id}`);
      console.log("Booking response:", response);
    } catch (error) {
      console.error('Error booking flight:', error);
    } finally {
      setLoading(false);
    }

    navigate(`/book/${flight.id}`);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4 hover:shadow-lg transition-shadow">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div className="mb-4 md:mb-0 flex gap-2 items-end max-sm:gap-1">
          <div>
            <img
              src={airlineLogos[flight.airline]}
              alt={`${flight.airline} logo`}
              className="h-10 max-sm:h-8 w-auto mr-2"
            />
          </div>
          <div>
            <div className="text-base font-semibold max-sm:text-sm">{airlineNames[flight.airline]}</div>
            <div className="max-sm:text-xs text-sm text-gray-500">{flight.airline} {flight.flightNumber}</div>
          </div>
        </div>
        
        <div className="flex-1 max-sm:w-full px-0 md:px-10">
          <div className="flex flex max-sm:w-full sm:flex-row justify-between items-start sm:items-center mb-2">
            <div className="text-center mb-2 sm:mb-0">
              <div className="text-lg max-sm:text-sm font-bold">{flight.departureTime}</div>
              <div className="text-xs max-sm:text-xs text-gray-500">{flight.departureCityCode}</div>
            </div>
            
            <div className="sm:flex flex-col items-center px-4">
              <div className="text-xs text-gray-500 mb-1 flex items-center max-sm:justify-center">
                <Clock size={14} className="mr-1" />
                {flight.duration}
              </div>
              <div className="w-24 h-0.5 bg-blue-500 relative">
                <div className="absolute top-1/2 transform -translate-y-1/2 left-0 w-2 h-2 rounded-full bg-blue-500"></div>
                <div className="absolute top-1/2 transform -translate-y-1/2 right-0 w-2 h-2 rounded-full bg-blue-500"></div>
              </div>
              <div className="text-xs text-gray-500 mt-1 max-sm:text-center">
                {flight.stops === 0 ? 'Non-stop' : `${flight.stops} ${flight.stops === 1 ? 'stop' : 'stops'}`}
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-lg max-sm:text-sm font-bold">{flight.arrivalTime}</div>
              <div className="text-xs max-sm:text-xs text-gray-500">{flight.arrivalCityCode}</div>
            </div>
          </div>
        </div>
        
        <div className="w-full md:w-auto flex flex-col items-end">
          <div className="text-xl font-bold">₹{(flight.currentPrice).toLocaleString() || (flight.price).toLocaleString()}</div>
          
          {showBookButton && (
            <Button 
              onClick={handleBookNow} 
              className="mt-2 bg-skyhopper-primary hover:bg-blue-700 text-white w-full md:w-auto min-w-[130px]"
            >
              {loading ? (
                <PulseLoader size={5} color='#fff' />
              ) : <><Ticket size={16} className="mr-1" /> Book Now</>}
            </Button>
          )}
        </div>
      </div>

      <div className='w-full bg-yellow-50 mt-6 text-sm'>
          <p className='py-1 text-center max-sm:text-xs text-gray-700'>Get Flat 10% OFF using code SKYHOPPER10 on booking with SkyHop</p>
      </div>
    </div>
  );
};

export default FlightCard;
